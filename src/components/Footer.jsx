import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            {/* <svg className="bi" width="30" height="24"><use xlink:href="#bootstrap"></use></svg> */}
          </Link>
          <span className="text-muted">© 2024 TastyBites, Inc</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          {/* <li class="ms-3"><Link class="text-muted" to="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"></use></svg></Link></li>
          <li class="ms-3"><Link class="text-muted" to="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"></use></svg></Link></li>
          <li class="ms-3"><Link class="text-muted" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg></Link></li> */}
        </ul>
      </footer>
    </div>
  )
}

export default Footer