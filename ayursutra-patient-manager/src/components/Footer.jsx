// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-300">
              AyurVeda Platform
            </h3>
            <p className="text-gray-300 text-sm">
              Connecting patients with authentic Ayurvedic healing through
              traditional wisdom and modern technology.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Consultation</li>
              <li>Panchakarma</li>
              <li>Herbal Medicines</li>
              <li>Lifestyle Guidance</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <p>📧 info@ayurvedaplatform.com</p>
              <p>📞 +91-98765-43210</p>
              <p>📍 Ayurveda Wellness Center, India</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          <p>
            &copy; 2024 AyurVeda Platform. All rights reserved. | Healing through
            ancient wisdom.
          </p>
        </div>
      </div>
    </footer>
  );
}
