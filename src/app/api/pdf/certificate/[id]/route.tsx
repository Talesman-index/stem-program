import React from 'react';
import { NextResponse } from 'next/server';
import { pdf } from '@react-pdf/renderer';
import { fetchParticipantById } from '../../../../actions/dbActions';
import { CertificateTemplate } from '../../../../../components/pdf/CertificateTemplate';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { participant } = await fetchParticipantById(params.id);
    if (!participant) {
      return new NextResponse('Participant not found', { status: 404 });
    }

    const doc = <CertificateTemplate student={participant} generatedAt={new Date().toISOString()} />;
    const blob = await pdf(doc).toBlob();

    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="certificate_${participant.last_name}_${participant.first_name}.pdf"`,  
      },
    });
  } catch (error: any) {
    console.error('PDF generation error:', error);
    return new NextResponse('PDF generation failed', { status: 500 });
  }
}
