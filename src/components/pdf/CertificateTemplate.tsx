import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Participant } from '../../lib/db/seedData';

// Styles for React-PDF (Landscape layout)
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    orientation: 'landscape'
  },
  borderOuter: {
    border: '2px solid #1E293B',
    height: '100%',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  borderInner: {
    border: '4px solid #D97706', // Gold border
    height: '100%',
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FCFAF7'
  },
  header: {
    fontSize: 12,
    letterSpacing: 4,
    color: '#64748B',
    textTransform: 'uppercase',
    marginBottom: 10
  },
  institution: {
    fontSize: 22,
    color: '#0F172A',
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  divider: {
    width: 120,
    height: 2,
    backgroundColor: '#D97706',
    marginVertical: 15
  },
  certTitle: {
    fontSize: 32,
    color: '#1E3A8A', // Dark Blue
    fontWeight: 'bold',
    letterSpacing: 3,
    marginVertical: 10
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    fontStyle: 'italic',
    marginVertical: 10
  },
  studentName: {
    fontSize: 28,
    color: '#0F172A',
    fontWeight: 'bold',
    marginVertical: 15,
    borderBottom: '2px solid #E2E8F0',
    paddingBottom: 5,
    minWidth: 250,
    textAlign: 'center'
  },
  bodyText: {
    fontSize: 11,
    color: '#334155',
    textAlign: 'center',
    lineHeight: 1.6,
    maxWidth: 450,
    marginVertical: 10
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 20
  },
  signatureBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 180
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#94A3B8',
    marginBottom: 5
  },
  signatureLabel: {
    fontSize: 9,
    color: '#64748B',
    textAlign: 'center'
  },
  signatureTitle: {
    fontSize: 10,
    color: '#1E293B',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  dateText: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 15
  }
});

interface CertificateProps {
  student: Participant;
  generatedAt: string;
}

export function CertificateTemplate({ student, generatedAt }: CertificateProps) {
  const isHighSchool = student.school_level === 'high';
  const sessionDates = isHighSchool ? 'June 22 — 26, 2026' : 'June 15 — 19, 2026';
  const graduationDate = isHighSchool ? 'June 26, 2026' : 'June 19, 2026';

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.borderOuter}>
          <View style={styles.borderInner}>
            {/* Header */}
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.header}>Livingstone College</Text>
              <Text style={styles.institution}>Summer STEM Camp 2026</Text>
              <View style={styles.divider} />
            </View>

            {/* Cert Body */}
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.certTitle}>CERTIFICATE OF PARTICIPATION</Text>
              <Text style={styles.subtitle}>This certificate is proudly awarded to</Text>
              <Text style={styles.studentName}>
                {student.first_name} {student.last_name}
              </Text>
              <Text style={styles.bodyText}>
                for successfully completing the one-week science immersion program at Livingstone College. The participant completed the full track of hands-on workshops: Robotics, Chemistry, Virtual Reality, Biology, Mathematics, Greenhouse Science, and eSports.
              </Text>
              <Text style={styles.dateText}>Issued on {graduationDate} in Salisbury, North Carolina</Text>
            </View>

            {/* Signatures */}
            <View style={styles.footer}>
              <View style={styles.signatureBlock}>
                <View style={styles.line} />
                <Text style={styles.signatureTitle}>Dr. Anthony J. Davis</Text>
                <Text style={styles.signatureLabel}>President, Livingstone College</Text>
              </View>
              <View style={styles.signatureBlock}>
                <View style={styles.line} />
                <Text style={styles.signatureTitle}>Program Director</Text>
                <Text style={styles.signatureLabel}>STEM Department</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
