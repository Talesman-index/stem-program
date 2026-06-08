import React from 'react';
import { NextResponse } from 'next/server';
import { pdf } from '@react-pdf/renderer';
import { fetchParticipants, fetchParticipantById } from '../../../actions/dbActions';
import { HealthSafetyTemplate } from '../../../../components/pdf/HealthSafetyTemplate';

export async function GET() {
  try {
    const participants = await fetchParticipants();
    const confirmed = participants.filter(p => p.status === 'confirmed');

    const records = await Promise.all(
      confirmed.map(async p => {
        const details = await fetchParticipantById(p.id);
        return {
          participant: p,
          parent: details.parent,
          medical: details.medical
        };
      })
    );

    const doc = <HealthSafetyTemplate records={records} />;
    const blob = await pdf(doc).toBlob();

    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="camp_health_safety_sheet.pdf"',
      },
    });
  } catch (error: any) {
    console.error('Health Safety PDF generation error:', error);
    return new NextResponse('PDF generation failed', { status: 500 });
  }
}
