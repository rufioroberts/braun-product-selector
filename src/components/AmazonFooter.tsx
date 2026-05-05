export function AmazonFooter() {
  return (
    <footer className="w-full">
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-[#37475A] hover:bg-[#485769] text-white text-[13px] py-3.5 text-center transition-colors"
      >
        Back to top
      </button>

      {/* Main footer links */}
      <div className="bg-[#232F3E]">
        <div className="max-w-[1500px] mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white text-[14px] font-bold mb-3">Get to Know Us</h4>
              <ul className="space-y-2">
                {['About Amazon Australia', 'Careers', 'About Amazon', 'Investor Relations', 'Amazon Devices', 'Amazon Science'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-[13px] text-gray-400 hover:text-white hover:underline transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-[14px] font-bold mb-3">Make Money with Us</h4>
              <ul className="space-y-2">
                {['Sell on Amazon', 'Sell under Amazon Accelerator', 'Protect & Build Your Brand', 'Associates Programme', 'Fulfilment by Amazon', 'Advertise Your Products'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-[13px] text-gray-400 hover:text-white hover:underline transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-[14px] font-bold mb-3">Amazon Payment Methods</h4>
              <ul className="space-y-2">
                {['Amazon Currency Converter', 'Payment Methods Help', 'Shop with Points', 'Top Up Your Account', 'Top Up Your Account in Store'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-[13px] text-gray-400 hover:text-white hover:underline transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-[14px] font-bold mb-3">Let Us Help You</h4>
              <ul className="space-y-2">
                {['COVID-19 and Amazon', 'Track Packages or View Orders', 'Delivery Rates & Policies', 'Returns & Replacements', 'Manage Your Content and Devices', 'Amazon Assistant', 'Help'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-[13px] text-gray-400 hover:text-white hover:underline transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#131921] border-t border-gray-700">
        <div className="max-w-[1500px] mx-auto px-6 py-6">
          {/* Logo + locale */}
          <div className="flex flex-col items-center gap-4">
            {/* Logo */}
            <div className="flex flex-col items-center">
              <div className="flex items-baseline gap-0">
                <span className="text-white text-[18px] font-bold tracking-tight" style={{ fontFamily: 'Arial, sans-serif' }}>amazon</span>
                <span className="text-[#FF9900] text-[18px]" style={{ fontFamily: 'Arial, sans-serif' }}>.</span>
                <span className="text-white text-[11px] font-bold">com.au</span>
              </div>
              <svg viewBox="0 0 50 7" className="w-[50px] h-[5px] mt-0.5" fill="none">
                <path d="M2 5 C 12 2, 38 2, 48 5" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
                <path d="M45 2.5 L48 5 L45 5" fill="#FF9900" />
              </svg>
            </div>

            {/* Locale buttons */}
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-600 rounded text-[12px] text-gray-300 hover:border-gray-400 transition-colors">
                <span>🇦🇺</span>
                <span>English</span>
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-600 rounded text-[12px] text-gray-300 hover:border-gray-400 transition-colors">
                <span>A$</span>
                <span>AUD</span>
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-600 rounded text-[12px] text-gray-300 hover:border-gray-400 transition-colors">
                <span>🇦🇺</span>
                <span>Australia</span>
              </button>
            </div>
          </div>

          {/* Legal links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-gray-500">
            <a href="#" className="hover:text-white hover:underline">Conditions of Use & Sale</a>
            <a href="#" className="hover:text-white hover:underline">Privacy Notice</a>
            <a href="#" className="hover:text-white hover:underline">Interest-Based Ads</a>
          </div>
          <p className="mt-3 text-center text-[11px] text-gray-600">
            © 1996–2024, Amazon.com, Inc. or its affiliates
          </p>
          <p className="mt-1 text-center text-[10px] text-gray-700">
            Brand Store Wireframe Prototype — Not a live Amazon page
          </p>
        </div>
      </div>
    </footer>
  );
}
