/**
 * RADOPS - Diagnostic Imaging Equipment & Radiation Safety Management Application
 * BỆNH VIỆN QUỐC TẾ VĨNH PHÚC (VPI) - KHOA CHẨN ĐOÁN HÌNH ẢNH
 * Phụ trách Khoa: BS. CKI. Trịnh Văn Bình
 * KTV Trưởng & Phụ trách ATBX: KTV. Vũ Bá Đạt (Mã NV: BV-345)
 * TÍCH HỢP HỆ THỐNG XÁC THỰC & PHÂN QUYỀN TRUY CẬP NGOẠI VIỆN (RBAC & REMOTE ACCESS)
 * Tuân thủ: Luật NLNT, Nghị định 142/2020/NĐ-CP, Thông tư 23/TT-BKHCN, Thông tư 02/2022/TT-BKHCN
 */

const STORAGE_KEY = 'radops_vpi_data_v4_rbac';

// Cơ sở dữ liệu chuẩn thực tế của Bệnh viện Quốc tế Vĩnh Phúc (VPI)
const defaultData = {
  hospital: {
    name: 'Bệnh viện Quốc tế Vĩnh Phúc (VPI)',
    legalName: 'Công ty Cổ phần Bệnh viện Quốc tế Vĩnh Phúc',
    code: 'BV-VPI',
    department: 'Khoa Chẩn đoán hình ảnh',
    headOfDept: 'BS. CKI. Trịnh Văn Bình',
    headOfDeptTitle: 'Phụ trách Khoa Chẩn đoán hình ảnh',
    officer: 'KTV. Vũ Bá Đạt',
    officerId: 'BV-345',
    officerTitle: 'Kỹ thuật viên Trưởng & Phụ trách ATBX',
    supervisionCycle: 'Tháng 10/2026',
    complianceRate: 100,
    legalBasis: 'Luật NLNT & NĐ 142/2020 & TT 23/TT-BKHCN'
  },
  settings: {
    theme: 'light',
    viewMode: 'mobile', // 'mobile' | 'desktop'
    autoSave: true
  },

  // HỆ THỐNG XÁC THỰC & PHÂN QUYỀN (RBAC)
  auth: {
    currentUserId: 'NV-01', // Mặc định KTV Trưởng Vũ Bá Đạt
    locationMode: 'external', // 'internal' (Nội viện LAN) | 'external' (Ngoại viện 4G/Internet)
    roles: {
      admin: {
        id: 'admin',
        title: 'Quản trị viên ATBX (KTV Trưởng)',
        badgeColor: 'blue',
        canManageDevices: true,
        canManageLegal: true,
        canScheduleInspection: true,
        canManageStaff: true,
        canManagePermissions: true,
        canCreateTickets: true,
        canApproveTickets: true,
        canExportReport: true,
        allowExternal: true,
        description: 'Toàn quyền cấu hình máy, pháp lý Cục ATBXHN, phân quyền nhân sự'
      },
      doctor: {
        id: 'doctor',
        title: 'Lãnh đạo Khoa (Bác sĩ Trưởng khoa)',
        badgeColor: 'emerald',
        canManageDevices: true,
        canManageLegal: true,
        canScheduleInspection: true,
        canManageStaff: true,
        canManagePermissions: true,
        canCreateTickets: true,
        canApproveTickets: true,
        canExportReport: true,
        allowExternal: true,
        description: 'Duyệt báo cáo, chỉ đạo chuyên môn, phê duyệt đề xuất thiết bị'
      },
      technician: {
        id: 'technician',
        title: 'Kỹ thuật viên CĐHA',
        badgeColor: 'indigo',
        canManageDevices: false,
        canManageLegal: false,
        canScheduleInspection: false,
        canManageStaff: false,
        canManagePermissions: false,
        canCreateTickets: true,
        canApproveTickets: false,
        canExportReport: false,
        allowExternal: true,
        description: 'Vận hành máy, báo hỏng thiết bị, xem hồ sơ & chứng chỉ cá nhân'
      },
      nurse: {
        id: 'nurse',
        title: 'Điều dưỡng CĐHA',
        badgeColor: 'pink',
        canManageDevices: false,
        canManageLegal: false,
        canScheduleInspection: false,
        canManageStaff: false,
        canManagePermissions: false,
        canCreateTickets: true,
        canApproveTickets: false,
        canExportReport: false,
        allowExternal: true,
        description: 'Quản lý máy siêu âm, an toàn thuốc cản quang, báo hỏng máy'
      },
      secretary: {
        id: 'secretary',
        title: 'Thư ký y khoa',
        badgeColor: 'amber',
        canManageDevices: false,
        canManageLegal: false,
        canScheduleInspection: false,
        canManageStaff: false,
        canManagePermissions: false,
        canCreateTickets: true,
        canApproveTickets: false,
        canExportReport: false,
        allowExternal: false,
        description: 'Quản lý máy in phim, vật tư tiêu hao, đón tiếp bệnh nhân'
      },
      auditor: {
        id: 'auditor',
        title: 'Thanh tra Sở KH&CN / Giám sát QLCL',
        badgeColor: 'purple',
        canManageDevices: false,
        canManageLegal: false,
        canScheduleInspection: false,
        canManageStaff: false,
        canManagePermissions: false,
        canCreateTickets: false,
        canApproveTickets: false,
        canExportReport: true,
        allowExternal: true,
        description: 'Quyền xem hồ sơ thanh tra (Read-only): Kiểm định, liều kế, giấy phép'
      }
    },
    auditLogs: [
      { id: 'LOG-01', time: '16:30 Hôm nay', userName: 'KTV. Vũ Bá Đạt', role: 'KTV Trưởng & Phụ trách ATBX', action: 'Đăng nhập Ngoại viện (4G/Internet)', ip: '14.238.10.24 (Viettel 4G)', status: 'success' },
      { id: 'LOG-02', time: '14:15 Hôm nay', userName: 'BS. CKI. Trịnh Văn Bình', role: 'Phụ trách Khoa CĐHA', action: 'Duyệt báo cáo an toàn bức xạ C6', ip: '113.190.22.88 (FPT Internet)', status: 'success' },
      { id: 'LOG-03', time: '11:20 Hôm nay', userName: 'KTV. Hoàng Tuấn Đạt', role: 'Kỹ thuật viên CĐHA', action: 'Ghi nhận cảnh báo máy CT GE ACT 32', ip: '192.168.0.171 (Mạng LAN VPI)', status: 'success' },
      { id: 'LOG-04', time: '09:05 Hôm nay', userName: 'TK. Nguyễn Thị Thúy Nga', role: 'Thư ký y khoa', action: 'Đăng nhập Ngoại viện (Bị chặn do khóa quyền)', ip: '42.115.89.12 (Ngoại viện)', status: 'blocked' }
    ]
  },

  // 14 THIẾT BỊ THỰC TẾ ĐANG VẬN HÀNH TẠI KHOA CĐHA - BV VĨNH PHÚC VPI
  devices: [
    {
      id: 'TB-01',
      code: 'CT-SIEMENS',
      name: 'Máy Cắt lớp vi tính CT 32 lát cắt Siemens Somatom',
      category: 'Bức xạ',
      subCategory: 'Cắt lớp vi tính',
      model: 'Somatom Scope / Definition',
      manufacturer: 'Siemens Healthineers',
      country: 'Đức',
      serialNumber: 'SM-CT32-VPI-2021',
      yearManufacture: 2020,
      yearUsage: 2021,
      room: 'Phòng CT-Scanner',
      roomLocation: 'Tầng 1 - Khoa CĐHA',
      personInCharge: 'KTV. Vũ Bá Đạt',
      phone: '0978.892.345',
      status: 'active',
      statusText: 'Đang hoạt động (GCN kiểm định đến 09/12/2026)',
      licenseNumber: 'GP-ATBX-CT (Cục ATBXHN)',
      licenseAuthority: 'Cục An toàn bức xạ và hạt nhân',
      licenseExpiry: '2028-01-08',
      licenseDaysLeft: 452,
      licenseAlertLevel: 'safe',
      inspectionNumber: 'KĐ-CT32-SIEMENS-2025',
      inspectionDate: '2025-12-09',
      inspectionExpiry: '2026-12-09',
      inspectionDaysLeft: 57,
      inspectionAlertLevel: 'safe',
      tubeSeconds: 'Bóng phát Straton MX - Nhiệt độ anode 48°C',
      specifications: '32 lát cắt/vòng quay; Công nghệ giảm liều tia CARE Dose4D; Thuật toán tái tạo ảnh lặp SAFIRE; Khẩu độ gantry 70 cm.',
      notes: 'Hợp đồng kiểm định bức xạ định kỳ và kết quả kiểm xạ phòng máy đạt chuẩn TCVN có hiệu lực đến 09/12/2026.'
    },
    {
      id: 'TB-02',
      code: 'CT-GE',
      name: 'Máy Cắt lớp vi tính CT Revolution ACT GE',
      category: 'Bức xạ',
      subCategory: 'Cắt lớp vi tính',
      model: 'Revolution ACT 32 Slices',
      manufacturer: 'GE Healthcare',
      country: 'Mỹ',
      serialNumber: 'GE-REV-ACT-VPI-88',
      yearManufacture: 2021,
      yearUsage: 2021,
      room: 'Phòng CT-Scanner',
      roomLocation: 'Tầng 1 - Khoa CĐHA',
      personInCharge: 'KTV. Khổng Trọng Hưởng',
      phone: '0983.456.789',
      status: 'warning',
      statusText: 'Đang hoạt động (Chuẩn bị gia hạn GPBX)',
      licenseNumber: '45/GP-ATBX (Cục ATBXHN)',
      licenseAuthority: 'Cục An toàn bức xạ và hạt nhân',
      licenseExpiry: '2026-11-25',
      licenseDaysLeft: 42,
      licenseAlertLevel: 'danger',
      inspectionNumber: 'KĐ-CT-GE-2025-01',
      inspectionDate: '2025-10-15',
      inspectionExpiry: '2026-10-15',
      inspectionDaysLeft: 2,
      inspectionAlertLevel: 'warning',
      tubeSeconds: 'Công suất bóng phát 24 kW; Tiêu điểm 0.7 x 0.6 mm',
      specifications: 'Công nghệ Clarity Panel Detector; Bộ tái tạo ASiR giảm liều lên đến 40%; Chụp mạch máu CTA và tầm soát đột quỵ não.',
      notes: 'Bắt buộc nộp hồ sơ xin gia hạn GPBX trước mốc 45 ngày theo Nghị định 142/2020/NĐ-CP (Hiện còn 42 ngày).'
    },
    {
      id: 'TB-03',
      code: 'MRI-15GE',
      name: 'Máy Chụp Cộng hưởng từ MRI 1.5 Tesla GE',
      category: 'Từ trường',
      subCategory: 'Cộng hưởng từ',
      model: 'Signa Explorer 1.5T',
      manufacturer: 'GE Healthcare',
      country: 'Mỹ',
      serialNumber: 'GE-MRI-SIGNA-VPI-71',
      yearManufacture: 2022,
      yearUsage: 2023,
      room: 'Phòng MRI',
      roomLocation: 'Tầng 1 - Khoa CĐHA',
      personInCharge: 'KTV. Vũ Bá Đạt & KTV. Phạm Anh Tuấn',
      phone: '0978.892.345',
      status: 'active',
      statusText: 'Hoạt động tốt (Từ trường siêu dẫn 1.5T)',
      licenseNumber: 'Không áp dụng (Từ trường không bức xạ ion hóa)',
      licenseAuthority: 'Tiêu chuẩn an toàn ACR / Bộ Y tế',
      licenseExpiry: 'Không thời hạn',
      licenseDaysLeft: 9999,
      licenseAlertLevel: 'safe',
      inspectionNumber: 'QC-MRI-GE-2024',
      inspectionDate: '2024-09-15',
      inspectionExpiry: '2025-09-15',
      inspectionDaysLeft: 337,
      tubeSeconds: 'Mức Heli lỏng: 78.4% (Áp suất 1.42 bar)',
      specifications: 'Từ trường 1.5 Tesla; Bộ cuộn thu Express Coils 16 kênh; Kỹ thuật triệt chuyển động PROPELLER kết hợp AIR Recon DL; Khẩu độ 60 cm.',
      notes: 'Đang áp dụng chuyển đổi số Phiếu Bảng kiểm an toàn trước khi chụp MRI bằng mã QR online tại BV Vĩnh Phúc VPI.'
    },
    {
      id: 'TB-04',
      code: 'XQ-VIKO',
      name: 'Máy X-quang KTS Vikomed (Hàn Quốc)',
      category: 'Bức xạ',
      subCategory: 'X-quang kỹ thuật số',
      model: 'Titan 2000 / Vikomed DR',
      manufacturer: 'Vikomed',
      country: 'Hàn Quốc',
      serialNumber: 'VKM-DR-VPI-2020',
      yearManufacture: 2020,
      yearUsage: 2021,
      room: 'Phòng X-quang Vikomed',
      roomLocation: 'Tầng 1 - Khoa CĐHA',
      personInCharge: 'KTV. Nguyễn Khánh Linh',
      phone: '0987.123.456',
      status: 'warning',
      statusText: 'Đang hoạt động (Sắp đến hạn kiểm định 1 năm)',
      licenseNumber: '112/GP-SKHCN Vĩnh Phúc',
      licenseAuthority: 'Sở Khoa học và Công nghệ tỉnh Vĩnh Phúc',
      licenseExpiry: '2027-08-10',
      licenseDaysLeft: 666,
      licenseAlertLevel: 'safe',
      inspectionNumber: 'KĐ-2024-XQ-VKM-889',
      inspectionDate: '2024-03-28',
      inspectionExpiry: '2025-03-28',
      inspectionDaysLeft: 18,
      inspectionAlertLevel: 'warning',
      tubeSeconds: 'Số ca chụp lũy kế: 215,400 ca',
      specifications: 'Công suất phát 50 kW; Dải kVp: 40 - 150 kV; Tấm nhận ảnh phẳng Flat Panel Cesium Iodide (CsI) truyền không dây.',
      notes: 'Còn 18 ngày - KTV Trưởng cần liên hệ Trung tâm Kiểm định / Viện Đo lường đặt lịch kiểm định định kỳ theo Thông tư 23/TT-BKHCN.'
    },
    {
      id: 'TB-05',
      code: 'MAMMO-VPI',
      name: 'Máy X-quang Nhũ ảnh KTS Mammography (Vú)',
      category: 'Bức xạ',
      subCategory: 'Nhũ ảnh',
      model: 'Giotto / Hologic Dimensions',
      manufacturer: 'IMS Giotto / Hologic',
      country: 'Ý / Mỹ',
      serialNumber: 'MAM-VPI-2022-03',
      yearManufacture: 2022,
      yearUsage: 2022,
      room: 'Phòng Nhũ ảnh',
      roomLocation: 'Tầng 1 - Khoa CĐHA',
      personInCharge: 'KTV. Hà Thị Ánh Nguyệt',
      phone: '0966.332.112',
      status: 'active',
      statusText: 'Hoạt động tốt (Đạt chuẩn liều tuyến vú AGD)',
      licenseNumber: '89/GP-SKHCN Vĩnh Phúc',
      licenseAuthority: 'Sở Khoa học và Công nghệ tỉnh Vĩnh Phúc',
      licenseExpiry: '2027-11-15',
      licenseDaysLeft: 763,
      licenseAlertLevel: 'safe',
      inspectionNumber: 'KĐ-2024-MAM-VPI',
      inspectionDate: '2024-11-20',
      inspectionExpiry: '2025-11-20',
      inspectionDaysLeft: 403,
      tubeSeconds: 'Liều hấp thụ tuyến vú AGD < 1.4 mGy/lần ép chụp',
      specifications: 'Công nghệ nén ép tự động êm dịu SmartCompression; Anode Mo/Rh phát tia mềm tối ưu cấu trúc vi vôi hóa vú.',
      notes: 'Kiểm định liều tuyến vú & độ phân giải hình ảnh đạt chuẩn TCVN. Kỳ kiểm định: 11/2024 - Hiệu lực đến: 11/2025.'
    },
    {
      id: 'TB-06',
      code: 'DEXA-VPI',
      name: 'Máy X-quang Đo mật độ xương DEXA toàn thân',
      category: 'Bức xạ',
      subCategory: 'Đo loãng xương',
      model: 'Horizon / Stratos dEXA',
      manufacturer: 'Hologic / DMS',
      country: 'Mỹ / Pháp',
      serialNumber: 'DX-VPI-2021-99',
      yearManufacture: 2021,
      yearUsage: 2021,
      room: 'Phòng Đo loãng xương DEXA',
      roomLocation: 'Tầng 1 - Khoa CĐHA',
      personInCharge: 'KTV. Nguyễn Duy Hạnh',
      phone: '0945.889.012',
      status: 'active',
      statusText: 'Hoạt động tốt (Đã nâng cấp Card mạng máy tính)',
      licenseNumber: '77/GP-SKHCN Vĩnh Phúc',
      licenseAuthority: 'Sở Khoa học và Công nghệ tỉnh Vĩnh Phúc',
      licenseExpiry: '2026-12-10',
      licenseDaysLeft: 423,
      licenseAlertLevel: 'safe',
      inspectionNumber: 'KĐ-2025-DEXA-VPI',
      inspectionDate: '2025-12-12',
      inspectionExpiry: '2026-12-12',
      inspectionDaysLeft: 425,
      tubeSeconds: 'Chùm tia quạt Fan-Beam năng lượng kép',
      specifications: 'Đo mật độ khoáng xương (BMD) cột sống thắt lưng AP, cổ xương đùi, cẳng tay và thành phần cơ thể toàn thân. Liều tia cực thấp < 5 µSv.',
      notes: 'Đã hoàn tất đề xuất thay thế Card mạng máy tính kết nối hệ thống PACS lưu trữ kết quả tự động.'
    },
    {
      id: 'TB-07',
      code: 'US-RESONA-I9',
      name: 'Máy Siêu âm Doppler màu cao cấp Mindray Resona I9',
      category: 'Không bức xạ',
      subCategory: 'Siêu âm Doppler màu',
      model: 'Resona I9',
      manufacturer: 'Mindray',
      country: 'Trung Quốc / Châu Âu',
      serialNumber: 'MR-RESONA-VPI-2022',
      yearManufacture: 2022,
      yearUsage: 2023,
      room: 'Phòng Siêu âm 01',
      roomLocation: 'Tầng 2 - Khoa CĐHA',
      personInCharge: 'BS. CKI. Trịnh Văn Bình & ĐD. Phùng Thị Bích',
      phone: '0903.221.445',
      status: 'active',
      statusText: 'Hoạt động tốt (Nền tảng ZST+ cao cấp)',
      licenseNumber: 'Không áp dụng (Sóng siêu âm)',
      licenseAuthority: 'Bộ Y tế',
      licenseExpiry: 'Không thời hạn',
      licenseDaysLeft: 9999,
      licenseAlertLevel: 'safe',
      inspectionNumber: 'BD-SA-I9-2025',
      inspectionDate: '2025-01-15',
      inspectionExpiry: '2026-01-15',
      inspectionDaysLeft: 94,
      tubeSeconds: 'Đầu dò: Convex đa tần, Linear ma trận, Tim tim mạch',
      specifications: 'Kiến trúc ZST+ (Zone Sonography Technology); Màn hình full HD không viền 23.8 inch; Bảng điều khiển cảm ứng iConsole gấp gọn.',
      notes: 'Bàn giao thiết bị và bảo dưỡng định kỳ hàng quý bởi kỹ sư đại diện Mindray Việt Nam.'
    },
    {
      id: 'TB-08',
      code: 'US-ARIETTA-F6',
      name: 'Máy Siêu âm Doppler màu chuyên sâu Arietta F6',
      category: 'Không bức xạ',
      subCategory: 'Siêu âm tim mạch & tổng quát',
      model: 'Arietta F6 / F37',
      manufacturer: 'Hitachi / Fujifilm',
      country: 'Nhật Bản',
      serialNumber: 'HF-ARF6-VPI-2021',
      yearManufacture: 2021,
      yearUsage: 2021,
      room: 'Phòng Siêu âm 02',
      roomLocation: 'Tầng 2 - Khoa CĐHA',
      personInCharge: 'ĐD. Lê Thị Hiệp',
      phone: '0915.667.788',
      status: 'active',
      statusText: 'Hoạt động tốt (Độ nhạy Doppler xuất sắc)',
      licenseNumber: 'Không áp dụng (Sóng siêu âm)',
      licenseAuthority: 'Bộ Y tế',
      licenseExpiry: 'Không thời hạn',
      licenseDaysLeft: 9999,
      licenseAlertLevel: 'safe',
      inspectionNumber: 'BD-SA-F6-2025',
      inspectionDate: '2025-02-20',
      inspectionExpiry: '2026-02-20',
      inspectionDaysLeft: 130,
      tubeSeconds: 'Đầu dò: Convex C251, Linear L441, Tim Phased Array',
      specifications: 'Công nghệ tạo chùm tia Silky Image Processing; Đo độ đàn hồi mô Real-time Tissue Elastography (RTE); Chụp mạch vi thể eFLOW.',
      notes: 'Thực hiện kiểm tra lau chùi đầu dò bằng cồn 70° và gel siêu âm y tế sau mỗi ca khám.'
    },
    {
      id: 'TB-09',
      code: 'US-P6-P8',
      name: 'Máy Siêu âm Doppler màu đa chức năng P6/P8',
      category: 'Không bức xạ',
      subCategory: 'Siêu âm tổng quát',
      model: 'Voluson / Logiq P8',
      manufacturer: 'GE Healthcare',
      country: 'Mỹ',
      serialNumber: 'GE-P8-VPI-2023',
      yearManufacture: 2023,
      yearUsage: 2023,
      room: 'Phòng Siêu âm 03',
      roomLocation: 'Tầng 2 - Khoa CĐHA',
      personInCharge: 'ĐD. Nguyễn Hồng Ngọc',
      phone: '0978.334.455',
      status: 'active',
      statusText: 'Hoạt động tốt (Phục vụ siêu âm bụng & tuyến giáp)',
      licenseNumber: 'Không áp dụng (Sóng siêu âm)',
      licenseAuthority: 'Bộ Y tế',
      licenseExpiry: 'Không thời hạn',
      licenseDaysLeft: 9999,
      licenseAlertLevel: 'safe',
      inspectionNumber: 'BD-SA-P8-2025',
      inspectionDate: '2025-03-01',
      inspectionExpiry: '2026-03-01',
      inspectionDaysLeft: 139,
      tubeSeconds: 'Đầu dò: 4C-RS Convex, L6-12-RS Linear',
      specifications: 'Công nghệ CrossXBeam và SRI-HD nâng cao độ tương phản mô; Tự động tối ưu hóa Auto Image Optimization.',
      notes: 'Máy hoạt động ổn định phục vụ khám bảo hiểm y tế và dịch vụ ngoại trú.'
    },
    {
      id: 'TB-10',
      code: 'US-PORTABLE',
      name: 'Máy Siêu âm xách tay màu tổng quát 3 đầu dò',
      category: 'Không bức xạ',
      subCategory: 'Siêu âm tại giường & cấp cứu',
      model: 'Chison / SonoSite M-Turbo',
      manufacturer: 'SonoSite / Chison',
      country: 'Mỹ',
      serialNumber: 'SS-PORT-VPI-2022',
      yearManufacture: 2022,
      yearUsage: 2022,
      room: 'Khoa Cấp cứu & Phòng Mổ',
      roomLocation: 'Xe đẩy di động - Khu Khám bệnh',
      personInCharge: 'KTV. Đào Tiến Dũng',
      phone: '0912.987.654',
      status: 'active',
      statusText: 'Hoạt động tốt (Sẵn sàng cấp cứu lưu động)',
      licenseNumber: 'Không áp dụng (Sóng siêu âm)',
      licenseAuthority: 'Bộ Y tế',
      licenseExpiry: 'Không thời hạn',
      licenseDaysLeft: 9999,
      licenseAlertLevel: 'safe',
      inspectionNumber: 'BD-SA-PORT-2025',
      inspectionDate: '2025-04-10',
      inspectionExpiry: '2026-04-10',
      inspectionDaysLeft: 179,
      tubeSeconds: 'Pin sạc 4 giờ liên tục; Khởi động nhanh dưới 15 giây',
      specifications: 'Thiết kế chống sốc rơi vỡ; 3 cổng cắm đầu dò trực tiếp (Convex, Linear, Phased Array); Khảo sát FAST chấn thương bụng kín.',
      notes: 'Thường trực tại Khoa CĐHA sẵn sàng cơ động lên Hồi sức cấp cứu và phòng phẫu thuật.'
    },
    {
      id: 'TB-11',
      code: 'TIEM-CT-VPI',
      name: 'Bơm tiêm thuốc cản quang tự động 2 nòng CT Stellant',
      category: 'Đo lường',
      subCategory: 'Bơm tiêm áp lực cao',
      model: 'Medrad Stellant D Dual Syringe',
      manufacturer: 'Bayer',
      country: 'Mỹ',
      serialNumber: 'BY-STEL-VPI-2021',
      yearManufacture: 2021,
      yearUsage: 2021,
      room: 'Phòng CT-Scanner',
      roomLocation: 'Tầng 1 - Khoa CĐHA',
      personInCharge: 'KTV. Vũ Bá Đạt',
      phone: '0978.892.345',
      status: 'active',
      statusText: 'Hoạt động tốt (Đồng bộ phát tia máy CT)',
      licenseNumber: 'Hiệu chuẩn áp lực & thể tích định kỳ',
      licenseAuthority: 'Viện Trang thiết bị và Công trình Y tế',
      licenseExpiry: '2026-06-30',
      licenseDaysLeft: 260,
      licenseAlertLevel: 'safe',
      inspectionNumber: 'HC-TIEM-VPI-2024',
      inspectionDate: '2024-06-30',
      inspectionExpiry: '2025-06-30',
      inspectionDaysLeft: 260,
      tubeSeconds: 'Áp lực bơm tối đa: 325 psi',
      specifications: '2 xilanh 200ml tiêm thuốc cản quang và rửa muối sinh lý NaCl 0.9%; Tốc độ tiêm 0.1 - 10 ml/giây; Cảm biến phát hiện bọt khí tự động.',
      notes: 'Áp dụng theo Quy trình sử dụng thuốc tương phản đường tĩnh mạch trong CĐHA của BV Vĩnh Phúc VPI.'
    },
    {
      id: 'TB-12',
      code: 'SPO2-MRI-VPI',
      name: 'Máy đo SpO2 bàn chuyên dụng phòng CHT Nonin 7500 FO cáp quang',
      category: 'Đo lường',
      subCategory: 'Theo dõi bệnh nhân phòng MRI',
      model: 'Nonin 7500 FO Fiber-Optic Sensor',
      manufacturer: 'Nonin Medical',
      country: 'Mỹ',
      serialNumber: 'NONIN-7500-VPI-2022',
      yearManufacture: 2022,
      yearUsage: 2023,
      room: 'Phòng MRI',
      roomLocation: 'Tầng 1 - Khoa CĐHA',
      personInCharge: 'KTV. Phạm Anh Tuấn',
      phone: '0977.889.900',
      status: 'active',
      statusText: 'Hoạt động tốt (Cáp quang chống nhiễm từ MRI)',
      licenseNumber: 'An toàn MRI lên đến 3.0 Tesla (MRI Conditional)',
      licenseAuthority: 'Chứng nhận FDA Hoa Kỳ',
      licenseExpiry: 'Không thời hạn',
      licenseDaysLeft: 9999,
      licenseAlertLevel: 'safe',
      inspectionNumber: 'HC-SPO2-VPI-2024',
      inspectionDate: '2024-05-15',
      inspectionExpiry: '2025-05-15',
      inspectionDaysLeft: 214,
      tubeSeconds: 'Cáp cảm biến quang học dài 6 mét',
      specifications: 'Đo SpO2 và nhịp tim người bệnh an toàn tuyệt đối trong lồng từ MRI; Không gây bỏng RF; Báo động âm thanh nhịp tim.',
      notes: 'Phục vụ theo dõi bệnh nhân nhi hoặc bệnh nhân hồi sức nặng cần an thần khi chụp MRI tại BV VPI.'
    },
    {
      id: 'TB-13',
      code: 'IN-PHIM-CANON',
      name: 'Hệ thống Máy in phim y tế kỹ thuật số Canon / Drypix',
      category: 'Đo lường',
      subCategory: 'Máy in phim khô y tế',
      model: 'Canon Medical / Fujifilm Drypix Plus',
      manufacturer: 'Canon / Fujifilm',
      country: 'Nhật Bản',
      serialNumber: 'CN-DRY-VPI-2021',
      yearManufacture: 2021,
      yearUsage: 2021,
      room: 'Phòng In phim & Trả kết quả',
      roomLocation: 'Tầng 1 - Khoa CĐHA',
      personInCharge: 'TKYK. Phùng Thị Thanh Lộc',
      phone: '0986.778.899',
      status: 'active',
      statusText: 'Hoạt động tốt (Kết nối chuẩn DICOM 3.0)',
      licenseNumber: 'Chuẩn kết nối DICOM Print',
      licenseAuthority: 'Bộ Y tế',
      licenseExpiry: 'Không thời hạn',
      licenseDaysLeft: 9999,
      licenseAlertLevel: 'safe',
      inspectionNumber: 'QC-IN-2025',
      inspectionDate: '2025-01-10',
      inspectionExpiry: '2026-01-10',
      inspectionDaysLeft: 89,
      tubeSeconds: 'Khay nạp 2 kích thước phim: 14x17 inch & 8x10 inch',
      specifications: 'Độ phân giải 508 dpi (50 µm); Tốc độ in 110 tấm phim/giờ; Tương thích in phim X-quang, CT, MRI, Nhũ ảnh.',
      notes: 'Vận hành in trả phim cho bệnh nhân nội trú và bệnh nhân yêu cầu kết quả cứng.'
    },
    {
      id: 'TB-14',
      code: 'PACS-EHC-VPI',
      name: 'Hệ thống Lưu trữ Hình ảnh PACS & Bệnh án điện tử EHC.VPI',
      category: 'Không bức xạ',
      subCategory: 'Hạ tầng CNTT Y tế',
      model: 'EHC PACS Server v3.4',
      manufacturer: 'EHC / VPI IT',
      country: 'Việt Nam',
      serialNumber: 'SRV-PACS-VPI-01',
      yearManufacture: 2022,
      yearUsage: 2022,
      room: 'Phòng Đọc phim BS. Bình & Server Room',
      roomLocation: 'Khoa CĐHA & Phòng IT',
      personInCharge: 'BS. CKI. Trịnh Văn Bình & KTV. Vũ Bá Đạt',
      phone: '0912.334.556',
      status: 'active',
      statusText: 'Hoạt động ổn định (Lưu trữ Cloud & On-premise)',
      licenseNumber: 'Tiêu chuẩn HL7 & DICOM 3.0',
      licenseAuthority: 'Cục CNTT - Bộ Y tế',
      licenseExpiry: 'Không thời hạn',
      licenseDaysLeft: 9999,
      licenseAlertLevel: 'safe',
      inspectionNumber: 'IT-SEC-2025',
      inspectionDate: '2025-06-01',
      inspectionExpiry: '2026-06-01',
      inspectionDaysLeft: 231,
      tubeSeconds: 'Dung lượng lưu trữ SAN 40 Terabytes',
      specifications: 'Hệ thống PACS không in phim kết nối trực tiếp HIS-EHC.VPI; Đọc phim qua Web Viewer đa nền tảng và Màn hình y tế chuyên dụng Barco 3MP.',
      notes: 'Đã giải quyết sự cố nhấp nháy màn hình máy tính phòng đọc phim của BS. Bình, hoạt động thông suốt 24/7.'
    }
  ],

  // 4 DANH MỤC HỒ SƠ KIỂM ĐỊNH & GIẤY PHÉP ATBX
  radiationRecords: [
    {
      id: 'RAD-01',
      title: 'Máy X-quang KTS Vikomed',
      room: 'Phòng X-quang Vikomed',
      type: 'Kiểm định thiết bị định kỳ 1 năm',
      certificateNumber: 'KĐ-2024-XQ-VKM-889',
      expiryDate: '28/03/2025',
      daysLeft: 18,
      status: 'warning',
      statusLabel: 'Còn 18 ngày - Cần liên hệ Viện Đo lường / TT Kiểm định',
      legalRule: 'Thông tư 23/TT-BKHCN: Chu kỳ kiểm định định kỳ 1 năm',
      actionType: 'schedule_inspection',
      deviceId: 'TB-04'
    },
    {
      id: 'RAD-02',
      title: 'Máy CT Revolution ACT GE / Somatom',
      room: 'Phòng CT-Scanner',
      type: 'Giấy phép Cục ATBXHN',
      certificateNumber: '45/GP-ATBX (Cục ATBXHN)',
      expiryDate: '25/11/2026',
      daysLeft: 42,
      status: 'danger',
      statusLabel: 'Yêu cầu Nghị định 142/2020: Còn 42 ngày - Bắt buộc nộp hồ sơ xin gia hạn trước khi giấy phép hết hạn ít nhất 45 ngày.',
      subStatus: 'TÌNH TRẠNG: ĐÃ LẬP HỒ SƠ KT',
      legalRule: 'Nghị định 142/2020/NĐ-CP: Nộp trước ít nhất 45 ngày',
      actionType: 'draft_dossier',
      deviceId: 'TB-02'
    },
    {
      id: 'RAD-03',
      title: 'Máy Chụp Nhũ ảnh Mammography (Vú)',
      room: 'Phòng Nhũ ảnh',
      type: 'Kiểm định liều tuyến vú & Độ phân giải',
      certificateNumber: 'KĐ-2024-MAM-VPI',
      cycle: 'Kỳ kiểm định: 11/2024',
      expiryDate: '11/2025',
      daysLeft: 403,
      status: 'safe',
      statusLabel: 'An toàn - Đạt chuẩn chất lượng hình ảnh & Liều AGD theo TCVN',
      legalRule: 'Thông tư 23/TT-BKHCN: Chu kỳ kiểm định định kỳ 1 năm',
      actionType: 'view_cert',
      deviceId: 'TB-05'
    },
    {
      id: 'RAD-04',
      title: 'Phòng Chụp X-quang & CT-Scanner VPI',
      room: 'Khu vực phòng chì Tầng 1',
      type: 'Biên bản an toàn che chắn (Kiểm xạ môi trường)',
      certificateNumber: 'BBKX-CT32-SIEMENS-2025',
      cycle: 'Định kỳ 1 năm',
      leakageRate: '≤ 0.12 µSv/h',
      status: 'safe',
      statusLabel: 'Liều bức xạ phông ngoài phòng: ≤ 0.12 µSv/h [Đạt TCVN 6561]',
      legalRule: 'TCVN 6561: Phòng chụp che chắn chì đạt chuẩn bảo vệ nhân viên & công chúng',
      actionType: 'view_cert',
      deviceId: 'TB-01'
    }
  ],

  // DANH SÁCH NHÂN SỰ CHÍNH THỨC CỦA KHOA CĐHA (15 CBNV + 1 ĐOÀN THANH TRA)
  staff: [
    {
      id: 'NV-01',
      code: 'BV-345',
      name: 'Vũ Bá Đạt',
      role: 'Kỹ thuật viên Trưởng Khoa CĐHA',
      roleKey: 'admin',
      qualification: 'Cử nhân Kỹ thuật Hình ảnh Y học',
      radiationCert: 'GCN-ATBX-VU BA DAT (Cục ATBXHN)',
      certIssuer: 'Viện Năng lượng nguyên tử Việt Nam',
      certDate: '2023-04-15',
      certExpiry: '2026-04-15',
      daysLeft: 184,
      status: 'safe',
      tldDosimeterQ1: '0.14 mSv',
      tldDosimeterQ2: '0.16 mSv',
      tldDosimeterQ3: '0.15 mSv',
      assignedRooms: ['Phòng CT-Scanner', 'Phòng MRI'],
      isSafetyOfficer: true,
      title: 'Phụ trách ATBX Bệnh viện',
      allowExternalAccess: true,
      pin: '3456',
      lastExternalLogin: '16:30 Hôm nay'
    },
    {
      id: 'NV-02',
      code: 'BS-BINH',
      name: 'BS. CKI. Trịnh Văn Bình',
      role: 'Phụ trách Khoa Chẩn đoán hình ảnh',
      roleKey: 'doctor',
      qualification: 'Bác sĩ Chuyên khoa I CĐHA',
      radiationCert: 'ATBX-QL-2023-VPI',
      certIssuer: 'Cục An toàn bức xạ và hạt nhân',
      certDate: '2023-03-01',
      certExpiry: '2026-03-01',
      daysLeft: 139,
      status: 'safe',
      tldDosimeterQ1: '0.08 mSv',
      tldDosimeterQ2: '0.07 mSv',
      tldDosimeterQ3: '0.08 mSv',
      assignedRooms: ['Phòng Đọc phim PACS', 'Phòng Siêu âm 01'],
      isSafetyOfficer: false,
      title: 'Lãnh đạo Khoa',
      allowExternalAccess: true,
      pin: '1234',
      lastExternalLogin: '14:15 Hôm nay'
    },
    {
      id: 'NV-03',
      code: 'BV-157',
      name: 'Phùng Thị Bích',
      role: 'Trưởng nhóm Điều dưỡng Siêu âm',
      roleKey: 'nurse',
      qualification: 'Cử nhân Điều dưỡng',
      radiationCert: 'AT-SA-2023-VPI',
      certIssuer: 'Bệnh viện Quốc tế Vĩnh Phúc',
      certDate: '2023-05-10',
      certExpiry: '2026-05-10',
      daysLeft: 209,
      status: 'safe',
      tldDosimeterQ1: '0.03 mSv',
      tldDosimeterQ2: '0.02 mSv',
      tldDosimeterQ3: '0.03 mSv',
      assignedRooms: ['Phòng Siêu âm 01', 'Phòng Siêu âm 02'],
      isSafetyOfficer: false,
      title: 'Trưởng nhóm ĐD',
      allowExternalAccess: true,
      pin: '1570',
      lastExternalLogin: 'Hôm qua'
    },
    {
      id: 'NV-04',
      code: 'BV-465',
      name: 'Khổng Trọng Hưởng',
      role: 'Kỹ thuật viên CĐHA (CT & X-quang)',
      roleKey: 'technician',
      qualification: 'Cử nhân Kỹ thuật Hình ảnh',
      radiationCert: 'ATBX-SKHCN-VP-2024-465',
      certIssuer: 'Sở Khoa học và Công nghệ tỉnh Vĩnh Phúc',
      certDate: '2024-09-20',
      certExpiry: '2027-09-20',
      daysLeft: 707,
      status: 'safe',
      tldDosimeterQ1: '0.12 mSv',
      tldDosimeterQ2: '0.14 mSv',
      tldDosimeterQ3: '0.13 mSv',
      assignedRooms: ['Phòng CT-Scanner', 'Phòng X-quang Vikomed'],
      isSafetyOfficer: false,
      allowExternalAccess: true,
      pin: '4650',
      lastExternalLogin: '11:20 Hôm nay'
    },
    {
      id: 'NV-05',
      code: 'BV-340',
      name: 'Phạm Anh Tuấn',
      role: 'Kỹ thuật viên CĐHA (MRI & CT)',
      roleKey: 'technician',
      qualification: 'Cử nhân Kỹ thuật Hình ảnh',
      radiationCert: 'ATBX-SKHCN-VP-2024-340',
      certIssuer: 'Sở Khoa học và Công nghệ tỉnh Vĩnh Phúc',
      certDate: '2024-10-10',
      certExpiry: '2027-10-10',
      daysLeft: 727,
      status: 'safe',
      tldDosimeterQ1: '0.11 mSv',
      tldDosimeterQ2: '0.12 mSv',
      tldDosimeterQ3: '0.10 mSv',
      assignedRooms: ['Phòng MRI', 'Phòng CT-Scanner'],
      isSafetyOfficer: false,
      allowExternalAccess: true,
      pin: '3400',
      lastExternalLogin: 'Hôm nay'
    },
    {
      id: 'NV-06',
      code: 'BV-464',
      name: 'Nguyễn Khánh Linh',
      role: 'Kỹ thuật viên CĐHA (X-quang Vikomed)',
      roleKey: 'technician',
      qualification: 'Cử nhân Kỹ thuật Hình ảnh',
      radiationCert: 'ATBX-SKHCN-VP-2024-464',
      certIssuer: 'Sở Khoa học và Công nghệ tỉnh Vĩnh Phúc',
      certDate: '2024-11-12',
      certExpiry: '2027-11-12',
      daysLeft: 760,
      status: 'safe',
      tldDosimeterQ1: '0.13 mSv',
      tldDosimeterQ2: '0.15 mSv',
      tldDosimeterQ3: '0.14 mSv',
      assignedRooms: ['Phòng X-quang Vikomed'],
      isSafetyOfficer: false,
      allowExternalAccess: true,
      pin: '4640',
      lastExternalLogin: 'Hôm nay'
    },
    {
      id: 'NV-07',
      code: 'BV-540',
      name: 'Nguyễn Văn Dũng',
      role: 'Kỹ thuật viên CĐHA',
      roleKey: 'technician',
      qualification: 'Kỹ thuật viên Hình ảnh',
      radiationCert: 'ATBX-SKHCN-VP-2023-540',
      certIssuer: 'Sở Khoa học và Công nghệ tỉnh Vĩnh Phúc',
      certDate: '2023-08-15',
      certExpiry: '2026-08-15',
      daysLeft: 306,
      status: 'safe',
      tldDosimeterQ1: '0.10 mSv',
      tldDosimeterQ2: '0.11 mSv',
      tldDosimeterQ3: '0.10 mSv',
      assignedRooms: ['Phòng X-quang Vikomed', 'Phòng CT-Scanner'],
      isSafetyOfficer: false,
      allowExternalAccess: true,
      pin: '5400',
      lastExternalLogin: '3 ngày trước'
    },
    {
      id: 'NV-08',
      code: 'BV-575',
      name: 'Đào Tiến Dũng',
      role: 'Kỹ thuật viên CĐHA (Siêu âm xách tay & XQ)',
      roleKey: 'technician',
      qualification: 'Kỹ thuật viên Hình ảnh',
      radiationCert: 'ATBX-SKHCN-VP-2022-575',
      certIssuer: 'Sở Khoa học và Công nghệ tỉnh Vĩnh Phúc',
      certDate: '2022-11-10',
      certExpiry: '2025-11-10',
      daysLeft: 28,
      status: 'danger',
      tldDosimeterQ1: '0.07 mSv',
      tldDosimeterQ2: '0.08 mSv',
      tldDosimeterQ3: '0.06 mSv',
      assignedRooms: ['Khu Cấp cứu', 'Phòng X-quang Vikomed'],
      isSafetyOfficer: false,
      allowExternalAccess: true,
      pin: '5750',
      lastExternalLogin: 'Hôm qua'
    },
    {
      id: 'NV-09',
      code: 'BV-296',
      name: 'Hà Thị Ánh Nguyệt',
      role: 'Kỹ thuật viên CĐHA (Nhũ ảnh & DEXA)',
      roleKey: 'technician',
      qualification: 'Cử nhân Kỹ thuật Hình ảnh',
      radiationCert: 'ATBX-SKHCN-VP-2023-296',
      certIssuer: 'Sở Khoa học và Công nghệ tỉnh Vĩnh Phúc',
      certDate: '2023-06-15',
      certExpiry: '2026-06-15',
      daysLeft: 245,
      status: 'safe',
      tldDosimeterQ1: '0.08 mSv',
      tldDosimeterQ2: '0.09 mSv',
      tldDosimeterQ3: '0.07 mSv',
      assignedRooms: ['Phòng Nhũ ảnh', 'Phòng Đo loãng xương DEXA'],
      isSafetyOfficer: false,
      allowExternalAccess: true,
      pin: '2960',
      lastExternalLogin: 'Hôm nay'
    },
    {
      id: 'NV-10',
      code: 'BV-150',
      name: 'Nguyễn Duy Hạnh',
      role: 'Kỹ thuật viên CĐHA (DEXA & XQ)',
      roleKey: 'technician',
      qualification: 'Kỹ thuật viên Hình ảnh',
      radiationCert: 'ATBX-SKHCN-VP-2024-150',
      certIssuer: 'Sở Khoa học và Công nghệ tỉnh Vĩnh Phúc',
      certDate: '2024-03-20',
      certExpiry: '2027-03-20',
      daysLeft: 523,
      status: 'safe',
      tldDosimeterQ1: '0.06 mSv',
      tldDosimeterQ2: '0.07 mSv',
      tldDosimeterQ3: '0.05 mSv',
      assignedRooms: ['Phòng Đo loãng xương DEXA'],
      isSafetyOfficer: false,
      allowExternalAccess: true,
      pin: '1500',
      lastExternalLogin: 'Hôm qua'
    },
    {
      id: 'NV-11',
      code: 'BV-021',
      name: 'Lê Thị Hiệp',
      role: 'Điều dưỡng CĐHA (Phòng Siêu âm 02)',
      roleKey: 'nurse',
      qualification: 'Cử nhân Điều dưỡng',
      radiationCert: 'AT-DD-VPI-2023',
      certIssuer: 'Bệnh viện Quốc tế Vĩnh Phúc',
      certDate: '2023-04-01',
      certExpiry: '2026-04-01',
      daysLeft: 170,
      status: 'safe',
      tldDosimeterQ1: '0.02 mSv',
      tldDosimeterQ2: '0.03 mSv',
      tldDosimeterQ3: '0.02 mSv',
      assignedRooms: ['Phòng Siêu âm 02'],
      isSafetyOfficer: false,
      allowExternalAccess: true,
      pin: '0210',
      lastExternalLogin: '4 ngày trước'
    },
    {
      id: 'NV-12',
      code: 'BV-256',
      name: 'Nguyễn Hồng Ngọc',
      role: 'Điều dưỡng CĐHA (Phòng Siêu âm 03)',
      roleKey: 'nurse',
      qualification: 'Cao đẳng Điều dưỡng',
      radiationCert: 'AT-DD-VPI-2023',
      certIssuer: 'Bệnh viện Quốc tế Vĩnh Phúc',
      certDate: '2023-05-15',
      certExpiry: '2026-05-15',
      daysLeft: 214,
      status: 'safe',
      tldDosimeterQ1: '0.02 mSv',
      tldDosimeterQ2: '0.02 mSv',
      tldDosimeterQ3: '0.02 mSv',
      assignedRooms: ['Phòng Siêu âm 03'],
      isSafetyOfficer: false,
      allowExternalAccess: true,
      pin: '2560',
      lastExternalLogin: '1 tuần trước'
    },
    {
      id: 'NV-13',
      code: 'BV-207',
      name: 'Nguyễn Thị Định',
      role: 'Điều dưỡng CĐHA (Tiêm thuốc tương phản)',
      roleKey: 'nurse',
      qualification: 'Cử nhân Điều dưỡng',
      radiationCert: 'ATBX-SKHCN-VP-2023-207',
      certIssuer: 'Sở Khoa học và Công nghệ tỉnh Vĩnh Phúc',
      certDate: '2023-07-20',
      certExpiry: '2026-07-20',
      daysLeft: 280,
      status: 'safe',
      tldDosimeterQ1: '0.09 mSv',
      tldDosimeterQ2: '0.10 mSv',
      tldDosimeterQ3: '0.09 mSv',
      assignedRooms: ['Phòng CT-Scanner', 'Phòng Tiêm thuốc'],
      isSafetyOfficer: false,
      allowExternalAccess: true,
      pin: '2070',
      lastExternalLogin: 'Hôm nay'
    },
    {
      id: 'NV-14',
      code: 'BV-364',
      name: 'Phùng Thị Thanh Lộc',
      role: 'Thư ký y khoa CĐHA',
      roleKey: 'secretary',
      qualification: 'Thư ký Y khoa / Cử nhân',
      radiationCert: 'TKYK-VPI-2024',
      certIssuer: 'Bệnh viện Quốc tế Vĩnh Phúc',
      certDate: '2024-01-10',
      certExpiry: '2027-01-10',
      daysLeft: 454,
      status: 'safe',
      tldDosimeterQ1: '0.01 mSv',
      tldDosimeterQ2: '0.01 mSv',
      tldDosimeterQ3: '0.01 mSv',
      assignedRooms: ['Phòng In phim & Trả kết quả'],
      isSafetyOfficer: false,
      allowExternalAccess: false, // Mặc định khóa ngoại viện cho thư ký (chỉ làm việc tại viện)
      pin: '3640',
      lastExternalLogin: 'Chưa kích hoạt'
    },
    {
      id: 'NV-15',
      code: 'BV-424',
      name: 'Đỗ Thị Ngân',
      role: 'Thư ký y khoa CĐHA',
      roleKey: 'secretary',
      qualification: 'Thư ký Y khoa',
      radiationCert: 'TKYK-VPI-2024',
      certIssuer: 'Bệnh viện Quốc tế Vĩnh Phúc',
      certDate: '2024-02-15',
      certExpiry: '2027-02-15',
      daysLeft: 490,
      status: 'safe',
      tldDosimeterQ1: '0.01 mSv',
      tldDosimeterQ2: '0.01 mSv',
      tldDosimeterQ3: '0.01 mSv',
      assignedRooms: ['Khu Đón tiếp & Trả kết quả'],
      isSafetyOfficer: false,
      allowExternalAccess: false,
      pin: '4240',
      lastExternalLogin: 'Chưa kích hoạt'
    },
    {
      id: 'NV-16',
      code: 'AUDITOR-SKHCN',
      name: 'Đoàn Giám sát Thanh tra Sở KH&CN Vĩnh Phúc',
      role: 'Thanh tra viên An toàn bức xạ',
      roleKey: 'auditor',
      qualification: 'Thanh tra chuyên ngành NLNT & ATBX',
      radiationCert: 'TTV-ATBX-BKHCN',
      certIssuer: 'Bộ Khoa học và Công nghệ',
      certDate: '2024-01-01',
      certExpiry: '2029-01-01',
      daysLeft: 810,
      status: 'safe',
      tldDosimeterQ1: 'Giám sát độc lập',
      tldDosimeterQ2: 'Giám sát độc lập',
      tldDosimeterQ3: 'Giám sát độc lập',
      assignedRooms: ['Toàn bộ phòng bức xạ VPI'],
      isSafetyOfficer: false,
      title: 'Đoàn Thanh tra (Chỉ xem)',
      allowExternalAccess: true,
      pin: '8888',
      lastExternalLogin: 'Phiên thẩm tra online'
    }
  ],

  // DANH SÁCH PHÒNG MÁY TẠI BỆNH VIỆN QUỐC TẾ VĨNH PHÚC (VPI)
  rooms: [
    {
      id: 'PH-01',
      name: 'Phòng CT-Scanner',
      floor: 'Tầng 1 - Khu CĐHA',
      deviceCount: 3,
      shieldingPb: 'Chì lá 3.0 mmPb (Tường bê tông, cửa bọc chì, kính quan sát chì 3mm)',
      backgroundDose: '0.09 µSv/h',
      tcvnStatus: 'Đạt TCVN (≤ 0.12 µSv/h)',
      temperature: '21.0°C',
      humidity: '52%',
      inCharge: 'KTV. Vũ Bá Đạt'
    },
    {
      id: 'PH-02',
      name: 'Phòng MRI',
      floor: 'Tầng 1 - Khu CĐHA',
      deviceCount: 2,
      shieldingPb: 'Lồng Faraday đồng nguyên chất (RF Shielding > 100 dB, Zone IV)',
      backgroundDose: '0.04 µSv/h (Phông nền tự nhiên)',
      tcvnStatus: 'Đạt chuẩn an toàn ACR MRI',
      temperature: '20.0°C',
      humidity: '48%',
      inCharge: 'KTV. Vũ Bá Đạt & KTV. Phạm Anh Tuấn'
    },
    {
      id: 'PH-03',
      name: 'Phòng X-quang Vikomed',
      floor: 'Tầng 1 - Khu CĐHA',
      deviceCount: 1,
      shieldingPb: 'Chì 2.0 mmPb (Tường barite + cửa chì đạt chuẩn Sở KH&CN)',
      backgroundDose: '0.11 µSv/h',
      tcvnStatus: 'Đạt TCVN (≤ 0.12 µSv/h)',
      temperature: '23.0°C',
      humidity: '55%',
      inCharge: 'KTV. Nguyễn Khánh Linh'
    },
    {
      id: 'PH-04',
      name: 'Phòng Nhũ ảnh',
      floor: 'Tầng 1 - Khu CĐHA',
      deviceCount: 1,
      shieldingPb: 'Chì 1.5 mmPb',
      backgroundDose: '0.07 µSv/h',
      tcvnStatus: 'Đạt TCVN',
      temperature: '22.0°C',
      humidity: '54%',
      inCharge: 'KTV. Hà Thị Ánh Nguyệt'
    },
    {
      id: 'PH-05',
      name: 'Phòng Đo loãng xương DEXA',
      floor: 'Tầng 1 - Khu CĐHA',
      deviceCount: 1,
      shieldingPb: 'Chì 1.5 mmPb',
      backgroundDose: '0.05 µSv/h',
      tcvnStatus: 'Đạt TCVN',
      temperature: '23.0°C',
      humidity: '56%',
      inCharge: 'KTV. Nguyễn Duy Hạnh'
    },
    {
      id: 'PH-06',
      name: 'Phòng Siêu âm 01 (Resona I9)',
      floor: 'Tầng 2 - Khoa CĐHA',
      deviceCount: 1,
      shieldingPb: 'Phòng khám thăm dò chức năng không bức xạ',
      backgroundDose: '0.04 µSv/h',
      tcvnStatus: 'Đạt chuẩn kiểm soát nhiễm khuẩn',
      temperature: '24.0°C',
      humidity: '58%',
      inCharge: 'BS. CKI. Trịnh Văn Bình & ĐD. Phùng Thị Bích'
    },
    {
      id: 'PH-07',
      name: 'Phòng Siêu âm 02 (Arietta F6)',
      floor: 'Tầng 2 - Khoa CĐHA',
      deviceCount: 1,
      shieldingPb: 'Phòng khám thăm dò chức năng không bức xạ',
      backgroundDose: '0.04 µSv/h',
      tcvnStatus: 'Đạt chuẩn kiểm soát nhiễm khuẩn',
      temperature: '24.0°C',
      humidity: '57%',
      inCharge: 'ĐD. Lê Thị Hiệp'
    },
    {
      id: 'PH-08',
      name: 'Phòng Siêu âm 03 (P6/P8)',
      floor: 'Tầng 2 - Khoa CĐHA',
      deviceCount: 1,
      shieldingPb: 'Phòng khám thăm dò chức năng không bức xạ',
      backgroundDose: '0.04 µSv/h',
      tcvnStatus: 'Đạt chuẩn kiểm soát nhiễm khuẩn',
      temperature: '24.0°C',
      humidity: '58%',
      inCharge: 'ĐD. Nguyễn Hồng Ngọc'
    },
    {
      id: 'PH-09',
      name: 'Phòng Đọc phim & Hội chẩn PACS',
      floor: 'Tầng 1 - Khoa CĐHA',
      deviceCount: 2,
      shieldingPb: 'Phòng chuyên biệt có kiểm soát ánh sáng chuẩn y tế',
      backgroundDose: '0.04 µSv/h',
      tcvnStatus: 'Màn hình Barco 3MP đạt chuẩn chẩn đoán',
      temperature: '22.0°C',
      humidity: '50%',
      inCharge: 'BS. CKI. Trịnh Văn Bình'
    }
  ],

  // DANH SÁCH VIỆC CẦN LÀM GẤP
  urgentTasks: [
    {
      id: 'TASK-01',
      title: 'Máy CT Revolution ACT GE (Phòng CT-Scanner)',
      description: 'Hoàn tất hồ sơ xin gia hạn GPBX gửi Cục ATBXHN trước mốc 45 ngày Nghị định 142/2020.',
      deadline: 'Còn 42 ngày',
      level: 'danger',
      status: 'in_progress',
      category: 'Pháp lý ATBX Cục ATBXHN',
      actionUrl: 'draft_dossier'
    },
    {
      id: 'TASK-02',
      title: 'Máy X-quang Vikomed (Phòng X-quang)',
      description: 'Hết hạn kiểm định định kỳ vào 28/03/2025 theo Thông tư 23. KTV Trưởng liên hệ đơn vị kiểm định.',
      deadline: 'Còn 18 ngày',
      level: 'warning',
      status: 'todo',
      category: 'Kiểm định thiết bị TT 23',
      actionUrl: 'schedule_inspection'
    },
    {
      id: 'TASK-03',
      title: 'Đăng ký đào tạo lại ATBX cho KTV. Đào Tiến Dũng',
      description: 'Chứng chỉ ATBX hết hạn vào ngày 10/11/2025 theo chu kỳ 3 năm Thông tư 02/2022/TT-BKHCN.',
      deadline: 'Còn 28 ngày',
      level: 'warning',
      status: 'todo',
      category: 'Đào tạo ATBX Sở KH&CN',
      actionUrl: 'register_training'
    }
  ],

  // NHẬT KÝ BẢO TRÌ & SỰ CỐ
  maintenanceLogs: [
    {
      id: 'BT-01',
      ticketCode: 'SC-VPI-001',
      deviceName: 'Màn hình máy tính BS. Bình đọc phim chẩn đoán (Barco 3MP)',
      room: 'Phòng Đọc phim Khoa CĐHA',
      reportedBy: 'BS. CKI. Trịnh Văn Bình',
      dateReported: '2026-09-29',
      priority: 'Trung bình',
      symptom: 'Màn hình thỉnh thoảng chớp nháy tín hiệu khi tải chuỗi ảnh CT cắt lớp mỏng, nghi hỏng cáp tín hiệu.',
      solution: 'Kỹ sư IT & Phòng VT-TTBYT VPI đã thay thế cáp DisplayPort y tế bọc chống nhiễu chuyên dụng. Màn hình hiển thị sắc nét ổn định.',
      status: 'completed',
      technician: 'Kỹ sư IT VPI & Phòng Vật tư'
    },
    {
      id: 'BT-02',
      ticketCode: 'PM-VPI-MRI',
      deviceName: 'Máy Chụp Cộng hưởng từ MRI 1.5 Tesla GE',
      room: 'Phòng MRI',
      reportedBy: 'KTV. Vũ Bá Đạt',
      dateReported: '2026-10-05',
      priority: 'Định kỳ',
      symptom: 'Bảo trì dự phòng PM Quý 3/2026: Kiểm tra Chiller làm mát nước, mức Heli lỏng nam châm siêu dẫn.',
      solution: 'Kỹ sư GE Healthcare Field Service đã kiểm tra: Mức Heli 78.4%, nhiệt độ lạnh 4.2K đạt chuẩn, vệ sinh dàn giải nhiệt chiller.',
      status: 'completed',
      technician: 'Kỹ sư hãng GE Healthcare'
    },
    {
      id: 'BT-03',
      ticketCode: 'PM-VPI-CT',
      deviceName: 'Máy CT 32 lát cắt Siemens Somatom Scope',
      room: 'Phòng CT-Scanner',
      reportedBy: 'KTV. Vũ Bá Đạt',
      dateReported: '2026-10-12',
      priority: 'Định kỳ',
      symptom: 'Bảo dưỡng gantry định kỳ, hiệu chuẩn laser định vị bệnh nhân, kiểm tra hệ thống làm mát dầu bóng phát.',
      solution: 'Đang lên lịch kỹ sư bảo trì dịch vụ Siemens trong tuần thứ 3 tháng 10/2026.',
      status: 'in_progress',
      technician: 'Kỹ sư dịch vụ Siemens Healthineers'
    },
    {
      id: 'BT-04',
      ticketCode: 'SC-VPI-DEXA',
      deviceName: 'Máy Đo loãng xương DEXA toàn thân',
      room: 'Phòng Đo loãng xương DEXA',
      reportedBy: 'KTV. Nguyễn Duy Hạnh',
      dateReported: '2026-09-29',
      priority: 'Trung bình',
      symptom: 'Đề xuất lắp Card mạng máy tính đo loãng xương kết nối mạng LAN nội bộ gửi kết quả về máy chủ PACS.',
      solution: 'Phòng CNTT VPI đã lắp đặt card mạng PCI Gigabit và cấu hình IP tĩnh thành công.',
      status: 'completed',
      technician: 'Bộ phận CNTT BV Vĩnh Phúc VPI'
    }
  ]
};

