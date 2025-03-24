export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-50 text-slate-600 py-12 border-t border-slate-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-slate-800 text-lg font-semibold mb-4 flex items-center">
              <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mr-2"></span>
              Texas Crash Data Explorer
            </h3>
            <p className="text-slate-600 text-sm">
              An interactive data visualization project exploring vehicle crash patterns and trends across Texas. This
              tool helps identify risk factors and safety insights from historical crash data.
            </p>
          </div>

          <div>
            <h3 className="text-slate-800 text-lg font-semibold mb-4 flex items-center">
              <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mr-2"></span>
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.txdot.gov/safety/traffic-safety-division.html"
                  className="hover:text-blue-600 transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Texas DOT Traffic Safety
                </a>
              </li>
              <li>
                <a
                  href="https://cris.dot.state.tx.us/"
                  className="hover:text-blue-600 transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Crash Records Information System
                </a>
              </li>
              <li>
                <a
                  href="https://www.nhtsa.gov/research-data"
                  className="hover:text-blue-600 transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  NHTSA Research & Data
                </a>
              </li>
              <li>
                <a
                  href="https://www.iihs.org/topics/fatality-statistics"
                  className="hover:text-blue-600 transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  IIHS Fatality Statistics
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-800 text-lg font-semibold mb-4 flex items-center">
              <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mr-2"></span>
              About This Project
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              This interactive visualization was created to help understand patterns in vehicle crash data and promote
              safer driving practices across Texas.
            </p>
            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
              <p className="text-slate-600 text-xs">
                <span className="text-blue-600 font-medium">Data source:</span> Texas Department of Transportation
                (TxDOT) crash records database. This is a demonstration project and may not reflect complete or current
                data.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">© {currentYear} Texas Crash Data Explorer. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors text-sm">
              Terms of Use
            </a>
            <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

