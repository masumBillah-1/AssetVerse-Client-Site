import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#063A3A] via-[#0a5555] to-[#063A3A] pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-3 bg-[#CBDCBD]/10 backdrop-blur-sm rounded-full border-2 border-[#CBDCBD]/20 mb-4">
            <span className="text-[#CBDCBD] font-bold text-lg">Get In Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#CBDCBD] mb-4">Contact Us</h1>
          <p className="text-lg text-[#CBDCBD]/80 max-w-2xl mx-auto">
            Have questions? Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-[#CBDCBD] mb-6">Contact Information</h2>
            
            {[
              {
                icon: Mail,
                title: 'Email',
                info: 'support@assetverse.com',
                subInfo: 'We reply within 24 hours'
              },
              {
                icon: Phone,
                title: 'Phone',
                info: '+880 1234-567890',
                subInfo: 'Mon-Fri 9am to 6pm'
              },
              {
                icon: MapPin,
                title: 'Location',
                info: 'Dhaka, Bangladesh',
                subInfo: 'Corporate Office'
              }
            ].map((item, i) => (
              <div key={i} className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-xl p-5 hover:border-[#CBDCBD]/30 hover:bg-[#CBDCBD]/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#CBDCBD] to-[#d4e5c7] rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-[#063A3A]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#CBDCBD] mb-1">{item.title}</h3>
                    <p className="text-[#CBDCBD] font-semibold text-sm mb-1">{item.info}</p>
                    <p className="text-[#CBDCBD]/60 text-xs">{item.subInfo}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Business Hours */}
            <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-xl p-5 mt-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-[#CBDCBD]" />
                <h3 className="text-lg font-black text-[#CBDCBD]">Business Hours</h3>
              </div>
              <div className="space-y-2 text-[#CBDCBD]/80 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Saturday - Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 rounded-xl p-6">
              <h2 className="text-2xl font-black text-[#CBDCBD] mb-6">Send Message</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[#CBDCBD] font-semibold mb-2 text-sm">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#063A3A]/50 border-2 border-[#CBDCBD]/20 rounded-lg text-[#CBDCBD] placeholder-[#CBDCBD]/40 focus:border-[#CBDCBD] focus:outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-[#CBDCBD] font-semibold mb-2 text-sm">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#063A3A]/50 border-2 border-[#CBDCBD]/20 rounded-lg text-[#CBDCBD] placeholder-[#CBDCBD]/40 focus:border-[#CBDCBD] focus:outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[#CBDCBD] font-semibold mb-2 text-sm">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-[#063A3A]/50 border-2 border-[#CBDCBD]/20 rounded-lg text-[#CBDCBD] placeholder-[#CBDCBD]/40 focus:border-[#CBDCBD] focus:outline-none transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#CBDCBD] to-[#d4e5c7] text-[#063A3A] rounded-lg font-bold hover:scale-105 hover:shadow-xl hover:shadow-[#CBDCBD]/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
