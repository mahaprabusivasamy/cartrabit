import React from 'react'

export default function MainPage() {
  return (
    <div>
        <header>
          <h1>Guest Room Booking</h1>
          <nav>
            <ul>
              <li>
                {/* <Link to="/owner/login">Owner</Link> */}
                <a href="/owner/login">Owner</a>
              </li>
              <li>
                {/* <Link to="/customer/login">Customer</Link> */}
                <a href="/customer/login">Customer</a>
              </li>
            </ul>
          </nav>
        </header>
    </div>
  )
}
