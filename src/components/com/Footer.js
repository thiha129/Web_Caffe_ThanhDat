import React from 'react';
import '../css/Footer.css';
import { Button } from '../com/Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      {/* <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Bạn có gì muốn chia sẻ ?
        </p>
        <p className='footer-subscription-text'>
          Gửi gắm tâm tư cho chúng tôi :
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Tôi muốn ...'
            />
            <Button buttonStyle='btn--outline'>Gửi</Button>
          </form>
          
        </div>
      </section> */}
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Giới thiệu</h2>
            <Link to='/'>Trang chủ</Link>
            <Link to='/'>Giới thiệu</Link>
            <Link to='/'>Sản phẩmn</Link>
            <Link to='/'>Bài viết</Link>
            <Link to='/'>Liên hệ</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Dịch vụ </h2>
            <Link to='/'>Cách thức mua hàng</Link>
            <Link to='/'>Phương thức vận chuyển</Link>
            <Link to='/'>Ưu đãi mùa dich</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Quy định</h2>
            <Link to='/'>Quy định sử dụng</Link>
            <Link to='/'>Chính sách bảo mật</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Liên hệ</h2>
            <Link to='/'>Buôn Ma Thuột, Đák Lắk</Link>
            <Link to='/'>09090909090</Link>
            <Link to='/'>Email</Link>
            <Link to='/'>Shoppe</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
               Cà phê Thành Đạt
            <i class='fas fa-mug-hot' />
            </Link>
          </div>
          <small class='website-rights'>T-Plan © 2021</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
