import { Shield, Lock, Eye, Download, Trash2, Edit, CheckCircle, AlertTriangle } from 'lucide-react';

const GDPR = () => {
  const rights = [
    {
      icon: Eye,
      title: 'Right to Access',
      description: 'You have the right to request a copy of all personal data we hold about you.',
      action: 'Request your data through your account settings or contact us directly.'
    },
    {
      icon: Edit,
      title: 'Right to Rectification',
      description: 'You can request correction of inaccurate or incomplete personal data.',
      action: 'Update your information directly in your profile or contact support.'
    },
    {
      icon: Trash2,
      title: 'Right to Erasure',
      description: 'Also known as "right to be forgotten" - request deletion of your personal data.',
      action: 'Delete your account through settings or contact us for complete data removal.'
    },
    {
      icon: Lock,
      title: 'Right to Restrict Processing',
      description: 'You can request that we limit how we use your personal data.',
      action: 'Contact our data protection team to discuss processing restrictions.'
    },
    {
      icon: Download,
      title: 'Right to Data Portability',
      description: 'Request your data in a structured, machine-readable format.',
      action: 'Export your data from account settings in JSON or CSV format.'
    },
    {
      icon: Shield,
      title: 'Right to Object',
      description: 'Object to processing of your personal data for specific purposes.',
      action: 'Contact us to object to specific data processing activities.'
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
          <h1 className="text-5xl md:text-6xl font-black text-[#CBDCBD] mb-6">GDPR Compliance</h1>
          <p className="text-xl text-[#CBDCBD]/80 max-w-3xl mx-auto">
            AssetVerse is committed to protecting your data rights under the General Data Protection Regulation (GDPR).
          </p>
          <p className="text-[#CBDCBD]/60 mt-4">Last Updated: January 11, 2026</p>
        </div>

        {/* Introduction */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-[#CBDCBD] flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-black text-[#CBDCBD] mb-4">Our Commitment to GDPR</h2>
              <p className="text-[#CBDCBD]/80 leading-relaxed">
                The General Data Protection Regulation (GDPR) is a comprehensive data protection law that gives individuals control over their personal data. AssetVerse fully complies with GDPR requirements and respects your data protection rights. We process your data lawfully, fairly, and transparently.
              </p>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="mb-8">
          <h2 className="text-4xl font-black text-[#CBDCBD] mb-8 text-center">Your GDPR Rights</h2>
          <div className="space-y-6">
            {rights.map((right, i) => (
              <div key={i} className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 hover:border-[#CBDCBD]/30 hover:bg-[#CBDCBD]/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#CBDCBD] to-[#d4e5c7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <right.icon className="w-7 h-7 text-[#063A3A]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-[#CBDCBD] mb-3">{right.title}</h3>
                    <p className="text-[#CBDCBD]/80 mb-4 leading-relaxed">{right.description}</p>
                    <div className="bg-[#063A3A]/30 rounded-lg p-4 border-l-4 border-[#CBDCBD]">
                      <p className="text-[#CBDCBD]/70 text-sm">
                        <span className="font-semibold text-[#CBDCBD]">How to exercise: </span>
                        {right.action}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Basis */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-6">Legal Basis for Processing</h2>
          <p className="text-[#CBDCBD]/80 mb-6">We process your personal data based on the following legal grounds:</p>
          <div className="space-y-4">
            {[
              {
                title: 'Contract Performance',
                desc: 'Processing necessary to provide our asset management services to you'
              },
              {
                title: 'Consent',
                desc: 'You have given explicit consent for specific processing activities'
              },
              {
                title: 'Legal Obligation',
                desc: 'Processing required to comply with legal and regulatory requirements'
              },
              {
                title: 'Legitimate Interest',
                desc: 'Processing necessary for our legitimate business interests (e.g., fraud prevention)'
              }
            ].map((basis, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#063A3A]/30 rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#CBDCBD] font-semibold mb-1">{basis.title}</p>
                  <p className="text-[#CBDCBD]/70 text-sm">{basis.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Protection Measures */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-6">Data Protection Measures</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Encryption',
                desc: 'All data is encrypted in transit (TLS) and at rest (AES-256)'
              },
              {
                title: 'Access Controls',
                desc: 'Strict role-based access controls and authentication'
              },
              {
                title: 'Regular Audits',
                desc: 'Periodic security audits and vulnerability assessments'
              },
              {
                title: 'Data Minimization',
                desc: 'We only collect data necessary for our services'
              },
              {
                title: 'Secure Infrastructure',
                desc: 'Cloud infrastructure with industry-leading security standards'
              },
              {
                title: 'Staff Training',
                desc: 'Regular data protection training for all employees'
              }
            ].map((measure, i) => (
              <div key={i} className="bg-[#063A3A]/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#CBDCBD] mb-2">{measure.title}</h3>
                <p className="text-[#CBDCBD]/70 text-sm">{measure.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Retention */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Data Retention</h2>
          <p className="text-[#CBDCBD]/80 leading-relaxed mb-4">
            We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#CBDCBD] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[#CBDCBD]/80"><span className="font-semibold text-[#CBDCBD]">Active accounts:</span> Data retained while account is active</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#CBDCBD] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[#CBDCBD]/80"><span className="font-semibold text-[#CBDCBD]">Deleted accounts:</span> Personal data removed within 30 days</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#CBDCBD] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[#CBDCBD]/80"><span className="font-semibold text-[#CBDCBD]">Legal requirements:</span> Some data retained longer for compliance</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#CBDCBD] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[#CBDCBD]/80"><span className="font-semibold text-[#CBDCBD]">Backup data:</span> Automatically deleted after 90 days</p>
            </li>
          </ul>
        </div>

        {/* Data Breach */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Data Breach Notification</h2>
              <p className="text-[#CBDCBD]/80 leading-relaxed">
                In the unlikely event of a data breach that poses a risk to your rights and freedoms, we will notify you and the relevant supervisory authority within 72 hours of becoming aware of the breach, as required by GDPR Article 33 and 34.
              </p>
            </div>
          </div>
        </div>

        {/* International Transfers */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">International Data Transfers</h2>
          <p className="text-[#CBDCBD]/80 leading-relaxed">
            Your data is primarily stored and processed within the European Economic Area (EEA). If we transfer data outside the EEA, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs) approved by the European Commission.
          </p>
        </div>

        {/* Contact DPO */}
        <div className="mt-8 bg-gradient-to-r from-[#CBDCBD]/10 to-[#d4e5c7]/10 backdrop-blur-sm border-2 border-[#CBDCBD]/20 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Contact Our Data Protection Officer</h2>
          <p className="text-[#CBDCBD]/80 mb-6">
            For any GDPR-related questions or to exercise your rights, contact our Data Protection Officer:
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-[#CBDCBD]">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">dpo@assetverse.com</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-[#CBDCBD]/30"></div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span className="font-semibold">Data Protection Team</span>
            </div>
          </div>
          <p className="text-[#CBDCBD]/60 text-sm mt-6">
            You also have the right to lodge a complaint with your local data protection authority.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GDPR;
