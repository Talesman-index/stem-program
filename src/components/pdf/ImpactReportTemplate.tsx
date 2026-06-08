import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Participant, Attendance, Partner, Group } from '../../lib/db/seedData';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    display: 'flex',
    flexDirection: 'column'
  },
  coverPage: {
    padding: 50,
    backgroundColor: '#0F172A', // Premium dark background for cover page
    color: '#FFFFFF',
    fontFamily: 'Helvetica',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  coverHeader: {
    fontSize: 14,
    color: '#38BDF8',
    letterSpacing: 4,
    textTransform: 'uppercase'
  },
  coverTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 40,
    lineHeight: 1.2
  },
  coverSubtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 15
  },
  coverFooter: {
    borderTop: '1px solid #334155',
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    color: '#64748B'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A8A',
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 6,
    marginTop: 20,
    marginBottom: 12
  },
  bodyText: {
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.6,
    marginBottom: 12
  },
  statRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 15
  },
  statBox: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  statNum: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0284C7'
  },
  statLabel: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center'
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
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontWeight: 'bold'
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #E2E8F0',
    paddingVertical: 6,
    paddingHorizontal: 5
  },
  col1: { width: '60%', fontSize: 9, color: '#334155' },
  col2: { width: '40%', fontSize: 9, color: '#0F172A', fontWeight: 'bold', textAlign: 'right' },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 40,
    right: 40,
    borderTop: '1px solid #E2E8F0',
    paddingTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: '#94A3B8'
  }
});

interface ImpactReportTemplateProps {
  stats: {
    totalParticipants: number;
    attendanceRate: number;
    certificatesCount: number;
    waitlistCount: number;
    msCount: number;
    hsCount: number;
  };
  groups: Group[];
  partners: Partner[];
}

export function ImpactReportTemplate({ stats, groups, partners }: ImpactReportTemplateProps) {
  return (
    <Document>
      {/* PAGE 1: COVER PAGE */}
      <Page size="A4" style={styles.coverPage}>
        <View>
          <Text style={styles.coverHeader}>Livingstone College</Text>
          <Text style={styles.coverTitle}>Annual Impact Report{"\n"}Summer STEM Camp 2026</Text>
          <Text style={styles.coverSubtitle}>Academic, operational, and partnership summary of the STEM excellence program.</Text>
        </View>
        <View style={styles.coverFooter}>
          <Text>Salisbury, North Carolina</Text>
          <Text>June 2026</Text>
        </View>
      </Page>

      {/* PAGE 2: SUMMARY & KEY STATS */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>1. 2026 Program Summary</Text>
        <Text style={styles.bodyText}>
          The 2026 edition of the Livingstone College Summer STEM Camp concluded with remarkable success. True to its mission of inclusion and excellence, the camp offered a free one-week immersion into technology and science careers to dozens of middle and high school students from Rowan County.
        </Text>
        <Text style={styles.bodyText}>
          By combining hands-on learning, mentorship from college faculty, and exposure to cutting-edge technologies (Robotics, Virtual Reality), the program laid lasting foundations for participants' academic journeys.
        </Text>

        <Text style={styles.sectionTitle}>2. Key Performance Indicators</Text>
        <View style={styles.statRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{stats.totalParticipants}</Text>
            <Text style={styles.statLabel}>Enrolled Participants</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{stats.attendanceRate}%</Text>
            <Text style={styles.statLabel}>Average Attendance Rate</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{stats.certificatesCount}</Text>
            <Text style={styles.statLabel}>Graduation Certificates Awarded</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{stats.waitlistCount}</Text>
            <Text style={styles.statLabel}>Students on Waitlist</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Livingstone College Summer STEM Camp 2026</Text>
          <Text>Page 2</Text>
        </View>
      </Page>

      {/* PAGE 3: PARTICIPANTS, GROUPS & PARTNERS */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>3. Group & Session Enrollment</Text>
        <Text style={styles.bodyText}>
          The camp was structured around two distinct sessions: Middle School and High School students. Enrollment was distributed across the following groups:
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.col1, { fontWeight: 'bold' }]}>Group Name</Text>
            <Text style={[styles.col2, { fontWeight: 'bold' }]}>Capacity / Enrolled</Text>
          </View>
          {groups.map((g) => (
            <View key={g.id} style={styles.tableRow}>
              <Text style={styles.col1}>{g.name} ({g.session_id === 'ms-2026' ? 'Middle School' : 'High School'})</Text>
              <Text style={styles.col2}>{g.capacity} spots</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>4. Partner Acknowledgements</Text>
        <Text style={styles.bodyText}>
          The program's ability to remain completely free for families is made possible through the generous support of our sponsors and institutional partners:
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.col1, { fontWeight: 'bold' }]}>Partner Organization</Text>
            <Text style={[styles.col2, { fontWeight: 'bold' }]}>Support Tier</Text>
          </View>
          {partners.map((p) => (
            <View key={p.id} style={styles.tableRow}>
              <Text style={styles.col1}>{p.name}</Text>
              <Text style={styles.col2}>
                {p.tier === 'platinum' ? 'Platinum' : p.tier === 'gold' ? 'Gold' : p.tier === 'silver' ? 'Silver' : p.tier === 'bronze' ? 'Bronze' : 'Friend'}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>Livingstone College Summer STEM Camp 2026</Text>
          <Text>Page 3</Text>
        </View>
      </Page>
    </Document>
  );
}
