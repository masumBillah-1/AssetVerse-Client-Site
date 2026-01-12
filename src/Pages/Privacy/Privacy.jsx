import { Shield, Lock, Eye, Database, UserCheck, FileText, AlertCircle } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Personal information (name, email, phone number) provided during registration',
        'Company information for HR managers',
        'Asset request and usage data',
        'Payment and subscription information',
        'Device and browser information for security purposes'
      ]
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: [
        'To provide and maintain our asset management services',
        'To process asset requests and approvals',
        'To send notifications about asset status and updates',
        'To improve our platform and user experience',
        'To comply with legal obligations and prevent fraud'
      ]
    },
    {
      icon: Shield,
      title: 'Data Security',
      content: [
        'We use industry-standard encryption (SSL/TLS) for data transmission',
        'All passwords are hashed and securely stored',
        'Regular security audits and vulnerability assessments',
        'Restricted access to personal data on a need-to-know basis',
        'Secure cloud infrastructure with automatic backups'
      ]
    },
    {
      icon: Eye,
      title: 'Data Sharing',
      content: [
        'We do not sell your personal information to third parties',
        'Data is shared only within your organization (HR and employees)',
        'Payment processing through secure third-party providers (Stripe)',
        'Legal compliance when required by law or regulation',
        'Service providers who assist in platform operations (under strict NDAs)'
      ]
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: [
        'Access your personal data at any time through your profile',
        'Request correction of inaccurate information',
        'Delete your account and associated data',
        'Export your data in a portable format',
        'Opt-out of non-essential communications'
      ]
    },
    {
      icon: FileText,
      title: 'Cookies and Tracking',
      content: [
        'We use essential cookies for authentication and security',
        'Analytics cookies to understand user behavior (anonymized)',
        'You can control cookie preferences in your browser settings',
        'No third-party advertising cookies are used',
        'Session data is cleared upon logout'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#063A3A] via-[#0a5555] to-[#063A3A] pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-[#CBDCBD]/10 backdrop-blur-sm rounded-full border-2 border-[#CBDCBD]/20 mb-6">
            <span className="text-[#CBDCBD] font-bold text-lg">Legal</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#CBDCBD] mb-6">Privacy Policy</h1>
          <p className="text-xl text-[#CBDCBD]/80 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-[#CBDCBD]/60 mt-4">Last Updated: January 11, 2026</p>
        </div>

        {/* Introduction */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-[#CBDCBD] flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-black text-[#CBDCBD] mb-4">Introduction</h2>
              <p className="text-[#CBDCBD]/80 leading-relaxed">
                AssetVerse ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our asset management platform. By using AssetVerse, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i} className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 hover:border-[#CBDCBD]/30 hover:bg-[#CBDCBD]/10 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#CBDCBD] to-[#d4e5c7] rounded-xl flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-7 h-7 text-[#063A3A]" />
                </div>
                <h2 className="text-3xl font-black text-[#CBDCBD] mt-2">{section.title}</h2>
              </div>
              <ul className="space-y-3 ml-[72px]">
                {section.content.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#CBDCBD] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-[#CBDCBD]/80 leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Data Retention */}
        <div className="mt-8 bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Data Retention</h2>
          <p className="text-[#CBDCBD]/80 leading-relaxed mb-4">
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy. When you delete your account, we will remove your personal data within 30 days, except where we are required to retain it for legal or regulatory purposes.
          </p>
        </div>

        {/* Children's Privacy */}
        <div className="mt-8 bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Children's Privacy</h2>
          <p className="text-[#CBDCBD]/80 leading-relaxed">
            AssetVerse is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
          </p>
        </div>

        {/* Changes to Policy */}
        <div className="mt-8 bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Changes to This Policy</h2>
          <p className="text-[#CBDCBD]/80 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. You are advised to review this policy periodically for any changes.
          </p>
        </div>

        {/* Contact */}
        <div className="mt-8 bg-gradient-to-r from-[#CBDCBD]/10 to-[#d4e5c7]/10 backdrop-blur-sm border-2 border-[#CBDCBD]/20 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Questions About Privacy?</h2>
          <p className="text-[#CBDCBD]/80 mb-6">
            If you have any questions or concerns about this Privacy Policy, please contact us:
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-[#CBDCBD]">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">privacy@assetverse.com</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-[#CBDCBD]/30"></div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <span className="font-semibold">Legal Department</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
