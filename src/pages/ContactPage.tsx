import React, { useState } from 'react';
import { MapPin, Mail, Send, MessageSquare } from 'lucide-react';
export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            Get in <span className="text-neon-pink">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions about your bonus? Need support? Our team is here to
            help 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <MapPin className="w-6 h-6 text-neon-cyan mr-3" />
                Visit Our Office
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                111 W 57th St Unit Quadplex 80
                <br />
                New York, NY 10019
                <br />
                United States
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Mail className="w-6 h-6 text-neon-purple mr-3" />
                Email Support
              </h2>
              <p className="text-gray-300 text-lg mb-4">
                For general inquiries and support:
              </p>
              <a
                href="mailto:support@neoncrypto.com"
                className="text-neon-cyan hover:text-white transition-colors text-xl font-medium">

                support@neoncrypto.com
              </a>
            </div>

            <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-neon-blue/10 to-transparent border-neon-blue/30">
              <h2 className="text-2xl font-bold text-white mb-4">Live Chat</h2>
              <p className="text-gray-300 mb-6">
                Our support agents are available 24/7 to assist you with your
                claims.
              </p>
              <button className="px-6 py-3 rounded-lg bg-neon-blue/20 text-neon-blue border border-neon-blue/50 hover:bg-neon-blue hover:text-white transition-all duration-300 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" /> Start Chat
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel p-8 md:p-10 rounded-3xl">
            <h2 className="text-3xl font-bold text-white mb-8">
              Send us a Message
            </h2>

            {submitted ?
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-neon-green/20 rounded-full flex items-center justify-center mb-6">
                  <Send className="w-10 h-10 text-neon-green" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-400">
                  Thank you for contacting us. We'll get back to you shortly.
                </p>
                <button
                onClick={() => setSubmitted(false)}
                className="mt-8 text-neon-cyan hover:text-white underline">

                  Send another message
                </button>
              </div> :

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Your Name
                    </label>
                    <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value
                    })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                    placeholder="John Doe" />

                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Email Address
                    </label>
                    <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                    placeholder="john@example.com" />

                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    subject: e.target.value
                  })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                  placeholder="How can we help?" />

                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value
                  })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all resize-none"
                  placeholder="Type your message here...">
                </textarea>
                </div>

                <button
                type="submit"
                className="w-full py-4 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-bold text-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 transform hover:scale-[1.02]">

                  Send Message
                </button>
              </form>
            }
          </div>
        </div>
      </div>
    </div>);

}