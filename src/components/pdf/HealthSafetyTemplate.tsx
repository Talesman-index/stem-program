import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Participant, MedicalInfo, Parent } from '../../lib/db/seedData';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    borderBottom: '2px solid #1E3A8A',
    paddingBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A'
  },
  subtitle: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 3
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderBottom: '1px solid #CBD5E1',
    paddingVertical: 6,
    paddingHorizontal: 4,
    fontWeight: 'bold'
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center'
  },
  colName: { width: '22%', fontSize: 9, color: '#0F172A', fontWeight: 'bold' },
  colAllergy: { width: '20%', fontSize: 8, color: '#334155' },
  colDiet: { width: '18%', fontSize: 8, color: '#334155' },
  colMed: { width: '18%', fontSize: 8, color: '#334155' },
  colEmergency: { width: '22%', fontSize: 8, color: '#0F172A' },
  headerText: {
    fontSize: 9,
    color: '#475569',
    fontWeight: 'bold'
  },
  alertText: {
    color: '#B45309',
    fontWeight: 'bold'
  },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 30,
    right: 30,
    borderTop: '1px solid #E2E8F0',
    paddingTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: '#94A3B8'
  }
});

interface HealthRecord {
  participant: Participant;
  parent: Parent | null;
  medical: MedicalInfo | null;
}

interface HealthSafetyTemplateProps {
  records: HealthRecord[];
}

export function HealthSafetyTemplate({ records }: HealthSafetyTemplateProps) {
  const dateStr = new Date().toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Camp Health & Safety Sheet</Text>
          <Text style={styles.subtitle}>Confidential emergency list for administrative staff — Generated on {dateStr}</Text>
        </View>

        {/* Table */}
        <View style={styles.table}>
          {/* Header Row */}
          <View style={styles.tableHeader}>
            <View style={styles.colName}><Text style={styles.headerText}>Student</Text></View>
            <View style={styles.colAllergy}><Text style={styles.headerText}>Allergies</Text></View>
            <View style={styles.colDiet}><Text style={styles.headerText}>Dietary</Text></View>
            <View style={styles.colMed}><Text style={styles.headerText}>Medication</Text></View>
            <View style={styles.colEmergency}><Text style={styles.headerText}>Emergency Contact</Text></View>
          </View>

          {/* Data Rows */}
          {records.map((r, idx) => {
            const { participant: p, parent, medical } = r;
            const hasAlert = medical?.has_allergies || medical?.has_dietary || medical?.has_medication || medical?.has_conditions;

            return (
              <View key={p.id} style={[styles.tableRow, { backgroundColor: hasAlert ? '#FFFBEB' : '#FFFFFF' }]}>
                {/* Student */}
                <View style={styles.colName}>
                  <Text>{p.first_name} {p.last_name}</Text>
                  <Text style={{ fontSize: 7, color: '#64748B', marginTop: 1 }}>
                    {p.school_level === 'middle' ? 'Middle School (MS)' : 'High School (HS)'}
                  </Text>
                </View>

                {/* Allergies */}
                <View style={styles.colAllergy}>
                  <Text style={medical?.has_allergies ? styles.alertText : undefined}>
                    {medical?.has_allergies ? medical.allergies_detail : 'None'}
                  </Text>
                </View>

                {/* Dietary */}
                <View style={styles.colDiet}>
                  <Text style={medical?.has_dietary ? styles.alertText : undefined}>
                    {medical?.has_dietary ? medical.dietary_detail : 'None'}
                  </Text>
                </View>

                {/* Medication */}
                <View style={styles.colMed}>
                  <Text style={medical?.has_medication ? styles.alertText : undefined}>
                    {medical?.has_medication ? medical.medication_detail : 'None'}
                  </Text>
                </View>

                {/* Emergency contact */}
                <View style={styles.colEmergency}>
                  {parent ? (
                    <>
                      <Text style={{ fontWeight: 'bold' }}>{parent.emergency_name}</Text>
                      <Text style={{ fontSize: 7, color: '#64748B' }}>
                        {parent.emergency_relation} · {parent.emergency_phone}
                      </Text>
                    </>
                  ) : (
                    <Text style={{ color: '#94A3B8' }}>Not on file</Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Confidentiality Notice */}
        <Text style={{ fontSize: 7, color: '#94A3B8', marginTop: 25, fontStyle: 'italic', textAlign: 'center' }}>
          This document contains private medical information protected by applicable data protection regulations.
        </Text>

        {/* Footer Page Number */}
        <View style={styles.footer}>
          <Text>Livingstone College STEM Camp 2026</Text>
          <Text>Confidential — Staff Only</Text>
        </View>
      </Page>
    </Document>
  );
}
