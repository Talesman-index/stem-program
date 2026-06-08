import React from 'react';
import { NextResponse } from 'next/server';
import { pdf } from '@react-pdf/renderer';
import {
  fetchParticipants,
  fetchAttendance,
  fetchCertificates,
  fetchGroups,
  fetchPartners
} from '../../../actions/dbActions';
import { ImpactReportTemplate } from '../../../../components/pdf/ImpactReportTemplate';

export async function GET() {
  try {
    const [participants, attendance, certs, groups, partners] = await Promise.all([
      fetchParticipants(),
      fetchAttendance(),
      fetchCertificates(),
      fetchGroups(),
      fetchPartners()
    ]);

    // Compute stats
    const totalParticipants = participants.length;
    const waitlist = participants.filter(p => p.status === 'waitlist');
    const msCount = participants.filter(p => p.school_level === 'middle').length;
    const hsCount = participants.filter(p => p.school_level === 'high').length;
    const certificatesCount = certs.length;

    const attendanceRate = attendance.length > 0
      ? Math.round((attendance.filter(a => a.present).length / attendance.length) * 100)
      : 0;

    const stats = {
      totalParticipants,
      attendanceRate,
      certificatesCount,
      waitlistCount: waitlist.length,
      msCount,
      hsCount
    };

    const doc = <ImpactReportTemplate stats={stats} groups={groups} partners={partners} />;
    const blob = await pdf(doc).toBlob();

    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="impact_report_summer_camp_2026.pdf"',
      },
    });
  } catch (error: any) {
    console.error('Impact Report PDF generation error:', error);
    return new NextResponse('PDF generation failed', { status: 500 });
  }
}
