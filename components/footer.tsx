import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
              An interactive data storytelling project that visualizes vehicle
              crash patterns and trends across Texas. This platform highlights
              key risk factors and safety insights by analyzing crash counts by
              year, vehicle make, model, and age — helping Texans better
              understand what’s happening on their roads.
            </p>
          </div>

          <div>
            <h3 className="text-slate-800 text-lg font-semibold mb-4 flex items-center">
              <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mr-2"></span>
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  target="_blank"
                  href="https://ait-lab.vercel.app"
                  className="hover:text-blue-600 transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  AIT Lab
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://www.txdot.gov/safety/traffic-safety-division.html"
                  className="hover:text-blue-600 transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Texas DOT Traffic Safety
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://cris.dot.state.tx.us/"
                  className="hover:text-blue-600 transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Crash Records Information System
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://www.nhtsa.gov/research-data"
                  className="hover:text-blue-600 transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  NHTSA Research & Data
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://www.iihs.org/topics/fatality-statistics"
                  className="hover:text-blue-600 transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  IIHS Fatality Statistics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-800 text-lg font-semibold mb-4 flex items-center">
              <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mr-2"></span>
              About This Project
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              This visualization was created to turn raw crash data into
              meaningful insights. By analyzing vehicle age, model year, and
              manufacturer trends, the goal is to promote safer driving
              behavior, smarter policy decisions, and public awareness around
              road safety in Texas.
            </p>
            {/* <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
              <p className="text-slate-600 text-xs">
                <span className="text-blue-600 font-medium">Data source:</span>{" "}
                Texas Department of Transportation (TxDOT) crash records
                database. This is a demonstration project and may not reflect
                complete or current data.
              </p>
            </div> */}
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">
            © {currentYear}. All rights reserved. Developed by{" "}
            <Link
              target="_blank"
              href="https://gaurabchhetri.com.np"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Gaurab Chhetri
            </Link>
            . Supported by{" "}
            <Link
              target="_blank"
              href="https://ait-lab.vercel.app"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              AIT Lab
            </Link>
            .
          </p>
          {/* <div className="mt-4 md:mt-0 flex space-x-6">
            <a
              href="#"
              className="text-slate-500 hover:text-blue-600 transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-blue-600 transition-colors text-sm"
            >
              Terms of Use
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-blue-600 transition-colors text-sm"
            >
              Contact
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
