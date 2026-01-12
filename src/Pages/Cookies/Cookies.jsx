import { Cookie, CheckCircle, XCircle, Settings, Shield, Eye } from 'lucide-react';

const Cookies = () => {
  const cookieTypes = [
    {
      icon: Shield,
      title: 'Essential Cookies',
      description: 'Required for the website to function properly',
      required: true,
      examples: [
        'Authentication tokens',
        'Session management',
        'Security features',
        'Load balancing'
      ]
    },
    {
      icon: Eye,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors use our website',
      required: false,
      examples: [
        'Page views and traffic',
        'User behavior patterns',
        'Performance metrics',
        'Error tracking'
      ]
    },
    {
      icon: Settings,
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization',
      required: false,
      examples: [
        'Language preferences',
        'Theme settings (dark/light mode)',
        'User interface customization',
        'Remember user choices'
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
          <h1 className="text-5xl md:text-6xl font-black text-[#CBDCBD] mb-6">Cookie Policy</h1>
          <p className="text-xl text-[#CBDCBD]/80 max-w-3xl mx-auto">
            Learn about how we use cookies and similar technologies on AssetVerse.
          </p>
          <p className="text-[#CBDCBD]/60 mt-4">Last Updated: January 11, 2026</p>
        </div>

        {/* Introduction */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <Cookie className="w-8 h-8 text-[#CBDCBD] flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-black text-[#CBDCBD] mb-4">What Are Cookies?</h2>
              <p className="text-[#CBDCBD]/80 leading-relaxed">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, keeping you logged in, and understanding how you use our platform. We use cookies responsibly and transparently.
              </p>
            </div>
          </div>
        </div>

        {/* Cookie Types */}
        <div className="space-y-6 mb-8">
          {cookieTypes.map((type, i) => (
            <div key={i} className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 hover:border-[#CBDCBD]/30 hover:bg-[#CBDCBD]/10 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#CBDCBD] to-[#d4e5c7] rounded-xl flex items-center justify-center flex-shrink-0">
                  <type.icon className="w-7 h-7 text-[#063A3A]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-3xl font-black text-[#CBDCBD]">{type.title}</h2>
                    {type.required ? (
                      <span className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        Required
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-semibold">
                        <Settings className="w-4 h-4" />
                        Optional
                      </span>
                    )}
                  </div>
                  <p className="text-[#CBDCBD]/70 mb-4">{type.description}</p>
                </div>
              </div>
              
              <div className="ml-[72px]">
                <h3 className="text-lg font-bold text-[#CBDCBD] mb-3">Examples:</h3>
                <ul className="space-y-2">
                  {type.examples.map((example, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#CBDCBD] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[#CBDCBD]/80">{example}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* How We Use Cookies */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-6">How We Use Cookies</h2>
          <div className="space-y-4">
            {[
              'To keep you logged in to your account',
              'To remember your preferences and settings',
              'To understand how you interact with our platform',
              'To improve our services and user experience',
              'To ensure security and prevent fraud',
              'To provide personalized content and features'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-[#CBDCBD]/80 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Third-Party Cookies */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Third-Party Cookies</h2>
          <p className="text-[#CBDCBD]/80 leading-relaxed mb-4">
            We use limited third-party services that may set their own cookies:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#CBDCBD] rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-[#CBDCBD] font-semibold">Firebase Authentication</p>
                <p className="text-[#CBDCBD]/70">For secure user authentication and session management</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#CBDCBD] rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-[#CBDCBD] font-semibold">Stripe Payment Processing</p>
                <p className="text-[#CBDCBD]/70">For secure payment transactions and fraud prevention</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Managing Cookies */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Managing Your Cookie Preferences</h2>
          <p className="text-[#CBDCBD]/80 leading-relaxed mb-4">
            You have control over cookies. Here's how you can manage them:
          </p>
          <div className="space-y-4">
            <div className="bg-[#063A3A]/30 rounded-xl p-4">
              <h3 className="text-lg font-bold text-[#CBDCBD] mb-2">Browser Settings</h3>
              <p className="text-[#CBDCBD]/70">
                Most browsers allow you to refuse or delete cookies. Check your browser's help section for instructions.
              </p>
            </div>
            <div className="bg-[#063A3A]/30 rounded-xl p-4">
              <h3 className="text-lg font-bold text-[#CBDCBD] mb-2">Account Settings</h3>
              <p className="text-[#CBDCBD]/70">
                You can manage optional cookies through your AssetVerse account settings.
              </p>
            </div>
            <div className="bg-[#063A3A]/30 rounded-xl p-4 border-2 border-yellow-500/30">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-bold text-[#CBDCBD] mb-2">Important Note</h3>
                  <p className="text-[#CBDCBD]/70">
                    Disabling essential cookies may affect the functionality of AssetVerse and prevent you from using certain features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cookie Duration */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Cookie Duration</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#063A3A]/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#CBDCBD] mb-3">Session Cookies</h3>
              <p className="text-[#CBDCBD]/70">
                Temporary cookies that are deleted when you close your browser. Used for essential functions like authentication.
              </p>
            </div>
            <div className="bg-[#063A3A]/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#CBDCBD] mb-3">Persistent Cookies</h3>
              <p className="text-[#CBDCBD]/70">
                Remain on your device for a set period (typically 30-365 days). Used to remember your preferences.
              </p>
            </div>
          </div>
        </div>

        {/* Updates */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Updates to This Policy</h2>
          <p className="text-[#CBDCBD]/80 leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. We will notify you of any significant changes by posting the updated policy on this page with a new "Last Updated" date.
          </p>
        </div>

        {/* Contact */}
        <div className="mt-8 bg-gradient-to-r from-[#CBDCBD]/10 to-[#d4e5c7]/10 backdrop-blur-sm border-2 border-[#CBDCBD]/20 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Questions About Cookies?</h2>
          <p className="text-[#CBDCBD]/80 mb-6">
            If you have questions about our use of cookies, please contact us:
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-[#CBDCBD]">
            <div className="flex items-center gap-2">
              <Cookie className="w-5 h-5" />
              <span className="font-semibold">privacy@assetverse.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
