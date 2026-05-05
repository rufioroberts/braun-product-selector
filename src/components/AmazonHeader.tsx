export function AmazonHeader() {
  return (
    <header className="w-full">
      {/* Main nav bar — #131921 */}
      <div className="bg-[#131921]">
        <div className="max-w-[1500px] mx-auto flex items-center h-[60px] px-2 md:px-4 gap-2 md:gap-3">
          {/* Logo */}
          <a href="#" className="flex-shrink-0 px-2 py-1.5 border border-transparent hover:border-white rounded-sm">
            <div className="flex items-baseline gap-0">
              <span className="text-white text-[22px] font-bold tracking-tight leading-none" style={{ fontFamily: 'Arial, sans-serif' }}>amazon</span>
              <span className="text-[#FF9900] text-[22px] leading-none" style={{ fontFamily: 'Arial, sans-serif' }}>.</span>
              <span className="text-white text-[13px] font-bold leading-none">com.au</span>
            </div>
            {/* Smile arrow */}
            <div className="relative h-[4px] w-[60px] mt-0.5 ml-1">
              <svg viewBox="0 0 60 8" className="w-full h-full" fill="none">
                <path d="M2 6 C 15 2, 45 2, 58 6" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M54 3 L58 6 L54 6" fill="#FF9900" />
              </svg>
            </div>
          </a>

          {/* Deliver to */}
          <a href="#" className="hidden lg:flex items-center gap-1 px-2 py-1.5 border border-transparent hover:border-white rounded-sm text-white">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <div className="leading-tight">
              <span className="text-[11px] text-gray-400 block">Delivering to Sydney 2000</span>
              <span className="text-[13px] font-bold">Update location</span>
            </div>
          </a>

          {/* Search bar */}
          <div className="flex-1 flex h-[40px] rounded-md overflow-hidden">
            {/* Category dropdown */}
            <select className="hidden md:block bg-[#e6e6e6] border-r border-gray-300 text-[12px] text-gray-700 px-2 pr-5 rounded-l-md appearance-none cursor-pointer hover:bg-gray-200" defaultValue="all">
              <option value="all">All</option>
              <option value="beauty">Beauty</option>
              <option value="electronics">Electronics</option>
              <option value="health">Health & Personal Care</option>
            </select>
            {/* Input */}
            <input
              type="text"
              placeholder="Search Amazon.com.au"
              className="flex-1 px-3 text-[14px] text-gray-900 bg-white outline-none border-none placeholder:text-gray-500"
              readOnly
            />
            {/* Search button */}
            <button className="w-[46px] bg-[#febd69] hover:bg-[#f3a847] flex items-center justify-center rounded-r-md">
              <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </div>

          {/* Right nav items */}
          <div className="flex items-center gap-0">
            {/* Language */}
            <a href="#" className="hidden xl:flex items-center gap-0.5 px-2 py-1.5 border border-transparent hover:border-white rounded-sm">
              <span className="text-[12px]">🇦🇺</span>
              <span className="text-white text-[13px] font-bold">EN</span>
              <svg className="w-2.5 h-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            {/* Account */}
            <a href="#" className="hidden md:flex flex-col px-2 py-1.5 border border-transparent hover:border-white rounded-sm text-white leading-tight">
              <span className="text-[11px] text-gray-300">Hello, sign in</span>
              <span className="text-[13px] font-bold flex items-center gap-0.5">
                Account & Lists
                <svg className="w-2.5 h-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </a>

            {/* Returns & Orders */}
            <a href="#" className="hidden md:flex flex-col px-2 py-1.5 border border-transparent hover:border-white rounded-sm text-white leading-tight">
              <span className="text-[11px] text-gray-300">Returns</span>
              <span className="text-[13px] font-bold">& Orders</span>
            </a>

            {/* Cart */}
            <a href="#" className="flex items-center px-2 py-1.5 border border-transparent hover:border-white rounded-sm text-white">
              <div className="relative">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <span className="absolute -top-1 right-0 text-[#f08804] text-[14px] font-bold">0</span>
              </div>
              <span className="text-[13px] font-bold hidden md:inline ml-0.5">Cart</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sub-nav bar — #232F3E */}
      <div className="bg-[#232F3E]">
        <div className="max-w-[1500px] mx-auto flex items-center h-[39px] px-2 md:px-4 gap-0 overflow-x-auto scrollbar-hide">
          {/* Hamburger + All */}
          <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 border border-transparent hover:border-white rounded-sm text-white text-[13px] font-bold flex-shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            All
          </a>
          {/* Nav links */}
          {[
            'Today\'s Deals',
            'Customer Service',
            'Gift Cards',
            'Registry',
            'Sell',
            'Prime',
          ].map((item) => (
            <a
              key={item}
              href="#"
              className="px-2.5 py-1.5 border border-transparent hover:border-white rounded-sm text-white text-[13px] whitespace-nowrap flex-shrink-0"
            >
              {item}
            </a>
          ))}
          {/* Brand Store highlight */}
          <a
            href="#"
            className="px-2.5 py-1.5 border border-transparent hover:border-white rounded-sm text-white text-[13px] font-bold whitespace-nowrap flex-shrink-0"
          >
            Braun Store
          </a>
        </div>
      </div>

      {/* Brand Store navigation bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1500px] mx-auto flex items-center h-[50px] px-4 gap-6">
          {/* Brand logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-[80px] h-[30px] bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
              <span className="text-[11px] font-bold tracking-[0.15em] text-gray-600">BRAUN</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-gray-200" />
          </div>
          {/* Store nav */}
          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {['Home', 'Shavers', 'Trimmers', 'IPL', 'Facial Care', 'All Products'].map((item, i) => (
              <a
                key={item}
                href="#"
                className={`px-3 py-1.5 text-[13px] rounded-full whitespace-nowrap transition-colors ${
                  i === 0
                    ? 'bg-gray-900 text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