// Application State Management
class RadOpsApp {
  constructor() {
    this.data = this.loadData();
    this.currentTab = 'overview';
    this.currentRadiationSubTab = 'inspection'; // 'inspection' | 'training'
    this.selectedRoomFilter = 'all';
    this.searchQuery = '';
    this.deviceFilterCategory = 'all';
    this.isMobileFrame = this.data.settings.viewMode === 'mobile';
    this.isDarkMode = this.data.settings.theme === 'dark';
    
    this.init();
  }

  loadData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.auth) parsed.auth = defaultData.auth;
        if (!parsed.auth.auditLogs) parsed.auth.auditLogs = defaultData.auth.auditLogs;
        return parsed;
      }
    } catch (e) {
      console.error('Lỗi khi đọc LocalStorage:', e);
    }
    return JSON.parse(JSON.stringify(defaultData));
  }

  saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Lỗi khi lưu LocalStorage:', e);
    }
  }

  resetData() {
    if (confirm('Bạn có chắc chắn muốn đặt lại dữ liệu mẫu gốc chuẩn của Bệnh viện Quốc tế Vĩnh Phúc (VPI) không?')) {
      this.data = JSON.parse(JSON.stringify(defaultData));
      this.saveData();
      this.render();
      alert('Đã khôi phục dữ liệu gốc Bệnh viện Quốc tế Vĩnh Phúc (VPI) thành công!');
    }
  }

  getCurrentUser() {
    return this.data.staff.find(s => s.id === this.data.auth.currentUserId) || this.data.staff[0];
  }

  getCurrentUserRole() {
    const user = this.getCurrentUser();
    return this.data.auth.roles[user.roleKey] || this.data.auth.roles.technician;
  }

  // Chuyển đổi vị trí truy cập (Nội viện vs Ngoại viện)
  toggleLocationMode() {
    this.data.auth.locationMode = this.data.auth.locationMode === 'external' ? 'internal' : 'external';
    this.saveData();
    this.render();
  }

  // Bật/tắt quyền ngoại viện cho nhân viên
  toggleExternalAccess(staffId) {
    const currentRole = this.getCurrentUserRole();
    if (!currentRole.canManagePermissions) {
      alert('Chỉ KTV Trưởng (Vũ Bá Đạt) hoặc Lãnh đạo Khoa (BS. Trịnh Văn Bình) mới có quyền cấp quyền truy cập ngoại viện!');
      return;
    }

    const member = this.data.staff.find(s => s.id === staffId);
    if (member) {
      member.allowExternalAccess = !member.allowExternalAccess;
      this.saveData();
      this.render();
    }
  }

  // Đổi tài khoản người dùng đang đăng nhập (kèm xác thực PIN & kiểm soát ngoại viện)
  switchUser(staffId, pinInput = null) {
    const member = this.data.staff.find(s => s.id === staffId);
    if (!member) return false;

    const isExternal = this.data.auth.locationMode === 'external';

    // 1. Kiểm tra nếu đang ở chế độ Ngoại viện mà tài khoản bị khóa ngoại viện
    if (isExternal && !member.allowExternalAccess) {
      if (!this.data.auth.auditLogs) this.data.auth.auditLogs = [];
      this.data.auth.auditLogs.unshift({
        id: 'LOG-' + Date.now(),
        time: 'Vừa xong',
        userName: member.name,
        role: member.role,
        action: 'Đăng nhập Ngoại viện (Bị chặn do chưa cấp quyền)',
        ip: '42.115.89.12 (Ngoại viện 4G)',
        status: 'blocked'
      });
      this.saveData();
      alert(`⛔ TRUY CẬP BỊ TỪ CHỐI:\nNhân sự ${member.name} (${member.role}) chưa được cấp quyền truy cập đăng nhập NGOẠI VIỆN.\n\nVui lòng liên hệ KTV Trưởng Vũ Bá Đạt để mở quyền hoặc đăng nhập bằng mạng Wi-Fi nội bộ bệnh viện.`);
      return false;
    }

    // 2. Xác thực mã PIN (nếu có nhập)
    if (pinInput !== null && pinInput !== member.pin) {
      alert(`❌ Mã PIN không chính xác! Vui lòng thử lại.\n(Gợi ý mã PIN mẫu cho tài khoản này: ${member.pin})`);
      return false;
    }

    // 3. Đăng nhập thành công
    this.data.auth.currentUserId = member.id;
    member.lastExternalLogin = 'Vừa đăng nhập';

    if (!this.data.auth.auditLogs) this.data.auth.auditLogs = [];
    this.data.auth.auditLogs.unshift({
      id: 'LOG-' + Date.now(),
      time: 'Vừa xong',
      userName: member.name,
      role: member.role,
      action: `Đăng nhập thành công (${isExternal ? '🌐 Ngoại viện 4G' : '🏢 Nội viện LAN'})`,
      ip: isExternal ? '14.238.10.24 (Viettel 4G)' : '192.168.0.171 (Mạng LAN VPI)',
      status: 'success'
    });

    this.saveData();
    this.render();
    this.closeModal();
    alert(`✅ Đã đăng nhập thành công tài khoản: ${member.name} (${member.role})\nChế độ kết nối: ${isExternal ? '🌐 Ngoại viện (Internet/4G)' : '🏢 Nội viện (Mạng LAN VPI)'}`);
    return true;
  }

  // Mở Popup Nhập Mã PIN Xác thực Cá nhân (Keypad)
  openPinLoginModal(staffId) {
    const member = this.data.staff.find(s => s.id === staffId);
    if (!member) return;
    const isExternal = this.data.auth.locationMode === 'external';
    const isBlocked = isExternal && !member.allowExternalAccess;
    const currentRole = this.getCurrentUserRole();

    if (isBlocked) {
      this.showModal(`
        <div class="p-6 text-center space-y-4">
          <div class="w-16 h-16 mx-auto rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center animate-pulse shadow-sm">
            <i data-lucide="shield-alert" class="w-9 h-9"></i>
          </div>
          <div>
            <span class="text-[10px] font-bold tracking-wider text-red-600 uppercase bg-red-50 dark:bg-red-900/30 px-2.5 py-0.5 rounded-full border border-red-200 dark:border-red-800">
              Từ Chối Truy Cập Ngoại Viện
            </span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-2">${member.name}</h3>
            <div class="text-xs text-slate-500">${member.role} • Mã NV: <span class="font-mono font-bold">${member.code}</span></div>
          </div>
          <div class="bg-red-50 dark:bg-red-950/40 p-3.5 rounded-2xl border border-red-200 dark:border-red-900/50 text-xs text-left text-red-800 dark:text-red-300 leading-relaxed space-y-1">
            <div class="font-bold flex items-center space-x-1.5 text-red-700 dark:text-red-300">
              <i data-lucide="lock" class="w-4 h-4"></i>
              <span>Tài khoản hiện đang bị KHÓA đăng nhập Ngoại viện</span>
            </div>
            <p class="text-[11px] text-red-600 dark:text-red-400">
              Chính sách bảo mật an toàn bức xạ BV VPI yêu cầu nhân sự vị trí này chỉ được phép truy cập qua mạng Wi-Fi nội bộ tại bệnh viện.
            </p>
          </div>
          <div class="space-y-2 pt-2">
            ${currentRole.canManagePermissions ? `
              <button onclick="radOpsApp.toggleExternalAccess('${member.id}'); radOpsApp.openPinLoginModal('${member.id}')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center space-x-1.5 shadow-sm">
                <i data-lucide="unlock" class="w-4 h-4"></i>
                <span>Cấp quyền Ngoại viện ngay (Quyền KTV Trưởng)</span>
              </button>
            ` : `
              <div class="text-[11px] text-slate-500 italic">Vui lòng liên hệ KTV Trưởng Vũ Bá Đạt để được mở quyền.</div>
            `}
            <button onclick="radOpsApp.closeModal()" class="w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold py-2 rounded-xl text-xs transition">
              Đóng
            </button>
          </div>
        </div>
      `);
      return;
    }

    // Modal nhập PIN xác thực
    this.showModal(`
      <div class="p-6 space-y-4">
        <div class="flex items-start justify-between">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
              Xác thực Danh tính & Quyền hạn
            </span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1.5">${member.name}</h3>
            <div class="text-xs text-slate-500">${member.role} • Mã NV: <span class="font-mono font-bold">${member.code}</span></div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-2">
          <div class="text-xs text-slate-600 dark:text-slate-300">
            Đang kết nối: <strong class="${isExternal ? 'text-blue-600' : 'text-emerald-600'}">${isExternal ? '🌐 Môi trường Ngoại viện' : '🏢 Mạng Nội viện LAN'}</strong>
          </div>
          
          <!-- Ô nhập PIN -->
          <div class="flex justify-center items-center space-x-2 py-2">
            <input type="password" id="modal-pin-input" maxlength="4" placeholder="••••" autofocus
              class="w-36 text-center text-2xl font-mono tracking-widest bg-white dark:bg-slate-800 border-2 border-blue-500 rounded-xl py-2 px-3 text-slate-900 dark:text-white focus:outline-none shadow-xs"
              onkeypress="if(event.key==='Enter') radOpsApp.submitPinLogin('${member.id}')">
          </div>

          <!-- Nút gợi ý PIN để demo/test nhanh -->
          <div class="inline-flex items-center space-x-1 cursor-pointer bg-blue-100/70 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-lg text-[11px] font-semibold hover:bg-blue-200 transition"
            onclick="document.getElementById('modal-pin-input').value='${member.pin}'; radOpsApp.submitPinLogin('${member.id}')">
            <i data-lucide="key" class="w-3 h-3"></i>
            <span>Mã PIN: <strong class="font-mono">${member.pin}</strong> (Bấm để điền & đăng nhập nhanh)</span>
          </div>
        </div>

        <!-- Bàn phím số Keypad -->
        <div class="grid grid-cols-3 gap-2 pt-1">
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => `
            <button onclick="radOpsApp.appendPinDigit('${num}')" class="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-800 dark:text-slate-100 font-bold text-base transition flex items-center justify-center border border-slate-200/60 dark:border-slate-700">
              ${num}
            </button>
          `).join('')}
          <button onclick="radOpsApp.clearPinInput()" class="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-50 text-slate-600 font-bold text-xs transition flex items-center justify-center border border-slate-200/60 dark:border-slate-700">
            Xóa
          </button>
          <button onclick="radOpsApp.appendPinDigit('0')" class="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-800 dark:text-slate-100 font-bold text-base transition flex items-center justify-center border border-slate-200/60 dark:border-slate-700">
            0
          </button>
          <button onclick="radOpsApp.submitPinLogin('${member.id}')" class="h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center shadow-xs">
            Xác nhận
          </button>
        </div>
      </div>
    `);
    setTimeout(() => {
      const pinField = document.getElementById('modal-pin-input');
      if (pinField) pinField.focus();
    }, 100);
  }

  appendPinDigit(d) {
    const field = document.getElementById('modal-pin-input');
    if (field && field.value.length < 4) {
      field.value += d;
    }
  }

  clearPinInput() {
    const field = document.getElementById('modal-pin-input');
    if (field) field.value = '';
  }

  submitPinLogin(staffId) {
    const field = document.getElementById('modal-pin-input');
    const pin = field ? field.value : '';
    this.switchUser(staffId, pin);
  }

  // Modal Nhật Ký Đăng Nhập Ngoại Viện (Audit Logs)
  openAuditLogModal() {
    const logs = this.data.auth.auditLogs || [];
    this.showModal(`
      <div class="p-5 space-y-4">
        <div class="flex items-start justify-between">
          <div>
            <span class="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded-full uppercase">
              Bảo Mật & An Toàn Thông Tin
            </span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">Nhật Ký Truy Cập Ngoại Viện</h3>
            <div class="text-xs text-slate-500">Lịch sử giám sát các phiên đăng nhập từ xa của Khoa CĐHA</div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="max-h-72 overflow-y-auto space-y-2 pr-1 text-xs">
          ${logs.map(log => `
            <div class="p-3 rounded-xl border ${
              log.status === 'blocked' ? 'bg-red-50/60 dark:bg-red-950/30 border-red-200 dark:border-red-900/40' : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
            } flex items-start justify-between">
              <div class="space-y-0.5">
                <div class="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                  <span>${log.userName}</span>
                  <span class="text-[10px] text-slate-500 font-normal">(${log.role})</span>
                </div>
                <div class="text-[11px] ${log.status === 'blocked' ? 'text-red-600 font-semibold' : 'text-slate-600 dark:text-slate-300'}">
                  ${log.action}
                </div>
                <div class="text-[10px] text-slate-400 font-mono">
                  ${log.ip} • ${log.time}
                </div>
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${
                log.status === 'blocked' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
              }">
                ${log.status === 'blocked' ? 'Bị chặn' : 'Thành công'}
              </span>
            </div>
          `).join('')}
        </div>

        <div class="pt-2 flex justify-end">
          <button onclick="radOpsApp.closeModal()" class="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold py-2 px-4 rounded-xl text-xs transition">
            Đóng
          </button>
        </div>
      </div>
    `);
  }

  // Modal Đồng Bộ Đám Mây & QR Code
  openCloudSyncModal() {
    const syncDataString = btoa(encodeURIComponent(JSON.stringify(this.data)));

    this.showModal(`
      <div class="p-5 space-y-4">
        <div class="flex items-start justify-between">
          <div>
            <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full uppercase">
              Đồng Bộ Đa Thiết Bị
            </span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">Đồng Bộ Dữ Liệu Đám Mây VPI</h3>
            <div class="text-xs text-slate-500">Chuyển dữ liệu giữa máy tính khoa và điện thoại di động KTV</div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Cách 1: Đồng bộ 1-chạm sao chép mã -->
        <div class="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 space-y-2 text-xs">
          <div class="font-bold text-blue-900 dark:text-blue-200 flex items-center justify-between">
            <span class="flex items-center space-x-1.5">
              <i data-lucide="smartphone" class="w-4 h-4 text-blue-600"></i>
              <span>1. Sao chép Mã Đồng Bộ sang Điện thoại</span>
            </span>
            <span class="text-[10px] bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded font-mono font-bold">1-Click</span>
          </div>
          <p class="text-[11px] text-blue-700 dark:text-blue-300">
            Bấm nút bên dưới để copy toàn bộ dữ liệu 14 máy và 15 nhân sự, sau đó gửi qua Zalo rồi dán vào app trên điện thoại:
          </p>
          <div class="flex items-center space-x-2">
            <button onclick="navigator.clipboard.writeText('${syncDataString}'); alert('✅ Đã sao chép Mã Đồng Bộ vào Bộ nhớ tạm! Gửi mã này qua Zalo để nạp vào điện thoại.')" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center space-x-1 shadow-xs">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              <span>Sao chép Mã Dữ Liệu Đồng Bộ</span>
            </button>
          </div>
        </div>

        <!-- Cách 2: Nạp mã từ máy khác -->
        <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
            <i data-lucide="download" class="w-4 h-4 text-emerald-600"></i>
            <span>2. Nạp Mã Đồng Bộ (Dán từ thiết bị khác)</span>
          </div>
          <textarea id="import-sync-code" placeholder="Dán mã đồng bộ nhận từ Zalo vào đây..." rows="2" class="w-full text-xs font-mono p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"></textarea>
          <button onclick="radOpsApp.applySyncCode()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs transition">
            Áp Dụng Dữ Liệu Ngay
          </button>
        </div>

        <!-- Cách 3: Hướng dẫn Vercel Cloud Hosting -->
        <div class="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs space-y-1">
          <div class="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
            <i data-lucide="globe" class="w-3.5 h-3.5 text-blue-500"></i>
            <span>3. Triển khai Vercel (Địa chỉ Web vĩnh viễn)</span>
          </div>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">
            Đã có sẵn file cấu hình <code>vercel.json</code>. Bệnh viện có thể đưa lên Vercel để nhận link HTTPS dùng chung cho toàn thể cán bộ nhân viên mở 24/7.
          </p>
        </div>
      </div>
    `);
  }

  applySyncCode() {
    const codeArea = document.getElementById('import-sync-code');
    if (!codeArea || !codeArea.value.trim()) {
      alert('Vui lòng dán mã đồng bộ!');
      return;
    }
    try {
      const jsonStr = decodeURIComponent(atob(codeArea.value.trim()));
      const parsed = JSON.parse(jsonStr);
      if (parsed && parsed.hospital && parsed.devices) {
        this.data = parsed;
        this.saveData();
        this.render();
        this.closeModal();
        alert('🎉 Đồng bộ thành công! Toàn bộ 14 thiết bị và 15 nhân sự BV VPI đã được cập nhật.');
      } else {
        alert('❌ Mã đồng bộ không hợp lệ!');
      }
    } catch (e) {
      alert('❌ Lỗi giải mã dữ liệu đồng bộ. Vui lòng kiểm tra lại mã!');
    }
  }

  // Nhập dữ liệu từ file sao lưu JSON
  triggerImportJSON() {
    let input = document.getElementById('import-json-file-input');
    if (!input) {
      input = document.createElement('input');
      input.id = 'import-json-file-input';
      input.type = 'file';
      input.accept = '.json';
      input.className = 'hidden';
      input.onchange = (e) => this.handleImportJSON(e);
      document.body.appendChild(input);
    }
    input.click();
  }

  handleImportJSON(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.hospital && parsed.devices && parsed.staff) {
          this.data = parsed;
          this.saveData();
          this.render();
          alert('🎉 Đã nhập dữ liệu thành công từ tệp sao lưu JSON!');
        } else {
          alert('❌ Tệp JSON không đúng định dạng dữ liệu RADOPS.');
        }
      } catch (err) {
        alert('❌ Lỗi khi đọc tệp JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  init() {
    this.applyTheme();
    this.applyViewMode();
    this.render();
    this.bindGlobalEvents();
  }

  applyTheme() {
    const root = document.documentElement;
    if (this.isDarkMode) {
      root.classList.add('dark', 'dark-mode');
    } else {
      root.classList.remove('dark', 'dark-mode');
    }
    this.data.settings.theme = this.isDarkMode ? 'dark' : 'light';
    this.saveData();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    this.render();
  }

  applyViewMode() {
    const body = document.body;
    if (this.isMobileFrame) {
      body.classList.add('mobile-frame-mode');
    } else {
      body.classList.remove('mobile-frame-mode');
    }
    this.data.settings.viewMode = this.isMobileFrame ? 'mobile' : 'desktop';
    this.saveData();

    const lbl = document.getElementById('view-mode-label');
    if (lbl) {
      lbl.textContent = this.isMobileFrame ? 'Mobile Frame' : 'Toàn màn hình';
    }
  }

  toggleViewMode() {
    this.isMobileFrame = !this.isMobileFrame;
    this.applyViewMode();
    this.render();
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  switchRadiationSubTab(subTab) {
    this.currentRadiationSubTab = subTab;
    this.render();
  }

  setRoomFilter(roomName) {
    this.selectedRoomFilter = roomName;
    this.render();
  }

  setDeviceFilter(category) {
    this.deviceFilterCategory = category;
    this.render();
  }

  setSearchQuery(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.render();
  }

  getFilteredDevices() {
    return this.data.devices.filter(dev => {
      const matchRoom = this.selectedRoomFilter === 'all' || dev.room === this.selectedRoomFilter;
      const matchCategory = this.deviceFilterCategory === 'all' || dev.category === this.deviceFilterCategory;
      const matchSearch = !this.searchQuery || 
        dev.name.toLowerCase().includes(this.searchQuery) ||
        dev.code.toLowerCase().includes(this.searchQuery) ||
        dev.model.toLowerCase().includes(this.searchQuery) ||
        dev.manufacturer.toLowerCase().includes(this.searchQuery) ||
        dev.room.toLowerCase().includes(this.searchQuery) ||
        dev.personInCharge.toLowerCase().includes(this.searchQuery);
      return matchRoom && matchCategory && matchSearch;
    });
  }

  getKPI() {
    const totalDevices = this.data.devices.length;
    const radiationDevices = this.data.devices.filter(d => d.category === 'Bức xạ').length;
    const measurementDevices = this.data.devices.filter(d => d.category === 'Đo lường').length;
    const nonRadiationDevices = this.data.devices.filter(d => d.category === 'Không bức xạ' || d.category === 'Từ trường').length;
    
    const urgentLicenses = this.data.devices.filter(d => d.licenseDaysLeft <= 45 && d.category === 'Bức xạ').length;
    const urgentInspections = this.data.devices.filter(d => d.inspectionDaysLeft <= 30 && d.inspectionDaysLeft > 0).length;
    const urgentStaffTraining = this.data.staff.filter(s => s.daysLeft <= 60).length;

    return {
      totalDevices,
      radiationDevices,
      measurementDevices,
      nonRadiationDevices,
      urgentLicenses,
      urgentInspections,
      urgentStaffTraining
    };
  }

  // RENDER TOÀN BỘ ỨNG DỤNG
  render() {
    const appEl = document.getElementById('app-container');
    if (!appEl) return;

    const currentUser = this.getCurrentUser();
    const currentRole = this.getCurrentUserRole();
    const isExternal = this.data.auth.locationMode === 'external';

    appEl.innerHTML = `
      <!-- Phone Bezel Notch (Chỉ hiện khi ở chế độ Mobile Frame) -->
      <div class="phone-notch select-none">
        <span class="font-bold">16:29</span>
        <div class="flex items-center space-x-1.5 text-xs">
          <span>●●● 5G</span>
          <span>98% 🔋</span>
        </div>
      </div>

      <!-- Current User & Access Mode Status Bar (Phân quyền & Ngoại viện) -->
      <div class="bg-slate-900 text-white px-3.5 py-1.5 text-[11px] flex items-center justify-between border-b border-slate-800">
        <div class="flex items-center space-x-2">
          <!-- Location Mode Toggle -->
          <button onclick="radOpsApp.toggleLocationMode()" title="Nhấn để đổi chế độ kết nối" class="flex items-center space-x-1 px-2 py-0.5 rounded-full font-bold transition ${
            isExternal ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
          }">
            <i data-lucide="${isExternal ? 'globe' : 'building-2'}" class="w-3 h-3"></i>
            <span>${isExternal ? '🌐 Ngoại viện (Internet/4G)' : '🏢 Nội viện (Mạng LAN VPI)'}</span>
          </button>
        </div>

        <!-- Current User Selector -->
        <div class="flex items-center space-x-1.5">
          <button onclick="radOpsApp.openLoginSwitchModal()" class="flex items-center space-x-1.5 hover:bg-slate-800 px-2 py-0.5 rounded-lg transition">
            <span class="text-slate-400">Đang đăng nhập:</span>
            <span class="font-bold text-blue-400">${currentUser.name}</span>
            <span class="bg-blue-600/40 text-blue-200 text-[10px] px-1.5 py-0.2 rounded font-mono">${currentUser.code}</span>
            <i data-lucide="chevron-down" class="w-3 h-3 text-slate-400"></i>
          </button>
        </div>
      </div>

      <!-- Header Topbar (Chuẩn theo Stitch Screenshot) -->
      ${this.renderHeader()}

      <!-- Main Content Container -->
      <main class="flex-1 overflow-y-auto pb-24 md:pb-6 px-3.5 pt-3">
        ${this.renderCurrentView()}
      </main>

      <!-- Bottom Navigation Bar (Dành cho Mobile & Tablet) -->
      ${this.renderBottomNav()}

      <!-- Modals Container -->
      <div id="modal-container"></div>
    `;

    // Khởi tạo icon Lucide
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderHeader() {
    const currentUser = this.getCurrentUser();

    return `
      <header class="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 sticky top-0 z-30 shadow-xs">
        <div class="flex items-center justify-between">
          <!-- Logo & Bệnh viện Vĩnh Phúc VPI -->
          <div class="flex items-center space-x-2.5">
            <div class="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold shadow-sm shadow-blue-500/20">
              <i data-lucide="activity" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="flex items-center space-x-1.5">
                <span class="font-extrabold tracking-tight text-blue-700 dark:text-blue-400 text-base">RADOPS</span>
                <span class="text-xs text-slate-400">• Khoa CĐHA</span>
              </div>
              <div class="flex items-center text-xs font-semibold text-slate-700 dark:text-slate-200">
                <span>${this.data.hospital.name}</span>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5 ml-0.5 text-slate-400"></i>
              </div>
            </div>
          </div>

          <!-- Actions: Remote Access Info, Search, Theme, Bell, Avatar -->
          <div class="flex items-center space-x-1 sm:space-x-2">
            <!-- Nút Mở Hướng dẫn Ngoại viện -->
            <button onclick="radOpsApp.openRemoteAccessGuideModal()" title="Hướng dẫn truy cập ngoại viện cho nhân viên" class="p-2 rounded-xl text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition">
              <i data-lucide="wifi" class="w-4 h-4"></i>
            </button>

            <!-- Search Icon Toggle -->
            <button onclick="radOpsApp.openSearchModal()" title="Tìm kiếm thiết bị & hồ sơ" class="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
              <i data-lucide="search" class="w-4 h-4"></i>
            </button>

            <!-- Chế độ Tối / Sáng -->
            <button onclick="radOpsApp.toggleDarkMode()" title="Chuyển chế độ Sáng/Tối buồng đọc phim" class="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
              <i data-lucide="${this.isDarkMode ? 'sun' : 'moon'}" class="w-4 h-4"></i>
            </button>

            <!-- Chuông thông báo -->
            <div class="relative">
              <button onclick="radOpsApp.openNotificationsModal()" title="Thông báo khẩn cấp ATBX" class="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition relative">
                <i data-lucide="bell" class="w-4 h-4"></i>
                <span class="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">3</span>
              </button>
            </div>

            <!-- Avatar Người Dùng Hiện Tại -->
            <button onclick="radOpsApp.openLoginSwitchModal()" title="Nhấn để đổi tài khoản / Phân quyền" class="ml-1 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs ring-2 ring-blue-500/20">
              ${currentUser.name.split(' ').slice(-1)[0][0]}
            </button>
          </div>
        </div>
      </header>
    `;
  }

  renderCurrentView() {
    switch (this.currentTab) {
      case 'overview':
        return this.renderOverviewTab();
      case 'equipment':
        return this.renderEquipmentTab();
      case 'maintenance':
        return this.renderMaintenanceTab();
      case 'radiation':
        return this.renderRadiationTab();
      case 'rooms':
        return this.renderRoomsTab();
      case 'staff':
        return this.renderStaffTab();
      case 'settings':
        return this.renderSettingsTab();
      default:
        return this.renderOverviewTab();
    }
  }

  // ==========================================
  // TAB 1: TỔNG QUAN (DASHBOARD)
  // ==========================================
  renderOverviewTab() {
    const kpi = this.getKPI();
    const currentUser = this.getCurrentUser();
    const currentRole = this.getCurrentUserRole();

    return `
      <div class="space-y-3.5 animate-fadeIn">
        
        <!-- Tuân thủ ATBX Header Card (Screenshot 1 & 2) -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-xs relative overflow-hidden">
          <div class="flex items-start justify-between">
            <div class="space-y-1">
              <div class="flex items-center space-x-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                <span class="font-bold text-sm text-slate-900 dark:text-white">${this.data.hospital.name}</span>
              </div>
              <div class="text-xs text-slate-500 dark:text-slate-400">
                Phụ trách ATBX: <span class="font-semibold text-slate-700 dark:text-slate-200">${this.data.hospital.officer} (KTV Trưởng)</span>
              </div>
              <div class="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                • Căn cứ: Luật NLNT & NĐ 142/2020 & TT 23/TT-BKHCN
              </div>
            </div>
            <div class="flex items-center space-x-1 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full text-xs font-bold border border-blue-200 dark:border-blue-800">
              <i data-lucide="shield-check" class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400"></i>
              <span>100% Tuân thủ</span>
            </div>
          </div>
        </div>

        <!-- Banner Cảnh Báo Khẩn Cấp (Nghị định 142 - Máy CT Revolution ACT GE) -->
        <div onclick="radOpsApp.openDossierModal('TB-02')" class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:shadow-sm transition">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
              <i data-lucide="clock" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="text-xs font-bold text-slate-900 dark:text-white flex items-center">
                Máy CT Revolution ACT GE (Phòng CT-Scanner)
              </div>
              <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Chuẩn bị báo cáo an toàn & hồ sơ gia hạn GPBX Cục ATBXHN (Còn 42 ngày)
              </div>
            </div>
          </div>
          <div class="w-7 h-7 rounded-full bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shadow-xs shrink-0">
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </div>
        </div>

        <!-- 4 Grid Stat Cards (2x2 KPI - Exact Replica) -->
        <div class="grid grid-cols-2 gap-3">
          
          <!-- Card 1: Tổng thiết bị -->
          <div onclick="radOpsApp.switchTab('equipment')" class="bg-white dark:bg-slate-800 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-700 shadow-xs cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Tổng thiết bị</span>
              <div class="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <i data-lucide="layers" class="w-3.5 h-3.5"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline space-x-1.5">
              <span class="text-2xl font-black text-slate-900 dark:text-white">${kpi.totalDevices}</span>
              <span class="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Đang hoạt động</span>
            </div>
            <div class="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div class="bg-blue-600 h-full rounded-full" style="width: 100%"></div>
            </div>
            <div class="mt-2 text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>● ${kpi.radiationDevices} Bức xạ</span>
              <span>● ${kpi.measurementDevices} Đo lường</span>
            </div>
          </div>

          <!-- Card 2: GP Bức xạ cần gia hạn (Đỏ NĐ 142) -->
          <div onclick="radOpsApp.switchTab('radiation')" class="bg-white dark:bg-slate-800 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-700 shadow-xs cursor-pointer hover:border-red-300 dark:hover:border-red-700 transition">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-slate-500 dark:text-slate-400">GP Bức xạ cần gia hạn</span>
              <div class="w-6 h-6 rounded-lg bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center">
                <i data-lucide="stamp" class="w-3.5 h-3.5"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline space-x-1.5">
              <span class="text-2xl font-black text-red-600 dark:text-red-400">01</span>
              <span class="text-[11px] font-semibold text-red-600 dark:text-red-400">Hạn đỏ NĐ 142</span>
            </div>
            <div class="mt-3">
              <span class="inline-block bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Bắt buộc nộp &lt; 45 ngày
              </span>
            </div>
          </div>

          <!-- Card 3: Kiểm định trong tháng (TT 23) -->
          <div onclick="radOpsApp.switchTab('radiation')" class="bg-white dark:bg-slate-800 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-700 shadow-xs cursor-pointer hover:border-amber-300 dark:hover:border-amber-700 transition">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Kiểm định trong tháng</span>
              <div class="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <i data-lucide="clipboard-check" class="w-3.5 h-3.5"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline space-x-1.5">
              <span class="text-2xl font-black text-amber-600 dark:text-amber-400">01</span>
              <span class="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Đến hạn</span>
            </div>
            <div class="mt-3">
              <span class="inline-block bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                Chu kỳ 1 năm TT 23
              </span>
            </div>
          </div>

          <!-- Card 4: Đào tạo lại nhân sự (TT 02) -->
          <div onclick="radOpsApp.switchTab('staff')" class="bg-white dark:bg-slate-800 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-700 shadow-xs cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Đào tạo lại nhân sự</span>
              <div class="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <i data-lucide="graduation-cap" class="w-3.5 h-3.5"></i>
              </div>
            </div>
            <div class="mt-2 flex items-baseline space-x-1.5">
              <span class="text-2xl font-black text-indigo-600 dark:text-indigo-400">01</span>
              <span class="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Nhân viên</span>
            </div>
            <div class="mt-3">
              <span class="inline-block bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                Chu kỳ 3 năm TT 02
              </span>
            </div>
          </div>

        </div>

        <!-- Lọc nhanh theo Phòng làm việc -->
        <div class="space-y-2">
          <div class="text-xs font-bold text-slate-900 dark:text-white">Lọc nhanh theo Phòng làm việc</div>
          <div class="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
            <button onclick="radOpsApp.setRoomFilter('all')" class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${this.selectedRoomFilter === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}">
              Tất cả vị trí
            </button>
            <button onclick="radOpsApp.setRoomFilter('Phòng CT-Scanner')" class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${this.selectedRoomFilter === 'Phòng CT-Scanner' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}">
              Phòng CT-Scanner <span class="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">3</span>
            </button>
            <button onclick="radOpsApp.setRoomFilter('Phòng MRI')" class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${this.selectedRoomFilter === 'Phòng MRI' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}">
              Phòng MRI <span class="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">2</span>
            </button>
            <button onclick="radOpsApp.setRoomFilter('Phòng X-quang Vikomed')" class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${this.selectedRoomFilter === 'Phòng X-quang Vikomed' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}">
              Phòng X-quang Vikomed
            </button>
            <button onclick="radOpsApp.setRoomFilter('Phòng Nhũ ảnh')" class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${this.selectedRoomFilter === 'Phòng Nhũ ảnh' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}">
              Phòng Nhũ ảnh
            </button>
            <button onclick="radOpsApp.setRoomFilter('Phòng Siêu âm 01')" class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${this.selectedRoomFilter === 'Phòng Siêu âm 01' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}">
              Phòng Siêu âm 01 (Resona I9)
            </button>
          </div>
        </div>

        <!-- Danh sách việc cần làm gấp -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-900 dark:text-white">Danh sách việc cần làm gấp (${this.data.urgentTasks.length})</span>
            <button onclick="radOpsApp.switchTab('radiation')" class="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">Xem tất cả</button>
          </div>

          <div class="space-y-2">
            ${this.data.urgentTasks.map(task => `
              <div onclick="radOpsApp.handleUrgentAction('${task.actionUrl}')" class="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-700 shadow-xs flex items-center justify-between cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition">
                <div class="flex items-start space-x-3">
                  <div class="w-7 h-7 rounded-full bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <i data-lucide="${task.level === 'danger' ? 'alert-triangle' : 'clock'}" class="w-3.5 h-3.5 text-${task.level === 'danger' ? 'red-400' : 'amber-400'}"></i>
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-900 dark:text-white">${task.title}</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">${task.description}</div>
                    <div class="mt-1 flex items-center space-x-2">
                      <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md ${task.level === 'danger' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'}">
                        ${task.deadline}
                      </span>
                      <span class="text-[10px] text-slate-400">• ${task.category}</span>
                    </div>
                  </div>
                </div>
                <div class="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                  <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Tiện ích nhanh: Quét mã QR, Báo hỏng, In báo cáo A4 -->
        <div class="grid grid-cols-3 gap-2.5 pt-1">
          <button onclick="radOpsApp.openQRScannerModal()" class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-2.5 text-center hover:bg-blue-100 dark:hover:bg-blue-900/50 transition">
            <i data-lucide="qr-code" class="w-5 h-5 mx-auto text-blue-600 dark:text-blue-400 mb-1"></i>
            <span class="text-[11px] font-bold text-blue-700 dark:text-blue-300 block">Quét mã QR</span>
          </button>
          
          <button onclick="radOpsApp.openNewWorkOrderModal()" class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 rounded-xl p-2.5 text-center hover:bg-red-100 dark:hover:bg-red-900/50 transition">
            <i data-lucide="wrench" class="w-5 h-5 mx-auto text-red-600 dark:text-red-400 mb-1"></i>
            <span class="text-[11px] font-bold text-red-700 dark:text-red-300 block">Báo hỏng máy</span>
          </button>

          <button onclick="radOpsApp.openPrintReportModal()" class="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-2.5 text-center hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition">
            <i data-lucide="printer" class="w-5 h-5 mx-auto text-emerald-600 dark:text-emerald-400 mb-1"></i>
            <span class="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 block">In báo cáo A4</span>
          </button>
        </div>

      </div>
    `;
  }

  // ==============================================================
  // TAB 4: AN TOÀN BỨC XẠ & KIỂM ĐỊNH (Exact Uploaded Screenshot)
  // ==============================================================
  renderRadiationTab() {
    return `
      <div class="space-y-3.5 animate-fadeIn">
        
        <!-- Header Banner: Tuân thủ ATBX Bệnh viện VPI -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-xs">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-3">
              <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                <i data-lucide="shield" class="w-5 h-5"></i>
              </div>
              <div>
                <div class="flex items-center space-x-1.5 flex-wrap">
                  <span class="font-bold text-slate-900 dark:text-white text-sm">Tuân thủ ATBX Bệnh viện VPI</span>
                  <span class="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ✓ NĐ 142 & TT 02
                  </span>
                </div>
                <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  ${this.data.hospital.officer} (KTV Trưởng & Phụ trách ATBX)
                </div>
              </div>
            </div>
          </div>

          <div class="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <div>
              <span class="text-slate-500 dark:text-slate-400">Tỷ lệ hồ sơ pháp lý hợp lệ:</span>
              <span class="font-bold text-blue-600 dark:text-blue-400 ml-1">100% Đủ điều kiện vận hành</span>
            </div>
            <div class="text-slate-400 text-[11px]">
              Chu kỳ giám sát: <span class="font-semibold text-slate-600 dark:text-slate-300">${this.data.hospital.supervisionCycle}</span>
            </div>
          </div>

          <!-- Progress Bar 100% -->
          <div class="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
            <div class="bg-blue-600 h-full rounded-full" style="width: 100%"></div>
          </div>
        </div>

        <!-- 2 Sub-Tabs (Kiểm định & Thiết bị VS Hạn học ATBX KTV) -->
        <div class="flex border-b border-slate-200 dark:border-slate-700">
          <button onclick="radOpsApp.switchRadiationSubTab('inspection')" class="flex-1 pb-2.5 text-center text-xs font-bold transition relative ${this.currentRadiationSubTab === 'inspection' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}">
            <div class="flex items-center justify-center space-x-1.5">
              <i data-lucide="scale" class="w-4 h-4"></i>
              <span>Kiểm định & Thiết bị</span>
            </div>
            ${this.currentRadiationSubTab === 'inspection' ? '<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></div>' : ''}
          </button>

          <button onclick="radOpsApp.switchRadiationSubTab('training')" class="flex-1 pb-2.5 text-center text-xs font-bold transition relative ${this.currentRadiationSubTab === 'training' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}">
            <div class="flex items-center justify-center space-x-1.5">
              <i data-lucide="badge-alert" class="w-4 h-4"></i>
              <span>Hạn học ATBX KTV</span>
              <span class="w-2 h-2 rounded-full bg-red-600"></span>
            </div>
            ${this.currentRadiationSubTab === 'training' ? '<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></div>' : ''}
          </button>
        </div>

        ${this.currentRadiationSubTab === 'inspection' ? this.renderRadiationInspectionSubTab() : this.renderRadiationTrainingSubTab()}

      </div>
    `;
  }

  renderRadiationInspectionSubTab() {
    return `
      <div class="space-y-3 animate-fadeIn">
        
        <!-- 2 Metric Cards: Kiểm định máy & GP Cục ATBXHN -->
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-700 shadow-xs">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">Kiểm định máy</span>
              <div class="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
              </div>
            </div>
            <div class="mt-2">
              <div class="text-lg font-black text-red-600">01 <span class="text-xs font-bold">Cần xử lý</span></div>
              <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Hết hạn &lt; 30 ngày</div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-700 shadow-xs">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">GP Cục ATBXHN</span>
              <div class="w-6 h-6 rounded-lg bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center">
                <i data-lucide="stamp" class="w-3.5 h-3.5"></i>
              </div>
            </div>
            <div class="mt-2">
              <div class="text-lg font-black text-slate-900 dark:text-white">42 ngày</div>
              <div class="text-[11px] font-bold text-red-600 dark:text-red-400 mt-0.5">Nghị định 142: nộp &lt; 45n</div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between pt-1">
          <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center">
            <i data-lucide="file-text" class="w-4 h-4 mr-1.5 text-blue-600"></i>
            Hồ sơ kiểm định & Giấy phép (4 danh mục)
          </span>
          <span class="text-[11px] text-slate-400">Đầy đủ pháp lý</span>
        </div>

        <div class="space-y-3">
          
          <!-- ITEM 1: Máy X-quang Vikomed -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-3">
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                  <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                </div>
                <div>
                  <div class="flex items-center space-x-2">
                    <span class="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Máy X-quang KTS Vikomed</span>
                    <span class="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md">Phòng X-quang</span>
                  </div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    GCN: KĐ-2024-XQ-VKM-889 • Hết hạn: 28/03/2025
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl p-2.5 flex items-center space-x-2 text-red-700 dark:text-red-300 text-xs">
              <i data-lucide="clock" class="w-4 h-4 shrink-0 text-red-600"></i>
              <span class="font-semibold text-[11px]">Còn 18 ngày - Cần liên hệ Viện Đo lường / TT Kiểm định</span>
            </div>

            <div class="flex items-center space-x-2 pt-1">
              <button onclick="radOpsApp.openScheduleInspectionModal('TB-04')" class="flex-1 bg-blue-900 dark:bg-blue-700 text-white hover:bg-blue-800 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition">
                <i data-lucide="calendar-plus" class="w-3.5 h-3.5"></i>
                <span>Đặt lịch kiểm định</span>
              </button>
              <button onclick="radOpsApp.openInspectionCertModal('TB-04')" title="Xem biên bản GCN" class="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                <i data-lucide="file-check" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <!-- ITEM 2: Máy CT Revolution ACT GE / Somatom -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-3">
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                </div>
                <div>
                  <div class="flex items-center space-x-1.5 flex-wrap">
                    <span class="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Máy CT Revolution ACT GE</span>
                    <span class="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md">Phòng CT-Scanner</span>
                    <span class="bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 text-[10px] font-bold px-2 py-0.5 rounded-md">Hạn nộp hồ sơ</span>
                  </div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    GP Bức xạ: 45/GP-ATBX (Cục ATBXHN)
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-xl p-2.5 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <div class="font-bold flex items-center">
                <span>Yêu cầu Nghị định 142/2020:</span>
                <span class="text-red-600 dark:text-red-400 ml-1 font-black">Còn 42 ngày</span>
              </div>
              <div class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Bắt buộc nộp hồ sơ xin gia hạn trước khi giấy phép hết hạn ít nhất 45 ngày.
              </div>
            </div>

            <div class="flex items-center justify-between pt-1">
              <div class="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                TÌNH TRẠNG: <span class="text-blue-600 dark:text-blue-400">ĐÃ LẬP HỒ SƠ KT</span>
              </div>
              <button onclick="radOpsApp.openDossierModal('TB-02')" class="bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 py-2 px-3 rounded-xl text-xs font-bold flex items-center space-x-1 transition">
                <span>Soạn hồ sơ Cục ATBX</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>

          <!-- ITEM 3: Máy Chụp Nhũ ảnh Mammography (Vú) -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2.5">
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <i data-lucide="check-circle" class="w-4 h-4"></i>
                </div>
                <div>
                  <div class="flex items-center space-x-2">
                    <span class="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Máy Chụp Nhũ ảnh Mammography (Vú)</span>
                    <span class="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">✓ An toàn</span>
                  </div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Kiểm định liều tuyến vú & Độ phân giải
                  </div>
                </div>
              </div>
            </div>

            <div class="text-xs text-slate-600 dark:text-slate-300 pt-1 flex items-center justify-between">
              <span>Kỳ kiểm định: <strong class="text-slate-900 dark:text-white">11/2024</strong></span>
              <span>Hiệu lực đến: <strong class="text-emerald-600 dark:text-emerald-400">11/2025</strong></span>
            </div>
          </div>

          <!-- ITEM 4: Phòng Chụp X-quang & CT-Scanner VPI -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2.5">
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <i data-lucide="shield" class="w-4 h-4"></i>
                </div>
                <div>
                  <div class="flex items-center space-x-2">
                    <span class="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Phòng Chụp X-quang & CT-Scanner VPI</span>
                    <span class="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md">Định kỳ 1 năm</span>
                  </div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Biên bản an toàn che chắn (Kiểm xạ môi trường)
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 rounded-xl p-2.5 flex items-center justify-between text-xs">
              <span class="text-slate-600 dark:text-slate-300 text-[11px]">Liều bức xạ phông ngoài phòng:</span>
              <div class="font-black text-blue-700 dark:text-blue-300 flex items-center space-x-1">
                <span>≤ 0.12 µSv/h</span>
                <span class="bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded">Đạt TCVN</span>
              </div>
            </div>
          </div>

        </div>

        <div class="bg-slate-50 dark:bg-slate-850 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-700 text-xs space-y-1.5">
          <div class="font-bold text-slate-900 dark:text-white flex items-center text-xs">
            <i data-lucide="book-open" class="w-4 h-4 mr-1.5 text-blue-600"></i>
            CĂN CỨ PHÁP LÝ ATBX
          </div>
          <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            Áp dụng kiểm định định kỳ 1 năm theo <strong class="text-slate-900 dark:text-white">Thông tư 23/TT-BKHCN</strong>; gia hạn giấy phép bức xạ trước 45 ngày theo <strong class="text-slate-900 dark:text-white">Nghị định 142/2020/NĐ-CP</strong>; đào tạo lại nhân viên 3 năm/lần theo <strong class="text-slate-900 dark:text-white">Thông tư 02/2022/TT-BKHCN</strong>.
          </p>
        </div>

      </div>
    `;
  }

  renderRadiationTrainingSubTab() {
    return `
      <div class="space-y-3 animate-fadeIn">
        <div class="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 rounded-2xl p-3.5 flex items-start space-x-3 text-xs">
          <i data-lucide="info" class="w-5 h-5 text-indigo-600 shrink-0 mt-0.5"></i>
          <div class="space-y-1">
            <div class="font-bold text-indigo-900 dark:text-indigo-200">Quy định Đào tạo An toàn bức xạ (Thông tư 02/2022/TT-BKHCN)</div>
            <div class="text-[11px] text-indigo-700 dark:text-indigo-300 leading-relaxed">
              Nhân viên bức xạ và Người phụ trách an toàn của BV Vĩnh Phúc VPI bắt buộc tham gia khóa bồi dưỡng định kỳ <strong>03 năm/lần</strong>.
            </div>
          </div>
        </div>

        <div class="space-y-2.5">
          ${this.data.staff.map(member => `
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
              <div class="flex items-start justify-between">
                <div>
                  <div class="flex items-center space-x-2">
                    <span class="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">${member.name}</span>
                    <span class="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md font-mono">${member.code}</span>
                  </div>
                  <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    ${member.role} • C/C: <span class="font-semibold text-slate-700 dark:text-slate-300">${member.radiationCert}</span>
                  </div>
                </div>
                <div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    member.daysLeft <= 30 ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 animate-pulse' :
                    member.daysLeft <= 90 ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                    'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  }">
                    ${member.daysLeft <= 30 ? `Còn ${member.daysLeft} ngày (Hết hạn)` : `Còn ${member.daysLeft} ngày`}
                  </span>
                </div>
              </div>

              <div class="pt-2 border-t border-slate-100 dark:border-slate-700/60 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span class="text-slate-400">Thời hạn:</span>
                  <span class="font-semibold text-slate-700 dark:text-slate-300 ml-1">${member.certDate} → ${member.certExpiry}</span>
                </div>
                <div class="text-right">
                  <span class="text-slate-400">Liều TLD Q3/2026:</span>
                  <span class="font-bold text-blue-600 dark:text-blue-400 ml-1">${member.tldDosimeterQ3}</span>
                </div>
              </div>

              ${member.daysLeft <= 30 ? `
                <div class="pt-1">
                  <button onclick="radOpsApp.openTrainingRegisterModal('${member.id}')" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 rounded-xl text-xs flex items-center justify-center space-x-1 transition">
                    <i data-lucide="send" class="w-3.5 h-3.5"></i>
                    <span>Lập danh sách gửi Sở KH&CN đào tạo lại</span>
                  </button>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  // ==========================================
  // TAB 2: THIẾT BỊ (EQUIPMENT DIRECTORY)
  // ==========================================
  renderEquipmentTab() {
    const devices = this.getFilteredDevices();
    const currentRole = this.getCurrentUserRole();

    return `
      <div class="space-y-3.5 animate-fadeIn">
        
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-extrabold text-slate-900 dark:text-white">Danh mục Thiết bị BV VPI</h2>
            <div class="text-xs text-slate-500 dark:text-slate-400">Hiển thị ${devices.length} / ${this.data.devices.length} máy đang vận hành</div>
          </div>
          ${currentRole.canManageDevices ? `
            <button onclick="radOpsApp.openNewDeviceModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 shadow-xs transition">
              <i data-lucide="plus" class="w-4 h-4"></i>
              <span>Thêm máy</span>
            </button>
          ` : `
            <span class="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">Chế độ xem</span>
          `}
        </div>

        <!-- Filter Chips -->
        <div class="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          <button onclick="radOpsApp.setDeviceFilter('all')" class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${this.deviceFilterCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}">
            Tất cả (${this.data.devices.length})
          </button>
          <button onclick="radOpsApp.setDeviceFilter('Bức xạ')" class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${this.deviceFilterCategory === 'Bức xạ' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}">
            ⚡ Phát bức xạ X-ray (${this.data.devices.filter(d => d.category === 'Bức xạ').length})
          </button>
          <button onclick="radOpsApp.setDeviceFilter('Không bức xạ')" class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${this.deviceFilterCategory === 'Không bức xạ' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}">
            🩺 Siêu âm & PACS (${this.data.devices.filter(d => d.category === 'Không bức xạ').length})
          </button>
          <button onclick="radOpsApp.setDeviceFilter('Từ trường')" class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${this.deviceFilterCategory === 'Từ trường' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}">
            🧲 CHT MRI (${this.data.devices.filter(d => d.category === 'Từ trường').length})
          </button>
          <button onclick="radOpsApp.setDeviceFilter('Đo lường')" class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${this.deviceFilterCategory === 'Đo lường' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}">
            💉 Bơm tiêm / Đo lường (${this.data.devices.filter(d => d.category === 'Đo lường').length})
          </button>
        </div>

        <!-- Danh sách Card Thiết Bị -->
        <div class="space-y-3">
          ${devices.map(dev => `
            <div onclick="radOpsApp.openDeviceDetailModal('${dev.id}')" class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition cursor-pointer space-y-3">
              <div class="flex items-start justify-between">
                <div class="flex items-start space-x-3">
                  <div class="w-10 h-10 rounded-xl ${
                    dev.category === 'Bức xạ' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400' :
                    dev.category === 'Từ trường' ? 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400' :
                    'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                  } flex items-center justify-center font-black shrink-0">
                    <i data-lucide="${
                      dev.category === 'Bức xạ' ? 'zap' :
                      dev.category === 'Từ trường' ? 'magnet' :
                      dev.category === 'Đo lường' ? 'gauge' : 'activity'
                    }" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <div class="flex items-center space-x-1.5">
                      <span class="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">${dev.name}</span>
                      <span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        dev.status === 'warning' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        dev.status === 'danger' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' :
                        'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      }">
                        ${dev.status === 'warning' ? 'Cần xử lý' : 'Đang hoạt động'}
                      </span>
                    </div>
                    <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      ${dev.manufacturer} (${dev.country}) • Model: <strong class="text-slate-700 dark:text-slate-200">${dev.model}</strong>
                    </div>
                  </div>
                </div>
                
                <span class="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                  ${dev.code}
                </span>
              </div>

              <div class="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-100 dark:border-slate-700/60">
                <div>
                  <span class="text-slate-400">Vị trí:</span>
                  <span class="font-semibold text-slate-700 dark:text-slate-300 ml-1">${dev.room}</span>
                </div>
                <div class="text-right">
                  <span class="text-slate-400">Phụ trách:</span>
                  <span class="font-semibold text-slate-700 dark:text-slate-300 ml-1">${dev.personInCharge}</span>
                </div>
              </div>

              ${dev.category === 'Bức xạ' ? `
                <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-2 text-[10px] flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span>GP Bức xạ: <strong>${dev.licenseDaysLeft <= 45 ? `<span class="text-red-600 font-bold">Còn ${dev.licenseDaysLeft} ngày (NĐ 142)</span>` : `Còn ${dev.licenseDaysLeft} ngày`}</strong></span>
                  <span>Kiểm định: <strong>${dev.inspectionDaysLeft <= 30 ? `<span class="text-amber-600 font-bold">Còn ${dev.inspectionDaysLeft} ngày</span>` : `Hạn ${dev.inspectionExpiry}`}</strong></span>
                </div>
              ` : ''}

            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  // ==========================================
  // TAB 3: BẢO TRÌ & SỰ CỐ (MAINTENANCE)
  // ==========================================
  renderMaintenanceTab() {
    return `
      <div class="space-y-3.5 animate-fadeIn">
        
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-extrabold text-slate-900 dark:text-white">Bảo trì & Phiếu báo hỏng BV VPI</h2>
            <div class="text-xs text-slate-500 dark:text-slate-400">Nhật ký xử lý kỹ thuật & Lịch bảo dưỡng PM hãng</div>
          </div>
          <button onclick="radOpsApp.openNewWorkOrderModal()" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 shadow-xs transition">
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Báo hỏng máy</span>
          </button>
        </div>

        <div class="grid grid-cols-3 gap-2 text-center">
          <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div class="text-lg font-black text-slate-900 dark:text-white">14/14</div>
            <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Máy khả dụng (100%)</div>
          </div>
          <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div class="text-lg font-black text-amber-600">01</div>
            <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Đang bảo trì PM</div>
          </div>
          <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div class="text-lg font-black text-emerald-600">03</div>
            <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Đã xử lý xong</div>
          </div>
        </div>

        <div class="space-y-3">
          ${this.data.maintenanceLogs.map(log => `
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2.5">
              <div class="flex items-start justify-between">
                <div>
                  <div class="flex items-center space-x-2">
                    <span class="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400">${log.ticketCode}</span>
                    <span class="text-xs font-bold text-slate-900 dark:text-white">${log.deviceName}</span>
                  </div>
                  <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">${log.room} • Báo ngày: ${log.dateReported}</div>
                </div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  log.status === 'completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                  log.status === 'in_progress' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                  'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                }">
                  ${log.status === 'completed' ? 'Đã nghiệm thu' : log.status === 'in_progress' ? 'Đang thực hiện' : 'Chờ xử lý'}
                </span>
              </div>

              <div class="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl space-y-1">
                <div><strong>Nội dung:</strong> ${log.symptom}</div>
                ${log.solution ? `<div><strong class="text-emerald-600 dark:text-emerald-400">Kết quả:</strong> ${log.solution}</div>` : ''}
              </div>

              <div class="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                <span>Người báo: <strong>${log.reportedBy}</strong></span>
                <span>Thực hiện: <strong>${log.technician}</strong></span>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  // ==========================================
  // TAB 5: PHÒNG BAN & KIỂM XẠ MÔI TRƯỜNG
  // ==========================================
  renderRoomsTab() {
    return `
      <div class="space-y-3.5 animate-fadeIn">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-extrabold text-slate-900 dark:text-white">Phòng máy & Kiểm xạ môi trường</h2>
            <div class="text-xs text-slate-500 dark:text-slate-400">Che chắn chì, liều phông, nhiệt độ phòng máy tại BV VPI</div>
          </div>
        </div>

        <div class="space-y-3">
          ${this.data.rooms.map(room => `
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2.5">
              <div class="flex items-start justify-between">
                <div>
                  <div class="font-extrabold text-slate-900 dark:text-white text-sm">${room.name}</div>
                  <div class="text-xs text-slate-500 dark:text-slate-400">${room.floor} • Phụ trách: <strong>${room.inCharge}</strong></div>
                </div>
                <span class="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  ${room.tcvnStatus}
                </span>
              </div>

              <div class="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl space-y-1">
                <div>🛡 <strong>Che chắn an toàn:</strong> ${room.shieldingPb}</div>
                <div>📊 <strong>Liều lọt ngoài phòng:</strong> <span class="font-bold text-blue-600 dark:text-blue-400">${room.backgroundDose}</span></div>
                <div class="flex items-center space-x-4 pt-0.5 text-slate-500 dark:text-slate-400">
                  <span>🌡 Nhiệt độ: <strong>${room.temperature}</strong></span>
                  <span>💧 Độ ẩm: <strong>${room.humidity}</strong></span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ==========================================
  // TAB 6: NHÂN SỰ & PHÂN QUYỀN TRUY CẬP NGOẠI VIỆN (RBAC)
  // ==========================================
  renderStaffTab() {
    const currentRole = this.getCurrentUserRole();

    return `
      <div class="space-y-3.5 animate-fadeIn">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-extrabold text-slate-900 dark:text-white">Nhân sự & Phân quyền Ngoại viện</h2>
            <div class="text-xs text-slate-500 dark:text-slate-400">${this.data.staff.length} Nhân sự Khoa CĐHA BV VPI (Kèm phân quyền)</div>
          </div>
          <button onclick="radOpsApp.openRemoteAccessGuideModal()" class="bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 border border-blue-200 dark:border-blue-800 transition">
            <i data-lucide="help-circle" class="w-4 h-4"></i>
            <span>Hướng dẫn Ngoại viện</span>
          </button>
        </div>

        <!-- Banner cảnh báo chế độ phân quyền -->
        <div class="bg-slate-900 text-white rounded-2xl p-3.5 border border-slate-800 text-xs space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-bold text-blue-400 flex items-center">
              <i data-lucide="shield-check" class="w-4 h-4 mr-1 text-blue-400"></i>
              BẢO MẬT & TRUY CẬP TỪ XA NGOẠI VIỆN (REMOTE ACCESS)
            </span>
            <span class="bg-blue-600/40 text-blue-300 text-[10px] px-2 py-0.5 rounded font-mono">RBAC v4</span>
          </div>
          <p class="text-[11px] text-slate-300 leading-relaxed">
            Chỉ những nhân sự được <strong>bật công tắc Ngoại viện</strong> mới có thể đăng nhập từ điện thoại cá nhân (4G) hoặc máy tính ở nhà. Bác sĩ & KTV Trưởng có toàn quyền cấp/hủy quyền tức thì.
          </p>
        </div>

        <div class="space-y-3">
          ${this.data.staff.map(member => {
            const roleInfo = this.data.auth.roles[member.roleKey] || this.data.auth.roles.technician;
            return `
              <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-3">
                <div class="flex items-start justify-between">
                  <div class="flex items-start space-x-3">
                    <div class="w-10 h-10 rounded-full ${
                      member.isSafetyOfficer ? 'bg-blue-600 text-white' :
                      member.roleKey === 'doctor' ? 'bg-emerald-600 text-white' :
                      member.roleKey === 'auditor' ? 'bg-purple-600 text-white' :
                      member.roleKey === 'nurse' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300' :
                      'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    } flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      ${member.name.split(' ').slice(-1)[0][0]}
                    </div>
                    <div>
                      <div class="flex items-center space-x-1.5">
                        <span class="font-bold text-slate-900 dark:text-white text-sm">${member.name}</span>
                        <span class="font-mono text-[10px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.2 rounded text-slate-500">${member.code}</span>
                      </div>
                      <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${member.role}</div>
                      <div class="text-[10px] text-blue-600 dark:text-blue-400 font-medium mt-0.5">${roleInfo.title}</div>
                    </div>
                  </div>

                  <!-- Nút Toggle Quyền Ngoại Viện -->
                  <div class="text-right">
                    <label class="inline-flex items-center cursor-pointer">
                      <input type="checkbox" onchange="radOpsApp.toggleExternalAccess('${member.id}')" ${member.allowExternalAccess ? 'checked' : ''} ${!currentRole.canManagePermissions ? 'disabled' : ''} class="sr-only peer">
                      <div class="relative w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    <div class="text-[10px] font-bold ${member.allowExternalAccess ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'} mt-0.5">
                      ${member.allowExternalAccess ? '✓ Ngoại viện: BẬT' : '✕ Ngoại viện: KHÓA'}
                    </div>
                  </div>
                </div>

                <!-- Thông số phân quyền & Đăng nhập từ xa -->
                <div class="pt-2 border-t border-slate-100 dark:border-slate-700/60 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span class="text-slate-400 text-[11px]">Chứng chỉ:</span>
                    <div class="font-semibold text-slate-700 dark:text-slate-300 text-[11px] truncate">${member.radiationCert}</div>
                  </div>
                  <div class="text-right">
                    <span class="text-slate-400 text-[11px]">Đăng nhập gần nhất:</span>
                    <div class="font-medium text-slate-600 dark:text-slate-400 text-[11px]">${member.lastExternalLogin || 'Chưa đăng nhập'}</div>
                  </div>
                </div>

                <!-- Nút Đăng nhập Thử nghiệm vào tài khoản này -->
                <div class="flex items-center space-x-2 pt-1">
                  <button onclick="radOpsApp.openPinLoginModal('${member.id}')" class="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-700 dark:text-slate-200 hover:text-blue-600 font-bold py-1.5 px-3 rounded-xl text-[11px] transition flex items-center justify-center space-x-1">
                    <i data-lucide="log-in" class="w-3.5 h-3.5"></i>
                    <span>Đăng nhập tài khoản này</span>
                  </button>
                  <button onclick="radOpsApp.openUserQRTokenModal('${member.id}')" title="Mã QR đăng nhập trên điện thoại KTV" class="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition">
                    <i data-lucide="qr-code" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // ==========================================
  // TAB 7: CÀI ĐẶT & HỆ THỐNG (SETTINGS)
  // ==========================================
  renderSettingsTab() {
    const isExternal = this.data.auth.locationMode === 'external';

    return `
      <div class="space-y-3.5 animate-fadeIn">
        <h2 class="text-base font-extrabold text-slate-900 dark:text-white">Cài đặt & Quản trị Hệ thống</h2>

        <!-- Khung Cấu hình Truy cập Ngoại Viện -->
        <div class="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-4 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <span class="font-bold text-sm flex items-center">
              <i data-lucide="globe" class="w-4 h-4 mr-1.5 text-blue-300"></i>
              Cấu hình Truy cập Ngoại Viện (Remote Gateway)
            </span>
            <span class="bg-blue-500/30 text-blue-200 text-[10px] px-2 py-0.5 rounded-full font-bold">VPI Cloud</span>
          </div>
          <p class="text-xs text-blue-100 leading-relaxed">
            Hệ thống hỗ trợ nhân viên mở app từ xa bằng điện thoại cá nhân (4G) hoặc máy tính tại nhà qua mạng Internet với bảo mật 2 lớp.
          </p>
          <div class="flex items-center space-x-2 pt-1">
            <button onclick="radOpsApp.openRemoteAccessGuideModal()" class="flex-1 bg-white text-blue-900 hover:bg-blue-50 font-bold py-2 rounded-xl text-xs transition flex items-center justify-center space-x-1 shadow-xs">
              <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
              <span>Xem hướng dẫn kết nối Ngoại viện</span>
            </button>
            <button onclick="radOpsApp.toggleLocationMode()" class="bg-blue-700/80 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-xl text-xs transition">
              ${isExternal ? 'Chuyển về Nội viện' : 'Bật chế độ Ngoại viện'}
            </button>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-4">
          <div class="font-bold text-sm text-slate-900 dark:text-white">Thông tin Bệnh viện Quốc tế Vĩnh Phúc (VPI)</div>
          
          <div class="space-y-3 text-xs">
            <div>
              <label class="block text-slate-500 mb-1">Tên Bệnh viện</label>
              <input type="text" id="setting-hospital-name" value="${this.data.hospital.name}" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-500 mb-1">Tên pháp nhân công ty</label>
              <input type="text" id="setting-hospital-legal" value="${this.data.hospital.legalName}" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-900 dark:text-white">
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-slate-500 mb-1">Phụ trách Khoa CĐHA</label>
                <input type="text" id="setting-head-name" value="${this.data.hospital.headOfDept}" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
              </div>
              <div>
                <label class="block text-slate-500 mb-1">KTV Trưởng & Phụ trách ATBX</label>
                <input type="text" id="setting-officer-name" value="${this.data.hospital.officer}" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
              </div>
            </div>
            <button onclick="radOpsApp.saveHospitalSettings()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl transition">
              Lưu thay đổi
            </button>
          </div>
        </div>

        <!-- Chế độ hiển thị Mobile Frame / Desktop Full -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
          <div class="font-bold text-sm text-slate-900 dark:text-white">Chế độ giao diện (Dual View Mode)</div>
          <div class="flex items-center justify-between">
            <div>
              <div class="font-semibold text-slate-800 dark:text-slate-200">Giả lập khung Smartphone</div>
              <div class="text-slate-400 text-[11px]">Xem ứng dụng như trên điện thoại KTV</div>
            </div>
            <button onclick="radOpsApp.toggleViewMode()" class="px-3 py-1.5 rounded-xl font-bold border transition ${this.isMobileFrame ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300'}">
              ${this.isMobileFrame ? 'Đang bật khung Mobile' : 'Mở rộng toàn màn hình'}
            </button>
          </div>
        </div>

        <!-- Đồng bộ Đa Thiết bị & Giám sát An toàn Ngoại viện -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
          <div class="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
            <span>Đồng bộ Đa Thiết bị & Giám sát An toàn</span>
            <span class="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">Cloud Ready</span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
            Đồng bộ dữ liệu thời gian thực giữa máy tính bệnh viện và điện thoại nhân viên ngoài viện. Giám sát các phiên truy cập 4G/Internet.
          </p>
          <div class="grid grid-cols-2 gap-2 pt-1">
            <button onclick="radOpsApp.openCloudSyncModal()" class="bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-bold py-2.5 px-3 rounded-xl transition flex items-center justify-center space-x-1.5 border border-blue-200 dark:border-blue-800">
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
              <span>Đồng bộ Đám mây (QR)</span>
            </button>
            <button onclick="radOpsApp.openAuditLogModal()" class="bg-purple-50 dark:bg-purple-900/40 hover:bg-purple-100 text-purple-700 dark:text-purple-300 font-bold py-2.5 px-3 rounded-xl transition flex items-center justify-center space-x-1.5 border border-purple-200 dark:border-purple-800">
              <i data-lucide="shield-alert" class="w-3.5 h-3.5"></i>
              <span>Nhật ký Ngoại viện</span>
            </button>
          </div>
        </div>

        <!-- Sao lưu & Phục hồi dữ liệu -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
          <div class="font-bold text-sm text-slate-900 dark:text-white">Sao lưu & Quản lý dữ liệu JSON</div>
          <div class="grid grid-cols-3 gap-2">
            <button onclick="radOpsApp.exportDataJSON()" class="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold py-2 rounded-xl transition text-center flex items-center justify-center space-x-1">
              <i data-lucide="download" class="w-3 h-3"></i>
              <span>Xuất JSON</span>
            </button>
            <button onclick="radOpsApp.triggerImportJSON()" class="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold py-2 rounded-xl transition text-center flex items-center justify-center space-x-1">
              <i data-lucide="upload" class="w-3 h-3"></i>
              <span>Nhập JSON</span>
            </button>
            <button onclick="radOpsApp.resetData()" class="bg-red-50 dark:bg-red-950/60 hover:bg-red-100 text-red-600 dark:text-red-400 font-bold py-2 rounded-xl transition text-center">
              Khôi phục mẫu
            </button>
          </div>
        </div>

      </div>
    `;
  }

  // ==========================================
  // BOTTOM NAVIGATION BAR
  // ==========================================
  renderBottomNav() {
    const tabs = [
      { id: 'overview', label: 'Tổng quan', icon: 'layout-grid' },
      { id: 'equipment', label: 'Thiết bị', icon: 'zap' },
      { id: 'maintenance', label: 'Bảo trì', icon: 'wrench' },
      { id: 'radiation', label: 'ATBX', icon: 'shield' },
      { id: 'staff', label: 'Nhân sự', icon: 'users' }
    ];

    return `
      <nav class="fixed bottom-0 left-0 right-0 max-w-[440px] mx-auto bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 py-1.5 px-2 z-40 shadow-lg">
        <div class="grid grid-cols-5 gap-1">
          ${tabs.map(tab => {
            const isActive = this.currentTab === tab.id;
            return `
              <button onclick="radOpsApp.switchTab('${tab.id}')" class="flex flex-col items-center justify-center py-1 rounded-xl transition ${
                isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800'
              }">
                <div class="relative">
                  <i data-lucide="${tab.icon}" class="w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}"></i>
                  ${tab.id === 'radiation' ? '<span class="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-600"></span>' : ''}
                </div>
                <span class="text-[10px] mt-0.5 tracking-tight">${tab.label}</span>
              </button>
            `;
          }).join('')}
        </div>
      </nav>
    `;
  }

  // ==========================================
  // MODALS & DIALOG HANDLERS
  // ==========================================

  // Modal Đăng nhập / Chuyển tài khoản & Phân quyền
  openLoginSwitchModal() {
    const currentUser = this.getCurrentUser();
    const isExternal = this.data.auth.locationMode === 'external';

    this.showModal(`
      <div class="p-5 space-y-4">
        <div class="flex items-start justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">XÁC THỰC & PHÂN QUYỀN</span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Đăng nhập Nhân viên BV VPI</h3>
            <div class="text-xs text-slate-500">Chế độ hiện tại: <strong>${isExternal ? '🌐 Ngoại viện (4G/Internet)' : '🏢 Nội viện (Mạng LAN)'}</strong></div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <div class="font-bold text-slate-800 dark:text-slate-200">Chọn nhanh nhân sự để kiểm tra quyền hạn:</div>
          <div class="max-h-60 overflow-y-auto space-y-1.5 pr-1">
            ${this.data.staff.map(member => {
              const isSelected = member.id === currentUser.id;
              const roleInfo = this.data.auth.roles[member.roleKey] || {};
              return `
                <div onclick="radOpsApp.openPinLoginModal('${member.id}')" class="p-2.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  isSelected ? 'bg-blue-50 dark:bg-blue-900/40 border-blue-400' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }">
                  <div>
                    <div class="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                      <span>${member.name}</span>
                      <span class="text-[10px] bg-slate-100 dark:bg-slate-700 px-1 rounded font-mono">${member.code}</span>
                      ${isSelected ? '<span class="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold">Hiện tại</span>' : ''}
                    </div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">${member.role}</div>
                  </div>
                  <div class="text-right">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      member.allowExternalAccess ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-700'
                    }">
                      ${member.allowExternalAccess ? '🌐 Ngoại viện' : '🏢 Nội viện'}
                    </span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2 pt-1">
          <button onclick="radOpsApp.closeModal(); radOpsApp.openAuditLogModal()" class="bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 text-purple-700 dark:text-purple-300 font-bold py-2 rounded-xl text-xs transition flex items-center justify-center space-x-1">
            <i data-lucide="shield-alert" class="w-3.5 h-3.5"></i>
            <span>Nhật ký Ngoại viện</span>
          </button>
          <button onclick="radOpsApp.closeModal(); radOpsApp.openCloudSyncModal()" class="bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 font-bold py-2 rounded-xl text-xs transition flex items-center justify-center space-x-1">
            <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
            <span>Đồng bộ Đám mây</span>
          </button>
          <button onclick="radOpsApp.closeModal(); radOpsApp.switchTab('staff')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs transition">
            Quản lý Bảng Phân Quyền
          </button>
          <button onclick="radOpsApp.closeModal(); radOpsApp.openRemoteAccessGuideModal()" class="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-2 rounded-xl text-xs transition">
            Hướng dẫn Ngoại viện
          </button>
        </div>
      </div>
    `);
  }

  // Modal Hướng dẫn Truy cập Ngoại Viện chi tiết
  openRemoteAccessGuideModal() {
    this.showModal(`
      <div class="p-5 space-y-4">
        <div class="flex items-start justify-between">
          <div>
            <span class="bg-blue-100 text-blue-700 dark:bg-blue-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
              HƯỚNG DẪN KỸ THUẬT VPI
            </span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">Cách Mở App Truy Cập Ngoại Viện</h3>
            <div class="text-xs text-slate-500">Cho nhân viên Khoa CĐHA đăng nhập từ điện thoại / ngoài viện</div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="space-y-3 text-xs leading-relaxed">
          
          <!-- Cách 1: Chạy máy chủ mạng LAN / Wi-Fi viện -->
          <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div class="font-bold text-slate-900 dark:text-white flex items-center text-xs">
              <span class="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] flex items-center justify-center mr-2">1</span>
              Truy cập bằng Điện thoại qua Wi-Fi Bệnh viện (Nội viện & Khuôn viên)
            </div>
            <p class="text-slate-600 dark:text-slate-300 text-[11px]">
              Trong thư mục app đã có sẵn file <strong>serve-lan.bat</strong>. Chỉ cần nhấp đúp chuột vào file này:
            </p>
            <div class="bg-slate-800 text-emerald-400 p-2 rounded-xl font-mono text-[11px]">
              ==&gt; Mở trình duyệt điện thoại gõ: http://[IP_MAY_TINH]:8080
            </div>
            <p class="text-[10px] text-slate-400">
              *Tất cả KTV và Bác sĩ bắt sóng Wi-Fi bệnh viện đều mở được app ngay trên smartphone cá nhân.
            </p>
          </div>

          <!-- Cách 2: Triển khai Cloud Hosting Vercel / Netlify (Miễn phí 100% - Ngoại viện thực tế) -->
          <div class="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 space-y-1.5">
            <div class="font-bold text-blue-900 dark:text-blue-200 flex items-center text-xs">
              <span class="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center mr-2">2</span>
              Triển khai Cloud Vercel / Cloudflare (Truy cập Ngoại viện 4G toàn quốc)
            </div>
            <p class="text-slate-600 dark:text-slate-300 text-[11px]">
              Giống như đề án Bảng kiểm MRI của BV VPI (đã chạy trên <em>vercel.app</em>), toàn bộ source code của app là HTML/JS tĩnh, có thể đưa lên Vercel chỉ mất <strong>1 phút</strong>:
            </p>
            <div class="bg-slate-800 text-blue-300 p-2 rounded-xl font-mono text-[11px]">
              Link demo: https://radops-cdha-vpi.vercel.app
            </div>
            <p class="text-[10px] text-slate-500 dark:text-slate-400">
              *Nhân viên ở nhà, đi công tác hoặc trực ngoại viện mở bằng 4G bất kỳ lúc nào với tên miền an toàn HTTPS.
            </p>
          </div>

          <!-- Cách 3: Phân quyền & Mã PIN -->
          <div class="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 space-y-1.5">
            <div class="font-bold text-amber-900 dark:text-amber-200 flex items-center text-xs">
              <span class="w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] flex items-center justify-center mr-2">3</span>
              Kiểm soát phân quyền & Khóa truy cập trái phép
            </div>
            <p class="text-slate-600 dark:text-slate-300 text-[11px]">
              - Nhân sự nào bị <strong>TẮT công tắc Ngoại viện</strong> trong Tab Nhân sự sẽ bị hệ thống từ chối đăng nhập khi đang ở ngoài bệnh viện.<br>
              - Mỗi nhân sự có Mã NV riêng (VD: <code class="font-bold text-blue-600">BV-345</code> - Vũ Bá Đạt) và mã PIN 4 số bảo mật y tế.
            </p>
          </div>

        </div>

        <button onclick="radOpsApp.closeModal()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition text-xs">
          Đã hiểu, quay lại giao diện
        </button>
      </div>
    `);
  }

  // Modal hiển thị mã QR Đăng nhập cá nhân KTV
  openUserQRTokenModal(staffId) {
    const member = this.data.staff.find(s => s.id === staffId);
    if (!member) return;

    this.showModal(`
      <div class="p-5 space-y-4 text-center">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Mã QR Đăng Nhập Ngoại Viện</h3>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-2">
          <div class="w-36 h-36 mx-auto bg-white p-2 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=RADOPS_VPI_AUTH_${member.code}_PIN_${member.pin}" alt="QR Login" class="w-full h-full" onerror="this.src=''; this.alt='MÃ QR: ${member.code}'">
          </div>
          <div class="font-bold text-slate-900 dark:text-white text-sm">${member.name}</div>
          <div class="text-xs text-slate-500 font-mono">Mã NV: ${member.code} | PIN: ****</div>
          <div class="text-[11px] text-slate-400">KTV dùng camera điện thoại quét mã này để tự động đăng nhập ngoại viện không cần gõ mật khẩu</div>
        </div>

        <div class="text-xs ${member.allowExternalAccess ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}">
          ${member.allowExternalAccess ? '✓ Tài khoản đang được BẬT quyền truy cập ngoại viện' : '⚠️ Tài khoản đang bị KHÓA quyền ngoại viện (Cần mở quyền)'}
        </div>
      </div>
    `);
  }

  // 1. Modal Chi tiết Thiết bị & QR Code
  openDeviceDetailModal(deviceId) {
    const dev = this.data.devices.find(d => d.id === deviceId);
    if (!dev) return;

    this.showModal(`
      <div class="p-5 space-y-4">
        <div class="flex items-start justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">${dev.code}</span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white">${dev.name}</h3>
            <div class="text-xs text-slate-500">${dev.manufacturer} (${dev.country}) • Model: ${dev.model}</div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-2">
          <div class="w-32 h-32 mx-auto bg-white p-2 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=VPI_RADOPS_${dev.code}_${encodeURIComponent(dev.name)}" alt="QR Code" class="w-full h-full" onerror="this.src=''; this.alt='MÃ QR: ${dev.code}'">
          </div>
          <div class="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">VPI ID: ${dev.code} | Serial: ${dev.serialNumber}</div>
          <div class="text-[11px] text-slate-400">Dán trực tiếp trên thân máy tại ${dev.room} để KTV quét xem hồ sơ & báo hỏng</div>
        </div>

        <div class="space-y-2 text-xs">
          <div class="font-bold text-slate-900 dark:text-white">Thông số kỹ thuật & Pháp lý:</div>
          <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl divide-y divide-slate-100 dark:divide-slate-700/60">
            <div class="p-2.5 flex justify-between">
              <span class="text-slate-500">Phòng lắp đặt:</span>
              <span class="font-semibold text-slate-800 dark:text-slate-200">${dev.room}</span>
            </div>
            <div class="p-2.5 flex justify-between">
              <span class="text-slate-500">KTV phụ trách:</span>
              <span class="font-semibold text-slate-800 dark:text-slate-200">${dev.personInCharge} (${dev.phone})</span>
            </div>
            <div class="p-2.5 flex justify-between">
              <span class="text-slate-500">Giấy phép bức xạ:</span>
              <span class="font-semibold text-slate-800 dark:text-slate-200">${dev.licenseNumber}</span>
            </div>
            <div class="p-2.5 flex justify-between">
              <span class="text-slate-500">Hạn GP / Còn lại:</span>
              <span class="font-bold text-red-600">${dev.licenseExpiry} (Còn ${dev.licenseDaysLeft} ngày)</span>
            </div>
            <div class="p-2.5 flex justify-between">
              <span class="text-slate-500">GCN Kiểm định TT 23:</span>
              <span class="font-semibold text-slate-800 dark:text-slate-200">${dev.inspectionNumber} (Hạn ${dev.inspectionExpiry})</span>
            </div>
            <div class="p-2.5">
              <span class="text-slate-500 block mb-1">Cấu hình chi tiết:</span>
              <span class="text-slate-700 dark:text-slate-300 leading-relaxed">${dev.specifications}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-2 pt-2">
          <button onclick="radOpsApp.openScheduleInspectionModal('${dev.id}')" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition">
            Đặt lịch kiểm định
          </button>
          <button onclick="radOpsApp.openNewWorkOrderModal('${dev.name}')" class="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition">
            Báo hỏng máy
          </button>
        </div>
      </div>
    `);
  }

  // 2. Modal Đặt lịch kiểm định
  openScheduleInspectionModal(deviceId) {
    const currentRole = this.getCurrentUserRole();
    if (!currentRole.canScheduleInspection) {
      alert('Chỉ KTV Trưởng (Vũ Bá Đạt) hoặc Lãnh đạo Khoa mới có quyền đặt lịch kiểm định chính thức!');
      return;
    }

    const dev = this.data.devices.find(d => d.id === deviceId) || this.data.devices[3];

    this.showModal(`
      <div class="p-5 space-y-4">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Đặt lịch kiểm định thiết bị</h3>
            <div class="text-xs text-slate-500">Áp dụng chu kỳ 1 năm theo Thông tư 23/TT-BKHCN</div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="space-y-3 text-xs">
          <div>
            <label class="block text-slate-500 mb-1">Thiết bị cần kiểm định</label>
            <input type="text" readonly value="${dev.name} (${dev.room})" class="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
          </div>

          <div>
            <label class="block text-slate-500 mb-1">Đơn vị kiểm định được Bộ KH&CN chỉ định</label>
            <select id="insp-center" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-800 dark:text-slate-200">
              <option value="vmi">Viện Đo lường Việt Nam (VMI)</option>
              <option value="quatest1">Trung tâm Kỹ thuật Tiêu chuẩn Đo lường Chất lượng 1 (QUATEST 1)</option>
              <option value="vinatom">Viện Năng lượng nguyên tử Việt Nam (VINATOM)</option>
              <option value="cskhcn">Trung tâm Ứng dụng Tiến bộ KH&CN Tỉnh Vĩnh Phúc</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-500 mb-1">Ngày dự kiến kiểm định</label>
              <input type="date" id="insp-date" value="2025-03-20" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-800 dark:text-slate-200">
            </div>
            <div>
              <label class="block text-slate-500 mb-1">Cán bộ phụ trách BV VPI</label>
              <input type="text" id="insp-contact" value="${this.data.hospital.officer} (${this.data.hospital.officerTitle})" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-800 dark:text-slate-200">
            </div>
          </div>

          <div>
            <label class="block text-slate-500 mb-1">Nội dung kiểm định theo Thông tư 23</label>
            <div class="p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
              <div>✓ Kiểm định an toàn liều phát & độ tuyến tính điện áp kVp, mAs</div>
              <div>✓ Kiểm tra trường chuẩn trực ánh sáng và tia X máy ${dev.name}</div>
              <div>✓ Đo kiểm xạ môi trường ngoài phòng chụp (≤ 0.12 µSv/h)</div>
            </div>
          </div>

          <button onclick="radOpsApp.submitScheduleInspection('${dev.id}')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition text-xs mt-2">
            Xác nhận đặt lịch & Xuất phiếu yêu cầu
          </button>
        </div>
      </div>
    `);
  }

  submitScheduleInspection(deviceId) {
    alert('Đã gửi thông tin đặt lịch kiểm định thành công! Hệ thống đã ghi nhận lịch làm việc.');
    this.closeModal();
    this.render();
  }

  // 3. Modal Soạn hồ sơ Cục ATBXHN (Nghị định 142/2020)
  openDossierModal(deviceId) {
    this.showModal(`
      <div class="p-5 space-y-4">
        <div class="flex items-start justify-between">
          <div>
            <span class="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Hạn nộp &lt; 45 ngày NĐ 142/2020
            </span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">Hồ sơ xin gia hạn GPBX máy CT (Cục ATBXHN)</h3>
            <div class="text-xs text-slate-500">Đơn vị: Bệnh viện Quốc tế Vĩnh Phúc (VPI)</div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <strong>Căn cứ Điều 28 Nghị định 142/2020/NĐ-CP:</strong> Bắt buộc nộp hồ sơ xin gia hạn trước khi giấy phép hết hạn <strong>ít nhất 45 ngày</strong>. Hiện tại còn <strong>42 ngày</strong> (đã vào hạn đỏ bắt buộc).
        </div>

        <div class="space-y-2 text-xs">
          <div class="font-bold text-slate-900 dark:text-white">Thành phần hồ sơ bắt buộc theo NĐ 142:</div>
          <div class="space-y-1.5">
            <label class="flex items-center space-x-2 p-2 bg-slate-50 dark:bg-slate-900 rounded-xl cursor-pointer">
              <input type="checkbox" checked class="rounded text-blue-600">
              <span>1. Đơn đề nghị gia hạn GPBX (Mẫu 02-PLII Nghị định 142/2020)</span>
            </label>
            <label class="flex items-center space-x-2 p-2 bg-slate-50 dark:bg-slate-900 rounded-xl cursor-pointer">
              <input type="checkbox" checked class="rounded text-blue-600">
              <span>2. Báo cáo đánh giá an toàn bức xạ BV VPI (Năm 2026)</span>
            </label>
            <label class="flex items-center space-x-2 p-2 bg-slate-50 dark:bg-slate-900 rounded-xl cursor-pointer">
              <input type="checkbox" checked class="rounded text-blue-600">
              <span>3. GCN kiểm định máy CT Somatom & Revolution ACT còn hiệu lực</span>
            </label>
            <label class="flex items-center space-x-2 p-2 bg-slate-50 dark:bg-slate-900 rounded-xl cursor-pointer">
              <input type="checkbox" checked class="rounded text-blue-600">
              <span>4. Chứng chỉ đào tạo ATBX: KTV. Vũ Bá Đạt & Nhân viên bức xạ</span>
            </label>
            <label class="flex items-center space-x-2 p-2 bg-slate-50 dark:bg-slate-900 rounded-xl cursor-pointer">
              <input type="checkbox" checked class="rounded text-blue-600">
              <span>5. Báo cáo kết quả đo liều kế cá nhân (TLD) các quý của BV VPI</span>
            </label>
            <label class="flex items-center space-x-2 p-2 bg-slate-50 dark:bg-slate-900 rounded-xl cursor-pointer">
              <input type="checkbox" checked class="rounded text-blue-600">
              <span>6. Biên bản đo kiểm xạ an toàn che chắn chì phòng CT (≤ 0.12 µSv/h)</span>
            </label>
          </div>
        </div>

        <div class="flex items-center space-x-2 pt-2">
          <button onclick="radOpsApp.exportDossierPackage()" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition">
            <i data-lucide="download" class="w-4 h-4"></i>
            <span>Tải bộ hồ sơ & Biểu mẫu NĐ 142 BV VPI</span>
          </button>
        </div>
      </div>
    `);
  }

  exportDossierPackage() {
    alert('Đang tạo gói hồ sơ và biểu mẫu xin gia hạn GPBX theo Nghị định 142/2020/NĐ-CP cho Bệnh viện Quốc tế Vĩnh Phúc (VPI)!');
    this.closeModal();
  }

  // 4. Modal Báo hỏng thiết bị khẩn cấp
  openNewWorkOrderModal(prefilledDeviceName = '') {
    this.showModal(`
      <div class="p-5 space-y-4">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Phiếu Báo hỏng Thiết bị Khẩn cấp</h3>
            <div class="text-xs text-slate-500">Gửi thông báo đến Phòng Vật tư - TTBYT VPI & Kỹ sư hãng</div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form onsubmit="radOpsApp.submitWorkOrder(event)" class="space-y-3 text-xs">
          <div>
            <label class="block text-slate-500 mb-1">Chọn thiết bị gặp sự cố</label>
            <select id="wo-device" required class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-800 dark:text-slate-200">
              ${this.data.devices.map(d => `
                <option value="${d.name}" ${prefilledDeviceName === d.name ? 'selected' : ''}>${d.name} (${d.room})</option>
              `).join('')}
            </select>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-500 mb-1">Mức độ ưu tiên</label>
              <select id="wo-priority" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-800 dark:text-slate-200">
                <option value="Khẩn cấp">🚨 Khẩn cấp (Dừng máy)</option>
                <option value="Cao">⚡ Cao (Chờ linh kiện)</option>
                <option value="Trung bình" selected>⚠️ Trung bình (Vẫn chụp được)</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-500 mb-1">Người phát hiện / Báo hỏng</label>
              <input type="text" id="wo-reporter" value="${this.getCurrentUser().name}" required class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-800 dark:text-slate-200">
            </div>
          </div>

          <div>
            <label class="block text-slate-500 mb-1">Mô tả triệu chứng lỗi / Mã Error Code trên máy</label>
            <textarea id="wo-symptom" rows="3" required placeholder="Ví dụ: Máy báo mã lỗi Tube Overheat; Màn hình đọc phim chớp nháy; Bàn chụp CT bị kẹt..." class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-normal text-slate-800 dark:text-slate-200"></textarea>
          </div>

          <button type="submit" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition text-xs">
            Gửi phiếu báo hỏng khẩn cấp
          </button>
        </form>
      </div>
    `);
  }

  submitWorkOrder(e) {
    e.preventDefault();
    const deviceName = document.getElementById('wo-device').value;
    const priority = document.getElementById('wo-priority').value;
    const reporter = document.getElementById('wo-reporter').value;
    const symptom = document.getElementById('wo-symptom').value;

    const newTicket = {
      id: 'BT-' + Date.now(),
      ticketCode: 'SC-VPI-' + Math.floor(100 + Math.random() * 900),
      deviceName: deviceName,
      room: 'Khoa Chẩn đoán hình ảnh VPI',
      reportedBy: reporter,
      dateReported: new Date().toISOString().split('T')[0],
      priority: priority,
      symptom: symptom,
      status: 'in_progress',
      technician: 'Kỹ sư TTBYT VPI: Đang tiếp nhận'
    };

    this.data.maintenanceLogs.unshift(newTicket);
    this.saveData();
    alert('Đã gửi phiếu báo hỏng thành công! Mã phiếu: ' + newTicket.ticketCode);
    this.closeModal();
    this.switchTab('maintenance');
  }

  openPrintReportModal() {
    window.print();
  }

  openQRScannerModal() {
    this.showModal(`
      <div class="p-5 space-y-4 text-center">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Quét mã QR Thân máy BV VPI</h3>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="relative w-64 h-64 mx-auto bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-dashed border-blue-500">
          <div class="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 bg-red-500 animate-pulse"></div>
          <div class="text-slate-400 text-xs px-4">
            <i data-lucide="camera" class="w-8 h-8 mx-auto mb-2 text-slate-500"></i>
            Hướng camera vào mã QR dán trên thân máy CT, MRI, X-quang Vikomed...
          </div>
        </div>

        <div class="text-xs text-slate-500">Hoặc chọn nhanh thiết bị để giả lập:</div>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <button onclick="radOpsApp.closeModal(); radOpsApp.openDeviceDetailModal('TB-01')" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50">
            CT Siemens Somatom (TB-01)
          </button>
          <button onclick="radOpsApp.closeModal(); radOpsApp.openDeviceDetailModal('TB-04')" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50">
            X-quang Vikomed (TB-04)
          </button>
        </div>
      </div>
    `);
  }

  openSearchModal() {
    this.showModal(`
      <div class="p-5 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Tìm kiếm thiết bị & Hồ sơ BV VPI</h3>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="relative">
          <input type="text" id="global-search-input" oninput="radOpsApp.executeLiveSearch(this.value)" placeholder="Nhập tên máy, mã số, phòng, nhân sự phụ trách..." class="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 pl-9 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-3.5"></i>
        </div>

        <div id="search-results" class="max-h-72 overflow-y-auto space-y-2 pt-1 text-xs">
          <div class="text-slate-400 text-center py-4 text-xs">Nhập từ khóa để tra cứu hồ sơ...</div>
        </div>
      </div>
    `);
    setTimeout(() => {
      const input = document.getElementById('global-search-input');
      if (input) input.focus();
    }, 100);
  }

  executeLiveSearch(query) {
    const container = document.getElementById('search-results');
    if (!container) return;
    const q = query.toLowerCase().trim();
    if (!q) {
      container.innerHTML = '<div class="text-slate-400 text-center py-4 text-xs">Nhập từ khóa để tra cứu hồ sơ...</div>';
      return;
    }

    const matches = this.data.devices.filter(d => 
      d.name.toLowerCase().includes(q) ||
      d.code.toLowerCase().includes(q) ||
      d.model.toLowerCase().includes(q) ||
      d.room.toLowerCase().includes(q) ||
      d.manufacturer.toLowerCase().includes(q) ||
      d.personInCharge.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      container.innerHTML = '<div class="text-slate-400 text-center py-4 text-xs">Không tìm thấy thiết bị phù hợp.</div>';
      return;
    }

    container.innerHTML = matches.map(d => `
      <div onclick="radOpsApp.closeModal(); radOpsApp.openDeviceDetailModal('${d.id}')" class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer flex items-center justify-between transition">
        <div>
          <div class="font-bold text-slate-900 dark:text-white">${d.name}</div>
          <div class="text-[11px] text-slate-500">${d.room} • Phụ trách: ${d.personInCharge}</div>
        </div>
        <span class="text-blue-600 dark:text-blue-400 font-mono text-xs font-bold">${d.code}</span>
      </div>
    `).join('');
  }

  openNotificationsModal() {
    this.showModal(`
      <div class="p-5 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Thông báo Khẩn cấp ATBX - BV VPI</h3>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="space-y-2.5 text-xs">
          <div class="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 space-y-1">
            <div class="font-bold text-red-700 dark:text-red-300">🚨 Hạn nộp hồ sơ GPBX máy CT Revolution ACT (Còn 42 ngày)</div>
            <div class="text-slate-600 dark:text-slate-300 text-[11px]">Nghị định 142/2020 yêu cầu nộp trước 45 ngày. KTV. Vũ Bá Đạt cần trình ký hồ sơ gửi Cục ATBXHN.</div>
          </div>
          <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 space-y-1">
            <div class="font-bold text-amber-800 dark:text-amber-300">⚠️ Kiểm định máy X-quang Vikomed (Còn 18 ngày)</div>
            <div class="text-slate-600 dark:text-slate-300 text-[11px]">Hạn kiểm định 28/03/2025 theo TT 23. Cần xác nhận ngày kiểm định với Viện Đo lường VMI.</div>
          </div>
          <div class="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900 space-y-1">
            <div class="font-bold text-indigo-800 dark:text-indigo-300">🎓 Hạn đào tạo lại ATBX KTV. Đào Tiến Dũng (Còn 28 ngày)</div>
            <div class="text-slate-600 dark:text-slate-300 text-[11px]">Chứng chỉ ATBX 3 năm sắp hết hạn theo Thông tư 02/2022/TT-BKHCN.</div>
          </div>
        </div>
      </div>
    `);
  }

  showModal(contentHtml) {
    const container = document.getElementById('modal-container');
    if (!container) return;

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        <div onclick="radOpsApp.closeModal()" class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity modal-overlay"></div>
        <div class="relative bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700 z-10 modal-content animate-scaleUp">
          ${contentHtml}
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  closeModal() {
    const container = document.getElementById('modal-container');
    if (container) {
      container.innerHTML = '';
    }
  }

  handleUrgentAction(actionUrl) {
    if (actionUrl === 'draft_dossier') {
      this.openDossierModal('TB-02');
    } else if (actionUrl === 'schedule_inspection') {
      this.openScheduleInspectionModal('TB-04');
    } else if (actionUrl === 'register_training') {
      this.switchTab('radiation');
      this.switchRadiationSubTab('training');
    }
  }

  saveHospitalSettings() {
    const hName = document.getElementById('setting-hospital-name').value;
    const hLegal = document.getElementById('setting-hospital-legal').value;
    const hHead = document.getElementById('setting-head-name').value;
    const oName = document.getElementById('setting-officer-name').value;
    if (hName) this.data.hospital.name = hName;
    if (hLegal) this.data.hospital.legalName = hLegal;
    if (hHead) this.data.hospital.headOfDept = hHead;
    if (oName) this.data.hospital.officer = oName;
    this.saveData();
    alert('Đã cập nhật thông tin Bệnh viện Quốc tế Vĩnh Phúc (VPI) thành công!');
    this.render();
  }

  exportDataJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `radops_vpi_data_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  bindGlobalEvents() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }
}

// Khởi chạy ứng dụng toàn cục
let radOpsApp;
document.addEventListener('DOMContentLoaded', () => {
  radOpsApp = new RadOpsApp();
  window.radOpsApp = radOpsApp;
});
