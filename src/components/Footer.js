import React, { useState } from "react";
import '../css/Footer.css';
import '../css/Modal.css';
import '../css/Button1.css';

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

};

function Footer() {
    const [modalft, setModalft] = useState(false);
    const toggleModalft = () => {
        setModalft(!modalft);
    };
    if (modalft) {
        document.body.classList.add('active-modalft')
    } else {
        document.body.classList.remove('active-modalft')
    }
    // *****modal1
    const [modalft1, setModalft1] = useState(false);
    const toggleModalft1 = () => {
        setModalft1(!modalft1);
    };
    if (modalft1) {
        document.body.classList.add('active-modalft1')
    } else {
        document.body.classList.remove('active-modalft1')
    }
    // *****modal2
    const [modalft2, setModalft2] = useState(false);
    const toggleModalft2 = () => {
        setModalft2(!modalft2);
    };
    if (modalft2) {
        document.body.classList.add('active-modalft2')
    } else {
        document.body.classList.remove('active-modalft2')
    }
    // *****modal3
    const [modalft3, setModalft3] = useState(false);
    const toggleModalft3 = () => {
        setModalft3(!modalft3);
    };
    if (modalft3) {
        document.body.classList.add('active-modalft3')
    } else {
        document.body.classList.remove('active-modalft3')
    }
    // *****modal4
    const [modalft4, setModalft4] = useState(false);
    const toggleModalft4 = () => {
        setModalft4(!modalft4);
    };
    if (modalft4) {
        document.body.classList.add('active-modalft4')
    } else {
        document.body.classList.remove('active-modalft4')
    }
    // *****modal5
    const [modalft5, setModalft5] = useState(false);
    const toggleModalft5 = () => {
        setModalft5(!modalft5);
    };
    if (modalft5) {
        document.body.classList.add('active-modalft5')
    } else {
        document.body.classList.remove('active-modalft5')
    }
    // *****modal6
    const [modalft6, setModalft6] = useState(false);
    const toggleModalft6 = () => {
        setModalft6(!modalft6);
    };
    if (modalft6) {
        document.body.classList.add('active-modalft6')
    } else {
        document.body.classList.remove('active-modalft6')
    }


    // ------------------------------------------------------



    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)

    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    return (

        <div className="footertong" >
            {modalft && (
                <div className="modalft">
                    <div onClick={toggleModalft} className="overlayft"></div>
                    <div className="modalft-content">
                        <div className='title-fab'>
                            <h1>Cách thức giao hàng</h1>
                        </div>
                        <p>
                            <p>Mua hàng trên Cà Phê thành đạt luôn là một trải nghiệm tiện lợi.
                                Dù bạn đang có nhu cầu mua bất kỳ nông sản nào cũng sẽ đảm bảo cung
                                cấp cho bạn những sản phẩm chất lượng. Bên cạnh đó, CF Thành Đạt cũng
                                có sự tham gia của các thương hiệu hàng đầu thế giới được cập nhập liên tục.
                                Là một kênh bán hàng uy tín, CF Thành Đạt luôn cam kết mang lại cho khách hàng
                                những trải nghiệm mua sắm online giá rẻ, an toàn và tin cậy. Các hoạt động giao
                                dịch thanh toán tại CF Thành Đạt luôn được đảm bảo diễn ra nhanh chóng, an toàn.
                                Một vấn đề nữa khiến cho các khách hàng luôn quan tâm đó chính là mua hàng trên
                                CF Thành Đạt có đảm bảo không. CF Thành Đạt luôn cam kết mọi sản phẩm trên
                                CF Thành Đạt, đặc biệt là CF Thành Đạt đều là những sản phẩm chính hãng,
                                đầy đủ tem nhãn, bảo hành từ nhà bán hàng. Ngoài ra, CF Thành Đạt bảo vệ người mua
                                và người bán bằng cách giữ số tiền giao dịch đến khi người mua xác nhận đồng ý với đơn hàng
                                và không có yêu cầu khiếu nại, trả hàng hay hoàn tiền nào.
                                Thanh toán sau đó sẽ được chuyển đến cho người bán. Đến với CF Thành Đạt
                                ngay hôm nay để mua hàng online giá rẻ và trải nghiệm dịch vụ chăm sóc khách hàng
                                tuyệt vời tại đây. Đặc biệt khi mua sắm trên CF Thành Đạt bạn sẽ được miễn phí vận chuyển,
                                giao hàng tận nơi và 7 ngày miễn phí trả hàng. Ngoài ra, khách hàng có thể sử dụng
                                CF Thành Đạt Xu để đổi lấy mã giảm giá có giá trị cao và voucher dịch vụ hấp dẫn.
                                Tiếp đến là CF Thành Đạt App , với các ưu đãi độc quyền từ các thương hiệu lớn có
                                những khách hàng đã đăng ký làm thành viên. Hãy truy cập ngay CF Thành Đạt
                                .vn hoặc tải ngay ứng dụng CF Thành Đạt về điện thoại ngay hôm nay!</p>
                        </p>
                        <button className="close-modalft" onClick={toggleModalft}>
                            x
                        </button>
                    </div>
                </div>
            )}

            {modalft1 && (
                <div className="modalft">
                    <div onClick={toggleModalft1} className="overlayft"></div>
                    <div className="modalft-content">
                        <div className='title-fab'>
                            <h2>Cách thức giao hàng</h2>
                        </div>
                        <p>
                            <p>Mua hàng trên Cà Phê thành đạt luôn là một trải nghiệm tiện lợi.
                                Dù bạn đang có nhu cầu mua bất kỳ nông sản nào cũng sẽ đảm bảo cung
                                cấp cho bạn những sản phẩm chất lượng. Bên cạnh đó, CF Thành Đạt cũng
                                có sự tham gia của các thương hiệu hàng đầu thế giới được cập nhập liên tục.
                                Là một kênh bán hàng uy tín, CF Thành Đạt luôn cam kết mang lại cho khách hàng
                                những trải nghiệm mua sắm online giá rẻ, an toàn và tin cậy. Các hoạt động giao
                                dịch thanh toán tại CF Thành Đạt luôn được đảm bảo diễn ra nhanh chóng, an toàn.
                                Một vấn đề nữa khiến cho các khách hàng luôn quan tâm đó chính là mua hàng trên
                                CF Thành Đạt có đảm bảo không. CF Thành Đạt luôn cam kết mọi sản phẩm trên
                                CF Thành Đạt, đặc biệt là CF Thành Đạt đều là những sản phẩm chính hãng,
                                đầy đủ tem nhãn, bảo hành từ nhà bán hàng. Ngoài ra, CF Thành Đạt bảo vệ người mua
                                và người bán bằng cách giữ số tiền giao dịch đến khi người mua xác nhận đồng ý với đơn hàng
                                và không có yêu cầu khiếu nại, trả hàng hay hoàn tiền nào.
                                Thanh toán sau đó sẽ được chuyển đến cho người bán. Đến với CF Thành Đạt
                                ngay hôm nay để mua hàng online giá rẻ và trải nghiệm dịch vụ chăm sóc khách hàng
                                tuyệt vời tại đây. Đặc biệt khi mua sắm trên CF Thành Đạt bạn sẽ được miễn phí vận chuyển,
                                giao hàng tận nơi và 7 ngày miễn phí trả hàng. Ngoài ra, khách hàng có thể sử dụng
                                CF Thành Đạt Xu để đổi lấy mã giảm giá có giá trị cao và voucher dịch vụ hấp dẫn.
                                Tiếp đến là CF Thành Đạt App , với các ưu đãi độc quyền từ các thương hiệu lớn có
                                những khách hàng đã đăng ký làm thành viên. Hãy truy cập ngay CF Thành Đạt
                                .vn hoặc tải ngay ứng dụng CF Thành Đạt về điện thoại ngay hôm nay!</p>
                        </p>
                        <button className="close-modalft" onClick={toggleModalft1}>
                            x
                        </button>
                    </div>
                </div>
            )}
            {modalft2 && (
                <div className="modalft">
                    <div onClick={toggleModalft2} className="overlayft"></div>
                    <div className="modalft-content">
                        <div className='title-fab'>
                            <h1>Phương thức thanh toán</h1>
                        </div>
                        <p>
                            <h5>1. Thanh toán bằng thẻ</h5>
                            <p>
                                Thanh toán bằng thẻ là một trong những phương thức thanh toán khá phổ biến ở Việt Nam hiện nay.
                                Phương thức thanh toán bằng thẻ hiện có 02 loại chính:Thanh toán bằng thẻ tín dụng hoặc thẻ ghi nợ quốc tế. Với hình thức này, người dùng chỉ cần sở hữu các loại thẻ như Visa, Master, JCB hay American Express là đã có thể thanh toán với hơn 60 website có kết nối với cổng thanh toán OnePay;Thanh toán bằng thẻ ghi nợ nội địa. Hình thức này dù rất phổ biến ở nước ngoài nhưng lại chưa thực sự phổ biến ở Việt Nam. Theo đó, khi sử dụng thẻ ghi nợ nội địa, các chủ thẻ có thể tiến hành thanh toán trực tiếp tai các website đã kết nối với ngân hàng Đông á và cổng thanh toán OnePay.</p>
                        </p>

                        <h5>2. Thanh toán bằng séc trực tuyến</h5>
                        <p>
                            Nhiều nghiên cứu chỉ ra rằng, phương thức thanh toán bằng séc (hay còn gọi là chi phiếu) trực tuyến hiện chiếm tới 11% tổng giao dịch trực tuyến.
                            Với phương thức này, khi tiến hành thanh toán, người dùng sẽ sử dụng tới séc qua mạng Internet. Người dùng chỉ cần điền vào form thông tin được yêu cầu của ngân hàng, điền chính xác ngày giao dịch và giá trị giao dịch rồi ấn nút “send” để gửi đi. Sau đó, trung tâm giao dịch khi nhận được thông tin sẽ tự động xử lý cho người giao dịch.
                            Từ thực tế hoạt động, phương thức thanh toán bằng séc mang tới ưu điểm là giao dịch thanh toán nhanh chóng và tiện lợi hơn nhiều séc truyền thống. Tuy nhiên, phương thức này lại tồn tại nhược điểm là sử dụng khá phức tạp. Sau giao dịch, người mua phải ra khỏi mạng để gửi séc đến cho người bán.\
                        </p>
                        <h5>3. Thanh toán bằng ví điện tử</h5>
                        <p>
                            Khi sử dụng phương thức thanh toán bằng ví điện tử, người dùng bắt buộc phải tạo và sở hữu tài khoản trên các ví điện tử như: Mobivi, Payoo, VnMart, Momo,...

                            Ví điện tử

                            Hình thức thanh toán ví điện tử.

                            Về ưu điểm, phương thức thanh toán bằng ví điện tử giúp người dùng có thể dễ dàng  chuyển tiền từ tài khoản ngân hàng vào tài khoản ví điện tử, hoặc cũng có thể nạp tiền vào ví bằng cách nộp tiền mặt nếu muốn, để tiến hành giao dịch thanh toán. Tuy nhiên, nhược điểm là: người dùng chỉ thực hiện thanh toán được trên các website chấp nhận ví điện tử này mà thôi.
                            Hiện nay, chi phí đăng ký tài khoản, dịch vụ tại các ví điện tử ở Việt Nam đa phần được miễn phí, mức phí khi sử dụng cũng tương đối thấp. Do đó đây là một trong những phương thức thanh toán khá phổ biến tại Việt Nam.

                            <h5>4. Thanh toán qua điện thoại di động</h5>
                            <p>
                                Ngày nay, khi điện thoại thông minh ngày càng trở nên phổ biến, từ thành thị đến nông thôn, thì phương thức thanh toán qua điện thoại di động cũng nhờ thế phát triển hơn rất nhiều.
                                Theo đó, người dùng có thể không cần mang theo tiền mặt vẫn có thể dễ dàng thanh toán khi đi mua sắm, sử dụng dịch vụ với một chiếc smartphone có cài đặt thanh toán qua điện thoại di động (Mobile Banking).
                                Hệ thống thanh toán qua điện thoại di động được xây dựng liên kết giữa các nhà cung cấp dịch vụ gồm: Ngân hàng, nhà cung cấp viễn thông, hệ thống tiêu dùng và người tiêu dùng.
                                Tuy nhiên, một trong những hạn chế của hình thức này là chỉ thanh toán trên các điện thoại thông minh.
                            </p>
                            <h5>5. Thanh toán qua chuyển khoản ngân hàng</h5>
                            <p>
                                Hình thức thanh toán qua chuyển khoản ngân hàng được thực hiện thông qua ATM hoặc thông qua giao dịch trực tiếp trên máy tính, điện thoại.

                                Chuyển khoản ngân hàng

                                Hình thức thanh toán qua chuyển khoản ngân hàng.

                                Với phương thức thanh toán điện tử này, người mua chỉ cần chuyển tiền từ tài khoản của mình sang tài khoản của người bán để thanh toán ngay khi thực hiện giao dịch. Rất tiện lợi cho người sử dụng.
                                Cũng bởi tính dễ dàng, tiện lợi, có thể chuyển khoản thanh toán ở bất cứ nơi đâu , bất cứ thời điểm nào chỉ với một chiếc smartphone hoặc máy tính có kết nối mạng, nên phương thức thanh toán chuyển khoản qua ngân hàng đã và đang ngày càng phổ biến tại Việt Nam. Hơn thế, phương thức thanh toán chuyển khoản qua ngân hàng hiện đã được pháp luật Việt nam quy định là 1 trong 2 loại hình thức thanh toán được chấp nhận trên hóa đơn nói chung, hóa đơn điện tử nói riêng.</p>
                        </p>
                        <button className="close-modalft" onClick={toggleModalft2}>
                            x
                        </button>
                    </div>
                </div>
            )}
            {modalft3 && (
                <div className="modalft">
                    <div onClick={toggleModalft3} className="overlayft"></div>
                    <div className="modalft-content">
                        <div className='title-fab'>
                            <h1>Đổi trả sản phẩm</h1>
                        </div>
                        <p>
                            <h5>Yêu cầu cho sản phẩm đổi trả</h5>
                            <p>
                                Sản phẩm/voucher/GCN còn nguyên vẹn, đầy đủ nhãn mác, nguyên đai kiện, niêm phong theo quy cách ban đầu (trừ trường hợp sản phẩm bị lỗi hoặc bị hư hại trong quá trình vận chuyển).
                                Sản phẩm còn đầy đủ phụ kiện (hướng dẫn sử dụng, phiếu bảo hành…) và tặng phẩm đi kèm (nếu có).
                                Khách hàng phải gửi cho CF Thành Đạt yêu cầu đổi trả (“Yêu Cầu Đổi Trả”) gồm có: (i) phiếu yêu cầu đổi trả theo mẫu phiếu yêu cầu đổi trả của CF Thành Đạt; (ii) tài liệu chứng minh khách hàng đã mua sản phẩm (số đơn hàng, hóa đơn mua hàng, biên nhận giao hàng, sao kê của ngân hàng…); và (iii) sản phẩm/dịch vụ cần đổi trả và tặng phẩm đi kèm nếu có.</p>
                            <h5>Thời gian đổi trả</h5>
                            <p>Trừ khi được quy định khác đi trong phần giới thiệu về sản phẩm/dịch vụ trên website CF Thành Đạt, Yêu Cầu Đổi Trả của khách hàng phải được gửi cho CF Thành Đạt trong vòng 03 ngày kể từ ngày nhận sản phẩm và voucher/GCN dịch vụ.
                                Thời điểm Yêu Cầu Đổi Trả sẽ được xác định như sau:
                                Nếu khách hàng gửi Yêu Cầu Đổi Trả theo đường bưu điện hay chuyển phát: theo dấu biên nhận của bưu điện hay đơn vị chuyển phát.
                                Nếu khách hàng tự mang Yêu Cầu Đổi Trả tới công ty CF Thành Đạt: là khi nhân viên tiếp nhận Yêu Cầu Đổi Trả từ khách hàng.</p>
                            <h5>Chi phí đổi trả</h5>
                            <p>Đối với các sản phẩm/voucher/GCN đổi lại do lỗi của CF Thành Đạt hoặc nhà cung cấp, khách hàng sẽ được miễn phí đổi trả và được giao hàng miễn phí tới địa điểm ghi trên phiếu yêu cầu đổi trả.
                                Đối với các sản phẩm/voucher/GCN trả lại do khách hàng thay đổi nhu cầu sử dụng, trừ trường hợp bài giới thiệu sản phẩm/voucher/GCN quy định áp dụng phí đổi trả, khách hàng sẽ được miễn phí đổi trả và sẽ phải trả phí vận chuyển theo chính sách giao vận của CF Thành Đạt nếu muốn được gửi hàng/voucher/GCN mới đến địa chỉ yêu cầu.</p>
                        </p>
                        <button className="close-modalft" onClick={toggleModalft3}>
                            x
                        </button>
                    </div>
                </div>
            )}
            {modalft4 && (
                <div className="modalft">
                    <div onClick={toggleModalft4} className="overlayft"></div>
                    <div className="modalft-content">
                        <div className='title-fab'>
                            <h1>Quy định sử dụng</h1>
                        </div>
                        <p>
                            <p>CF Thành Đạt là website cung cấp các loại cà phê. Với việc sử dụng các thông tin, dịch vụ, sản phẩm trên website  đồng nghĩa với việc bạn đã chấp nhận hoàn toàn các quy định sử dụng website dưới đây.

                                Mời bạn vui lòng đọc kỹ các quy định sử dụng website dưới đây trước khi quyết định sử dụng thông tin, dịch vụ, sản phẩm của chúng tôi.

                                Đăng ký sử dụng và đăng nhập tài khoản

                                Khi đăng ký sử dụng tài khoản trên CF Thành Đạt, bạn cần cung cấp cho website các thông tin cá nhân chính xác, đầy đủ và mới nhất. Khi chọn mật khẩu cho tài khoản truy nhập, hãy chọn mật khẩu theo cách mà không ai có thể dễ dàng đoán được.

                                Sau khi đăng ký, bạn chịu trách nhiệm bảo quản mật khẩu và không nên tiết lộ mật khẩu cho bất cứ ai hoặc ủy quyền, cho phép bất cứ người nào sử dụng vào bất cứ mục đích nào CF Thành Đạt sẽ luôn coi việc truy nhập và sử dụng các dịch vụ trên trang web bằng tên truy nhập và mật khẩu của một người nào đó như là việc truy nhập và sử dụng các dịch vụ bởi chính khách hàng đó, bất kể tên truy nhập và mật khẩu có thể được sử dụng bởi người khác mà chủ sở hữu không biết hoặc không cho phép.

                                Nếu phát hiện ra bất cứ người nào biết mật khẩu hoặc sử dụng mật khẩu của mình để truy nhập và sử dụng các dịch vụ trên trang web, bạn cần thông báo ngay lập tức cho chúng tôi và thay đổi mật khẩu hoặc yêu cầu website hỗ trợ cài đặt mật khẩu mới.</p>
                        </p>
                        <button className="close-modalft" onClick={toggleModalft4}>
                            x
                        </button>
                    </div>
                </div>
            )}
            {modalft5 && (
                <div className="modalft">
                    <div onClick={toggleModalft5} className="overlayft"></div>
                    <div className="modalft-content">
                        <div className='title-fab'>
                            <h1>Chính sách bảo mật</h1>
                        </div>
                        <p>
                            <h5>1. Thu thập thông tin khách hàng</h5>
                            <p>Để sử dụng được các dịch vụ tư vấn miễn phí và thu phí của Luật Bảo Tín. Bạn phải cung cấp các thông tin cá nhân cần thiết. Chúng tôi cũng lưu trữ bất kỳ thông tin nào Bạn nhập trên Website hoặc gửi đến chúng tôi. Những thông tin đó sẽ được sử dụng cho mục đích phản hồi yêu cầu của Bạn, đưa ra những ý kiến tư vấn pháp lý‎ phù hợp cho từng vụ việc, nâng cao chất lượng dịch vụ và liên lạc với Bạn khi cần.</p>

                            <h5>2. Sử dụng thông tin</h5>
                            <p>Mục đích của việc thu thập thông tin là nhằm xây dựng một hệ thống khách hàng toàn diện của Luật Bảo Tín, nhằm hướng tới nâng tầm chất lượng dịch vụ, chất lượng chăm sóc khách hàng tốt nhất. Vì thế, việc sử dụng thông tin sẽ phục vụ những hoạt động sau:Gửi thư cập nhật các quy định mới của pháp luật liên quan đến ngành nghề kinh doanh của doanh nghiệp hoặc liên quan đến nhu cầu công việc của cá nhân, tổ chức;Cung cấp một số tiện ích, dịch vụ hỗ trợ khách hàng;Nâng cao chất lượng dịch vụ khách hàng của chúng tôi;Giải quyết các vấn đề, tranh chấp phát sinh liên quan đến việc sử dụng Website;Ngăn chặn những hoạt động vi phạm pháp luật Việt Nam.</p>

                            <h5>3. Chia sẻ thông tin</h5>
                            <p>Luật Bảo Tín biết rằng thông tin về Bạn là một phần rất quan trọng trong việc kinh doanh và chúng sẽ không được bán, trao đổi cho bất kỳ một bên thứ ba nào khác. Chúng tôi sẽ không chia sẻ thông tin khách hàng trừ những trường hợp cụ thể sau đây:Để bảo vệ Luật Bảo Tín và các bên thứ ba khác. Chúng tôi chỉ đưa ra thông tin cá nhân khi tin chắc rằng việc đưa những thông tin đó là phù hợp với luật pháp, bảo vệ quyền lợi, tài sản của người sử dụng dịch vụ, của chúng tôi và các bên thứ ba khác.Theo yêu cầu phù hợp với pháp luật Việt Nam từ một cơ quan chức năng có thẩm quyền hoặc khi chúng tôi tin rằng việc làm đó là cần thiết và phù hợp nhằm tuân theo các yêu cầu của pháp l‎uật.Trong những trường hợp còn lại, chúng tôi sẽ có thông báo cụ thể cho Bạn khi phải tiết lộ thông tin cho một bên thứ ba và thông tin này chỉ được cung cấp khi được sự phản hồi đồng ‎ý‎ từ phía bạn.Nó chắc chắn không bao gồm việc bán, chia sẻ dẫn đến việc làm lộ thông tin cá nhân của Bạn vì mục đích thương mại, vi phạm những cam kết được đặt ra trong quy định của Chính sách này.</p>
                        </p>
                        <button className="close-modalft" onClick={toggleModalft5}>
                            x
                        </button>
                    </div>
                </div>
            )}
            <div className="footer">
                <div className="containerft">
                    <div className="rowft">
                        <div className="footer-col">
                            <img className="header__logo" style={{ marginLeft: '0' }} src="./logo.png" alt="" />
                            <div className='gioithieu' style={{ color: 'white' }}>
                                <p>
                                    Cà phê Thành Đạt chuyên cung cấp sản cà phê nguyên chất.
                                </p>
                            </div>
                            <div style={{ paddingTop: '1em' }}></div>
                            <div className='lienhe'>
                                <h3 style={{ color: 'white', fontSize: '1.17em' }}>Liên hệ</h3>
                                <div style={{ paddingTop: '1em' }}></div>
                                <ul style={{ padding: 'revert', listStyleType: 'disc' }}>
                                    <li><a href="https://wego.here.com/directions/mix//C%C3%A0-Ph%C3%AA-Nguy%C3%AAn-Ch%E1%BA%A5t-Th%C3%A0nh-%C4%90%E1%BA%A1t-,-%C4%90%E1%BA%AFk-L%E1%BA%AFk,-Th%E1%BB%8B-Tr%E1%BA%A5n-Ea-TLing,-Huy%E1%BB%87n-C%C6%B0-J%C3%BAt,-Vi%E1%BB%87t-Nam:e-eyJuYW1lIjoiQ1x1MDBlMCBQaFx1MDBlYSBOZ3V5XHUwMGVhbiBDaFx1MWVhNXQgVGhcdTAwZTBuaCBcdTAxMTBcdTFlYTF0ICwgXHUwMTEwXHUxZWFmayBMXHUxZWFmayIsImFkZHJlc3MiOiIxMyBMXHUwMGVhIFF1XHUwMGZkIFx1MDExMFx1MDBmNG4gXHUwMTEwYWsgTlx1MDBmNG5nLCAxMDZcLzEgWVdhbmcgXHUwMTEwYWtsYWssIEJ1b24gTWEgVGh1b3QsIFx1MDExMFx1MWVhZmsgTFx1MWVhZmsgUHJvdmluY2UiLCJsYXRpdHVkZSI6MTIuNTg3NTk3NTU0MTc4LCJsb25naXR1ZGUiOjEwNy44OTIxNDkxNzk0MywicHJvdmlkZXJOYW1lIjoiZmFjZWJvb2siLCJwcm92aWRlcklkIjoxMDQwMzg3Njc5ODczMzN9?map=12.5876,107.89215,15,normal&fb_locale=vi_VN">Địa chỉ: 106/1 YWang Đaklak,Buon Ma Thuot, Đắk Lắk</a></li>
                                    <li><a href="#">Sđt: 093 220 06 45</a></li>
                                </ul>
                            </div>

                            <div className="footer-link ">
                                <div className="social-links">
                                    <a href="https://www.facebook.com/pages/category/Business-Service/C%C3%A0-Ph%C3%AA-Nguy%C3%AAn-Ch%E1%BA%A5t-Th%C3%A0nh-%C4%90%E1%BA%A1t-%C4%90%E1%BA%AFk-L%E1%BA%AFk-104038767987333/"><i class="fab fa-facebook-f"></i></a>
                                    <a href="https://www.facebook.com/pages/category/Business-Service/C%C3%A0-Ph%C3%AA-Nguy%C3%AAn-Ch%E1%BA%A5t-Th%C3%A0nh-%C4%90%E1%BA%A1t-%C4%90%E1%BA%AFk-L%E1%BA%AFk-104038767987333/"><i class="far fa-thumbs-up"></i></a>
                                    <a href="#"><i class="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="footer-column">
                            <h4>Giới thiệu</h4>

                            <ul>
                                <li><a onClick={toggleModalft1} className="btn-modalft">Cách thức giao hàng</a></li>
                                <li><a onClick={toggleModalft2} className="btn-modalft">Phương thức thanh toán</a></li>
                                <li><a onClick={toggleModalft3} className="btn-modalft">Đổi trả sản phẩm</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FCa%CC%80-phe%CC%82-Tha%CC%80nh-%C4%90a%CC%A3t-BMT-111574381364265%2F&tabs=timeline&width=340&height=187&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=721913305439216" style={{ border: 'none', overflow: 'hidden', width: '340px', height: '230px', float: 'right' }}></iframe>
                        </div>
                        {/* <div className="footer-col"> */}
                        {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[51.505, -0.09]}>
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>
                            </MapContainer> */}
                        {/* </div> */}
                        {/* <div className="footer-col">
                            <h4>FAQ</h4>
                            <ul>
                                <li><a onClick={toggleModalft1} className="btn-modalft">Cách thức giao hàng</a></li>
                                <li><a onClick={toggleModalft2} className="btn-modalft">Phương thức thanh toán</a></li>
                                <li><a onClick={toggleModalft3} className="btn-modalft">Đổi trả sản phẩm</a></li>
                            </ul>
                        </div> */}
                        {/* <div className="footer-col">
                            <h4>Quy định</h4>
                            <ul>
                                <li><a onClick={toggleModalft4} href="#">Quy định sử dụng</a></li>
                                <li><a onClick={toggleModalft5} href="#">Chính sách bảo mật</a></li>

                            </ul>
                        </div> */}

                        {/* <div class="">
                            <div class="tong-fab">
                                <input type="checkbox" id="click" />
                                <label className="label-fab" for="click">
                                    <i class="fab fa-facebook-messenger"></i>
                                    <i class="fas fa-times"></i>
                                </label >
                                <div class="fab-tong">
                                    <div class="head-text">
                                        Liên hệ với chúng tôi
                                    </div>
                                    <div class="chat-box">
                                        <div class="desc-text">
                                            Điền vào nội dung
                                        </div>
                                        <form action="#">
                                            <div class="field">
                                                <input type="text" placeholder="Tên của bạn" required />
                                            </div>
                                            <div class="field">
                                                <input type="text" placeholder="Địa chỉ email" required />
                                            </div>
                                            <div class="field textarea">
                                                <textarea cols="30" rows="10" placeholder="Nội dung..." required></textarea>
                                            </div>
                                            <div class="field">
                                                <button type="submit">Gửi</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>



        </div >
    );
}

export default Footer;