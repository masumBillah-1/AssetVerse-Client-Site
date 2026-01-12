import { FileText, Code, Package, Shield, ExternalLink } from 'lucide-react';

const Licenses = () => {
  const openSourceLibraries = [
    {
      name: 'React',
      version: '19.2.0',
      license: 'MIT',
      description: 'A JavaScript library for building user interfaces',
      url: 'https://reactjs.org/'
    },
    {
      name: 'React Router',
      version: '7.10.1',
      license: 'MIT',
      description: 'Declarative routing for React applications',
      url: 'https://reactrouter.com/'
    },
    {
      name: 'Tailwind CSS',
      version: '4.1.17',
      license: 'MIT',
      description: 'A utility-first CSS framework',
      url: 'https://tailwindcss.com/'
    },
    {
      name: 'DaisyUI',
      version: '5.5.8',
      license: 'MIT',
      description: 'Tailwind CSS component library',
      url: 'https://daisyui.com/'
    },
    {
      name: 'Lucide React',
      version: '0.556.0',
      license: 'ISC',
      description: 'Beautiful & consistent icon toolkit',
      url: 'https://lucide.dev/'
    },
    {
      name: 'Axios',
      version: '1.13.2',
      license: 'MIT',
      description: 'Promise based HTTP client',
      url: 'https://axios-http.com/'
    },
    {
      name: 'Firebase',
      version: '12.6.0',
      license: 'Apache-2.0',
      description: 'Backend platform for web and mobile apps',
      url: 'https://firebase.google.com/'
    },
    {
      name: 'TanStack Query',
      version: '5.90.12',
      license: 'MIT',
      description: 'Powerful data synchronization for React',
      url: 'https://tanstack.com/query'
    },
    {
      name: 'React Hook Form',
      version: '7.68.0',
      license: 'MIT',
      description: 'Performant, flexible forms with validation',
      url: 'https://react-hook-form.com/'
    },
    {
      name: 'Recharts',
      version: '3.5.1',
      license: 'MIT',
      description: 'Composable charting library built on React',
      url: 'https://recharts.org/'
    },
    {
      name: 'SweetAlert2',
      version: '11.26.4',
      license: 'MIT',
      description: 'Beautiful, responsive popup boxes',
      url: 'https://sweetalert2.github.io/'
    },
    {
      name: 'React Hot Toast',
      version: '2.6.0',
      license: 'MIT',
      description: 'Smoking hot React notifications',
      url: 'https://react-hot-toast.com/'
    },
    {
      name: 'GSAP',
      version: '3.13.0',
      license: 'Standard License',
      description: 'Professional-grade animation library',
      url: 'https://greensock.com/gsap/'
    },
    {
      name: 'Stripe',
      version: '20.0.0',
      license: 'MIT',
      description: 'Payment processing platform',
      url: 'https://stripe.com/'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#063A3A] via-[#0a5555] to-[#063A3A] pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-[#CBDCBD]/10 backdrop-blur-sm rounded-full border-2 border-[#CBDCBD]/20 mb-6">
            <span className="text-[#CBDCBD] font-bold text-lg">Legal</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#CBDCBD] mb-6">Open Source Licenses</h1>
          <p className="text-xl text-[#CBDCBD]/80 max-w-3xl mx-auto">
            AssetVerse is built with amazing open source software. We're grateful to the developers and communities behind these projects.
          </p>
        </div>

        {/* AssetVerse License */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 mb-12">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-[#CBDCBD] flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-black text-[#CBDCBD] mb-4">AssetVerse Platform License</h2>
              <p className="text-[#CBDCBD]/80 leading-relaxed mb-4">
                The AssetVerse platform and its proprietary code are protected by copyright. All rights reserved © 2025 AssetVerse. Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.
              </p>
              <div className="bg-[#063A3A]/30 rounded-lg p-4 border-l-4 border-[#CBDCBD]">
                <p className="text-[#CBDCBD]/70 text-sm">
                  <span className="font-semibold text-[#CBDCBD]">Note: </span>
                  While AssetVerse uses open source libraries, the platform itself is proprietary software licensed to users under our Terms of Service.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Open Source Libraries */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Code className="w-8 h-8 text-[#CBDCBD]" />
            <h2 className="text-4xl font-black text-[#CBDCBD]">Third-Party Open Source Software</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {openSourceLibraries.map((lib, i) => (
              <div key={i} className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-6 hover:border-[#CBDCBD]/30 hover:bg-[#CBDCBD]/10 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#CBDCBD] to-[#d4e5c7] rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-[#063A3A]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#CBDCBD]">{lib.name}</h3>
                      <p className="text-[#CBDCBD]/60 text-sm">v{lib.version}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-xs font-bold">
                    {lib.license}
                  </span>
                </div>
                
                <p className="text-[#CBDCBD]/70 text-sm mb-4">{lib.description}</p>
                
                <a 
                  href={lib.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#CBDCBD] hover:text-white transition-colors text-sm font-semibold"
                >
                  <span>Visit Project</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* License Types */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-6">Common License Types</h2>
          <div className="space-y-6">
            
            <div className="bg-[#063A3A]/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#CBDCBD] mb-3">MIT License</h3>
              <p className="text-[#CBDCBD]/70 text-sm leading-relaxed">
                A permissive license that allows commercial use, modification, distribution, and private use. It requires only preservation of copyright and license notices. Most of our dependencies use this license.
              </p>
            </div>

            <div className="bg-[#063A3A]/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#CBDCBD] mb-3">Apache License 2.0</h3>
              <p className="text-[#CBDCBD]/70 text-sm leading-relaxed">
                Similar to MIT but also provides an express grant of patent rights from contributors. Used by Firebase and other enterprise-grade libraries.
              </p>
            </div>

            <div className="bg-[#063A3A]/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#CBDCBD] mb-3">ISC License</h3>
              <p className="text-[#CBDCBD]/70 text-sm leading-relaxed">
                Functionally equivalent to MIT and BSD licenses, but with simpler language. Used by some modern JavaScript libraries.
              </p>
            </div>
          </div>
        </div>

        {/* Attribution */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Attribution & Acknowledgments</h2>
          <p className="text-[#CBDCBD]/80 leading-relaxed mb-4">
            We are deeply grateful to the open source community and the maintainers of the libraries we use. Their hard work and dedication make projects like AssetVerse possible.
          </p>
          <div className="bg-[#063A3A]/30 rounded-lg p-4">
            <p className="text-[#CBDCBD]/70 text-sm">
              All trademarks, logos, and brand names are the property of their respective owners. Use of these names, logos, and brands does not imply endorsement.
            </p>
          </div>
        </div>

        {/* Full License Texts */}
        <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <FileText className="w-8 h-8 text-[#CBDCBD] flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Full License Texts</h2>
              <p className="text-[#CBDCBD]/80 leading-relaxed mb-4">
                Complete license texts for all third-party software can be found in the respective project repositories linked above. You can also find them in the <code className="px-2 py-1 bg-[#063A3A]/50 rounded text-[#CBDCBD] text-sm">node_modules</code> directory of our source code.
              </p>
              <p className="text-[#CBDCBD]/70 text-sm">
                If you have questions about any license or need additional information, please contact our legal team at <span className="font-semibold text-[#CBDCBD]">legal@assetverse.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-8 bg-gradient-to-r from-[#CBDCBD]/10 to-[#d4e5c7]/10 backdrop-blur-sm border-2 border-[#CBDCBD]/20 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-black text-[#CBDCBD] mb-4">Questions About Licenses?</h2>
          <p className="text-[#CBDCBD]/80 mb-6">
            For licensing inquiries or to report a license compliance issue:
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-[#CBDCBD]">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <span className="font-semibold">legal@assetverse.com</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-[#CBDCBD]/30"></div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">Legal & Compliance Team</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Licenses;
