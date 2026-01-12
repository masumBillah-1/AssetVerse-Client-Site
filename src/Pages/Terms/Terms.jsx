import { FileText, CheckCircle, XCircle, AlertTriangle, Scale, UserX, RefreshCw } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: 'By accessing and using AssetVerse, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. These terms apply to all users, including HR managers, employees, and visitors.'
    },
    {
      icon: UserX,
      title: 'User Accounts',
      content: 'You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate and complete information during registration. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these terms.'
    },
    {
      icon: Scale,
      title: 'Acceptable Use',
      content: 'You agree to use AssetVerse only for lawful purposes. You must not use the platform to transmit harmful code, spam, or malicious content. Attempting to gain unauthorized access to our systems is strictly prohibited. You must not interfere with other users\' ability to use the platform.'
    },
    {
      icon: FileText,
      title: 'Intellectual Property',
      content: 'All content, features, and functionality of AssetVerse are owned by us and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of our platform without written permission.'
    },
    {
      icon: RefreshCw,
      title: 'Subscription and Payments',
      content: 'Subscription fees are billed in advance on a monthly or annual basis. All payments are processed securely through Stripe. Refunds are provided according to our refund policy. We reserve the right to change pricing with 30 days notice. Failure to pay may result in service suspension.'
    },
    {
      icon: XCircle,
      title: 'Termination',
      content: 'We may terminate or suspend your account immediately if you breach these terms. You may cancel your subscription at any time through your account settings. Upon termination, your right to use the platform will cease immediately. We may retain certain data as required by law.'
    },
    {
      icon: AlertTriangle,
      title: 'Limitation of Liability',
      content: 'AssetVerse is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages. Our total liability shall not exceed the amount you paid in the last 12 months. We do not guarantee uninterrupted or error-free service.'
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
          <h1 className="text-5xl md:text-6xl font-black text-[#CBDCBD] mb-6">Terms of Service</h1>
          <p className="text-xl text-[#CBDCBD]/80 max-w-3xl mx-auto">
            Please read these terms carefully before using AssetVerse. By using our platform, you agree to these terms.
          </p>
          <p className="text-[#CBDCBD]/60 mt-4">Last Updated: January 11, 2026</p>
        </div>

        {/* Introduction */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <Scale className="w-8 h-8 text-[#CBDCBD] flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-black text-[#CBDCBD] mb-4">Agreement to Terms</h2>
              <p className="text-[#CBDCBD]/80 leading-relaxed">
                These Terms of Service constitute a legally binding agreement between you and AssetVerse. These terms govern your access to and use of our asset management platform, including any related services, features, content, and applications. Please read these terms carefully before using our services.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i} className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 hover:border-[#CBDCBD]/30 hover:bg-[#CBDCBD]/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#CBDCBD] to-[#d4e5c7] rounded-xl flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-7 h-7 text-[#063A3A]" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">{section.title}</h2>
                  <p className="text-[#CBDCBD]/80 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Terms */}
        <div className="mt-8 space-y-6">
          
          {/* Data Protection */}
          <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8">
            <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Data Protection and Privacy</h2>
            <p className="text-[#CBDCBD]/80 leading-relaxed mb-4">
              Your use of AssetVerse is also governed by our Privacy Policy. We collect and process personal data in accordance with applicable data protection laws. By using our platform, you consent to such processing and warrant that all data provided by you is accurate.
            </p>
            <a href="/privacy" className="text-[#CBDCBD] font-semibold hover:underline">
              Read our Privacy Policy →
            </a>
          </div>

          {/* Modifications */}
          <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8">
            <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Modifications to Terms</h2>
            <p className="text-[#CBDCBD]/80 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the platform. Your continued use of AssetVerse after such modifications constitutes acceptance of the updated terms. We recommend reviewing these terms periodically.
            </p>
          </div>

          {/* Governing Law */}
          <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8">
            <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Governing Law</h2>
            <p className="text-[#CBDCBD]/80 leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with the laws of Bangladesh. Any disputes arising from these terms or your use of AssetVerse shall be subject to the exclusive jurisdiction of the courts of Dhaka, Bangladesh.
            </p>
          </div>

          {/* Severability */}
          <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8">
            <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Severability</h2>
            <p className="text-[#CBDCBD]/80 leading-relaxed">
              If any provision of these terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms of Service will otherwise remain in full force and effect.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-8 bg-gradient-to-r from-[#CBDCBD]/10 to-[#d4e5c7]/10 backdrop-blur-sm border-2 border-[#CBDCBD]/20 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Questions About Terms?</h2>
          <p className="text-[#CBDCBD]/80 mb-6">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-[#CBDCBD]">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <span className="font-semibold">legal@assetverse.com</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-[#CBDCBD]/30"></div>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5" />
              <span className="font-semibold">Legal Department</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
