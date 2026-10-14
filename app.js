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
      // 1. BAN LÃNH ĐẠO & PHỤ TRÁCH KHOA
      truong_khoa: {
        id: 'truong_khoa',
        title: 'Trưởng khoa CĐHA',
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
        description: 'Toàn quyền lãnh đạo chuyên môn, phê duyệt báo cáo, quản trị thiết bị & nhân sự'
      },
      pho_khoa: {
        id: 'pho_khoa',
        title: 'Phó khoa CĐHA',
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
        description: 'Phó Trưởng khoa phụ trách điều hành chuyên môn và máy móc'
      },
      phu_trach_khoa: {
        id: 'phu_trach_khoa',
        title: 'Phụ trách khoa CĐHA',
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
        description: 'Bác sĩ phụ trách chung toàn diện Khoa Chẩn đoán hình ảnh BV VPI'
      },
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

      // 2. KHỐI BÁC SĨ CHẨN ĐOÁN HÌNH ẢNH
      bs_ckii: {
        id: 'bs_ckii',
        title: 'Bác sĩ CKII (BSCKII)',
        badgeColor: 'blue',
        canManageDevices: false,
        canManageLegal: false,
        canScheduleInspection: false,
        canManageStaff: false,
        canManagePermissions: false,
        canCreateTickets: true,
        canApproveTickets: true,
        canExportReport: true,
        allowExternal: true,
        description: 'Bác sĩ Chuyên khoa II phụ trách đọc phim chuyên sâu MRI/CT và can thiệp'
      },
      bs_thacsi: {
        id: 'bs_thacsi',
        title: 'Thạc sĩ - Bác sĩ (ThS.BS)',
        badgeColor: 'blue',
        canManageDevices: false,
        canManageLegal: false,
        canScheduleInspection: false,
        canManageStaff: false,
        canManagePermissions: false,
        canCreateTickets: true,
        canApproveTickets: true,
        canExportReport: true,
        allowExternal: true,
        description: 'Thạc sĩ Bác sĩ Chẩn đoán hình ảnh đọc phim và nghiên cứu khoa học'
      },
      bs_cki: {
        id: 'bs_cki',
        title: 'Bác sĩ CKI (BSCKI)',
        badgeColor: 'blue',
        canManageDevices: false,
        canManageLegal: false,
        canScheduleInspection: false,
        canManageStaff: false,
        canManagePermissions: false,
        canCreateTickets: true,
        canApproveTickets: true,
        canExportReport: true,
        allowExternal: true,
        description: 'Bác sĩ Chuyên khoa I đọc phim CT, MRI, X-quang và siêu âm chẩn đoán'
      },
      bs_coban: {
        id: 'bs_coban',
        title: 'Bác sĩ CĐHA cơ bản',
        badgeColor: 'blue',
        canManageDevices: false,
        canManageLegal: false,
        canScheduleInspection: false,
        canManageStaff: false,
        canManagePermissions: false,
        canCreateTickets: true,
        canApproveTickets: false,
        canExportReport: true,
        allowExternal: true,
        description: 'Bác sĩ đa khoa có chứng chỉ định hướng / CCHN Chẩn đoán hình ảnh'
      },

      // 3. KHỐI KỸ THUẬT VIÊN (KỸ THUẬT HÌNH ẢNH)
      ktv_daihoc: {
        id: 'ktv_daihoc',
        title: 'Cử nhân Đại học (KTV Đại học)',
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
        description: 'Kỹ thuật viên trình độ Đại học chuyên ngành Kỹ thuật Hình ảnh y học'
      },
      ktv_caodang: {
        id: 'ktv_caodang',
        title: 'Cử nhân Cao đẳng (KTV Cao đẳng)',
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
        description: 'Kỹ thuật viên trình độ Cao đẳng vận hành máy chụp CT, MRI, X-quang'
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

      // 4. KHỐI ĐIỀU DƯỠNG CĐHA
      dd_daihoc: {
        id: 'dd_daihoc',
        title: 'Điều dưỡng Đại học',
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
        description: 'Điều dưỡng Đại học phụ trách an toàn tiêm thuốc cản quang và chống sốc'
      },
      dd_caodang: {
        id: 'dd_caodang',
        title: 'Điều dưỡng Cao đẳng',
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
        description: 'Điều dưỡng Cao đẳng hỗ trợ phòng chụp CT/MRI và phòng siêu âm'
      },
      dd_trungcap: {
        id: 'dd_trungcap',
        title: 'Điều dưỡng Trung cấp',
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
        description: 'Điều dưỡng Trung cấp hướng dẫn người bệnh và chuẩn bị vật tư y tế'
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

      // 5. KHỐI HÀNH CHÍNH & GIÁM SÁT
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
      cchnNumber: '004128/VP-CCHN',
      cchnScope: 'Kỹ thuật hình ảnh y học (X-quang, CT, MRI)',
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
      cchnNumber: '001892/VP-CCHN',
      cchnScope: 'Khám bệnh, chữa bệnh Chẩn đoán hình ảnh',
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
      cchnNumber: '005614/VP-CCHN',
      cchnScope: 'Điều dưỡng Đa khoa & Tiêm thuốc tương phản',
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
      cchnNumber: '004652/VP-CCHN',
      cchnScope: 'Kỹ thuật hình ảnh y học (CT & X-quang)',
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
      cchnNumber: '003408/VP-CCHN',
      cchnScope: 'Kỹ thuật hình ảnh y học (MRI & CT)',
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
      cchnNumber: '004641/VP-CCHN',
      cchnScope: 'Kỹ thuật hình ảnh y học (X-quang KTS)',
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
      cchnNumber: '005403/VP-CCHN',
      cchnScope: 'Kỹ thuật hình ảnh y học',
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
      cchnNumber: '005759/VP-CCHN',
      cchnScope: 'Kỹ thuật hình ảnh y học (Cấp cứu & Di động)',
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
      cchnNumber: '002967/VP-CCHN',
      cchnScope: 'Kỹ thuật hình ảnh y học (Nhũ ảnh & DEXA)',
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
      cchnNumber: '001504/VP-CCHN',
      cchnScope: 'Kỹ thuật hình ảnh y học (Đo loãng xương DEXA)',
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
      cchnNumber: '003219/VP-CCHN',
      cchnScope: 'Điều dưỡng Đa khoa (Phòng Siêu âm)',
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
      cchnNumber: '002568/VP-CCHN',
      cchnScope: 'Điều dưỡng Đa khoa (Phòng Siêu âm)',
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
      cchnNumber: '002075/VP-CCHN',
      cchnScope: 'Điều dưỡng Đa khoa (Tiêm thuốc cản quang & Chống sốc)',
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
      cchnNumber: 'TKYK-2024-VPI',
      cchnScope: 'Thư ký Y khoa & Quản trị PACS/HIS',
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
      cchnNumber: 'TKYK-2024-02',
      cchnScope: 'Thư ký Y khoa & Đón tiếp bệnh nhân',
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
      cchnNumber: 'TTV-BKHCN-088',
      cchnScope: 'Thanh tra chuyên ngành Năng lượng nguyên tử & ATBX',
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
    
    this.initPwa();
    this.init();
  }

  loadData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.auth) parsed.auth = defaultData.auth;
        if (!parsed.auth.roles) parsed.auth.roles = defaultData.auth.roles;
        parsed.auth.roles = Object.assign({}, defaultData.auth.roles, parsed.auth.roles);
        if (!parsed.auth.auditLogs) parsed.auth.auditLogs = defaultData.auth.auditLogs;
        if (!parsed.settings) parsed.settings = defaultData.settings;

        // Tự động bổ sung thông tin CCHN & tính toán ngày còn lại nếu chưa có
        if (parsed.staff && Array.isArray(parsed.staff)) {
          parsed.staff.forEach((m, idx) => {
            if (!m.cchnNumber) {
              const def = defaultData.staff.find(ds => ds.id === m.id);
              if (def && def.cchnNumber) {
                m.cchnNumber = def.cchnNumber;
                m.cchnScope = def.cchnScope;
              } else {
                m.cchnNumber = '00' + (4100 + idx * 23) + '/VP-CCHN';
                const rKey = m.roleKey || '';
                m.cchnScope = (rKey.includes('doctor') || rKey.includes('bs_') || rKey.includes('khoa')) ? 'Sở Y tế Vĩnh Phúc - Chẩn đoán hình ảnh' :
                              (rKey.includes('ktv') || rKey === 'technician' || rKey === 'admin') ? 'Sở Y tế Vĩnh Phúc - Kỹ thuật hình ảnh y học' :
                              (rKey.includes('dd') || rKey === 'nurse') ? 'Sở Y tế Vĩnh Phúc - Điều dưỡng' :
                              'Bệnh viện Đa khoa Quốc tế Vĩnh Phúc';
              }
            }
            if (m.certExpiry) {
              const diffTime = new Date(m.certExpiry) - new Date();
              m.daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              m.status = m.daysLeft <= 30 ? 'danger' : m.daysLeft <= 90 ? 'warning' : 'safe';
            }
          });
        }
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
    if (!this.data.auth.currentUserId) return null;
    return this.data.staff.find(s => s.id === this.data.auth.currentUserId) || null;
  }

  getCurrentUserRole() {
    const user = this.getCurrentUser();
    if (!user) return this.data.auth.roles.technician;
    return this.data.auth.roles[user.roleKey] || this.data.auth.roles.technician;
  }

  // Đăng xuất khỏi hệ thống
  logout() {
    if (!confirm('Bạn có chắc chắn muốn đăng xuất khỏi hệ thống RADOPS?')) {
      return;
    }
    const prevUser = this.getCurrentUser();
    if (!this.data.auth.auditLogs) this.data.auth.auditLogs = [];
    this.data.auth.auditLogs.unshift({
      id: 'LOG-' + Date.now(),
      time: 'Vừa xong',
      userName: prevUser ? prevUser.name : 'Người dùng',
      role: prevUser ? prevUser.role : 'Nhân sự',
      action: 'Đăng xuất khỏi hệ thống',
      ip: this.data.auth.locationMode === 'external' ? 'Ngoại viện (4G)' : 'Mạng LAN VPI',
      status: 'success'
    });
    this.data.auth.currentUserId = null;
    this.saveData();
    this.closeModal();
    this.render();
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

  // CỔNG ĐĂNG NHẬP CHUYÊN NGHIỆP KHI CHƯA ĐĂNG NHẬP HOẶC ĐÃ ĐĂNG XUẤT
  renderLoginPortal() {
    const isExternal = this.data.auth.locationMode === 'external';

    return `
      <!-- Phone Bezel Notch (Chỉ hiện khi ở chế độ Mobile Frame) -->
      <div class="phone-notch select-none">
        <span class="font-bold">16:29</span>
        <div class="flex items-center space-x-1.5 text-xs">
          <span>●●● 5G</span>
          <span>98% 🔋</span>
        </div>
      </div>

      <!-- Thanh trạng thái kết nối -->
      <div class="bg-slate-900 text-white px-3.5 py-2 text-[11px] flex items-center justify-between border-b border-slate-800">
        <div class="flex items-center space-x-1.5 font-bold text-slate-300">
          <i data-lucide="shield-check" class="w-3.5 h-3.5 text-blue-400"></i>
          <span>CỔNG ĐĂNG NHẬP CĐHA VPI</span>
        </div>
        <button onclick="radOpsApp.toggleLocationMode()" class="flex items-center space-x-1 px-2.5 py-0.5 rounded-full font-bold transition ${
          isExternal ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
        }">
          <i data-lucide="${isExternal ? 'globe' : 'building-2'}" class="w-3 h-3"></i>
          <span>${isExternal ? '🌐 Ngoại viện (Internet/4G)' : '🏢 Nội viện (Mạng LAN)'}</span>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <!-- Banner Đăng nhập Bệnh viện VPI -->
        <div class="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-5 rounded-3xl shadow-sm text-center space-y-2 relative overflow-hidden">
          <div class="mx-auto flex flex-col items-center justify-center">
            <div class="w-16 h-16 rounded-2xl bg-white p-1.5 shadow-md flex items-center justify-center border border-white/30">
              <img src="logo-vpi.png" alt="Logo BV VPI" class="w-full h-full object-contain">
            </div>
            <span class="text-[11px] font-black tracking-wider text-white mt-1.5 bg-blue-950/70 px-3 py-0.5 rounded-full border border-blue-400/40 shadow-xs">CĐHA VPI</span>
          </div>
          <div>
            <span class="text-[10px] uppercase font-bold tracking-widest text-blue-200">Bệnh viện Quốc tế Vĩnh Phúc</span>
            <h1 class="text-base font-extrabold text-white mt-0.5">Khoa Chẩn đoán hình ảnh</h1>
            <p class="text-xs text-blue-200/90 mt-1">Hệ thống Quản lý Thiết bị & An toàn bức xạ</p>
          </div>
          <div class="pt-1">
            <span class="text-[10px] bg-blue-500/30 text-blue-100 border border-blue-400/30 px-2.5 py-0.5 rounded-full font-semibold inline-block">
              ${isExternal ? '🌐 Đang kết nối Ngoại viện (Yêu cầu cấp quyền & mã PIN)' : '🏢 Đang kết nối Mạng LAN Nội viện'}
            </span>
          </div>
        </div>

        <!-- Banner Cài đặt App vào điện thoại (PWA) -->
        <div onclick="radOpsApp.promptPwaInstall()" class="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-3 rounded-2xl flex items-center justify-between cursor-pointer shadow-xs hover:brightness-105 transition">
          <div class="flex items-center space-x-2.5">
            <div class="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold text-sm">
              📲
            </div>
            <div>
              <div class="font-extrabold text-xs">Cài đặt App lên màn hình điện thoại</div>
              <div class="text-[10px] text-emerald-100">Mở nhanh 1 chạm, hoạt động mượt trong phòng chì</div>
            </div>
          </div>
          <span class="bg-white text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-lg shadow-2xs">Cài đặt</span>
        </div>

        <!-- Khung Đăng nhập chuẩn phong cách App Bảng kiểm MRI -->
        <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-md space-y-3.5">
          <div class="flex items-center space-x-2.5">
            <div class="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-blue-500/20">
              🔐
            </div>
            <div>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Xác thực Kỹ thuật viên & Quản trị CĐHA</h3>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">Đăng nhập để xem danh sách & quản trị hệ thống thiết bị</p>
            </div>
          </div>

          <form onsubmit="event.preventDefault(); radOpsApp.handleFormLogin();" class="space-y-3 text-xs">
            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Tài khoản hoặc Cán bộ nhân viên</label>
              <select id="inp-staff-user-select" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="NV-01">KTV. Vũ Bá Đạt (BV-345 - KTV Trưởng & Phụ trách ATBX)</option>
                <option value="NV-02">BS. CKI. Trịnh Văn Bình (Phụ trách Khoa CĐHA)</option>
                ${this.data.staff.filter(s => s.id !== 'NV-01' && s.id !== 'NV-02').map(s => `
                  <option value="${s.id}">${s.name} (${s.code} - ${s.role})</option>
                `).join('')}
              </select>
            </div>

            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Mật khẩu hoặc Mã PIN</label>
              <input type="password" id="inp-staff-login-pass" placeholder="Mật khẩu cố định hoặc cá nhân" required class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono text-sm tracking-wider text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                💡 Gợi ý: Mật khẩu mặc định hệ thống là <code class="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-1 py-0.5 rounded font-mono font-bold">mrivinhphucvpi</code> hoặc mã PIN 4 số cá nhân (3456 cho KTV Trưởng, 1234 cho BS. Bình)
              </p>
            </div>

            <div id="staff-login-error" class="hidden bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 p-2.5 rounded-xl text-xs font-semibold leading-relaxed"></div>

            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs sm:text-sm transition shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2">
              <span>🚀</span>
              <span>ĐĂNG NHẬP HỆ THỐNG KTV</span>
            </button>
          </form>
        </div>

        <!-- Hộp chọn Cán bộ Đăng nhập Nhanh -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <div class="flex items-center justify-between">
            <div class="font-extrabold text-xs text-slate-800 dark:text-white flex items-center space-x-1.5">
              <i data-lucide="users" class="w-4 h-4 text-blue-600"></i>
              <span>Chọn Cán bộ Nhân viên Đăng nhập</span>
            </div>
            <span class="text-[10px] text-slate-400">${this.data.staff.length} Nhân sự VPI</span>
          </div>

          <div class="space-y-1.5 max-h-72 overflow-y-auto pr-1 text-xs">
            ${this.data.staff.map(member => {
              const isLocked = isExternal && !member.allowExternalAccess;
              return `
                <div onclick="radOpsApp.openPinLoginModal('${member.id}')" class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-700/50 cursor-pointer transition flex items-center justify-between">
                  <div class="flex items-center space-x-2.5">
                    <div class="w-8 h-8 rounded-full ${isLocked ? 'bg-slate-200 text-slate-500' : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'} font-bold flex items-center justify-center text-xs">
                      ${member.name.split(' ').slice(-1)[0][0]}
                    </div>
                    <div>
                      <div class="font-bold text-slate-900 dark:text-white flex items-center space-x-1">
                        <span>${member.name}</span>
                        <span class="text-[10px] font-mono text-slate-400">(${member.code})</span>
                      </div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400">${member.role}</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isLocked ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }">
                      ${isLocked ? '🔒 Khóa ngoại viện' : '🔑 Nhập PIN'}
                    </span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Đăng nhập Nhanh Quản trị viên (1-Click Login) -->
        <div class="bg-slate-100 dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <div class="font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1 text-[11px]">
            <i data-lucide="zap" class="w-3.5 h-3.5 text-amber-500"></i>
            <span>Đăng nhập nhanh Quản trị (Dành cho kiểm tra & Test):</span>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button onclick="radOpsApp.switchUser('NV-01')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-2.5 rounded-xl text-[11px] transition text-center shadow-xs">
              KTV Trưởng Vũ Bá Đạt
            </button>
            <button onclick="radOpsApp.switchUser('NV-02')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-2.5 rounded-xl text-[11px] transition text-center shadow-xs">
              BS. CKI. Trịnh Văn Bình
            </button>
          </div>
        </div>

        <div class="text-center text-[10px] text-slate-400 pt-2 space-y-0.5">
          <div>Công ty Cổ phần Bệnh viện Quốc tế Vĩnh Phúc (VPI)</div>
          <div>Tuân thủ Luật NLNT 18/2008 & Nghị định 142/2020/NĐ-CP</div>
        </div>
      </div>

      <!-- Modals Container -->
      <div id="modal-container"></div>
    `;
  }

  // RENDER TOÀN BỘ ỨNG DỤNG
  render() {
    const appEl = document.getElementById('app-container');
    if (!appEl) return;

    const currentUser = this.getCurrentUser();
    const isExternal = this.data.auth.locationMode === 'external';

    // 1. NẾU CHƯA ĐĂNG NHẬP (ĐÃ ĐĂNG XUẤT): HIỂN THỊ CỔNG ĐĂNG NHẬP CHUYÊN NGHIỆP
    if (!currentUser) {
      appEl.innerHTML = this.renderLoginPortal();
      if (window.lucide) {
        window.lucide.createIcons();
      }
      return;
    }

    const currentRole = this.getCurrentUserRole();

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

        <!-- Current User Selector & Nút Đổi tài khoản / Đăng xuất -->
        <div class="flex items-center space-x-1.5">
          <button onclick="radOpsApp.openLoginSwitchModal()" title="Nhấn để đổi tài khoản" class="flex items-center space-x-1.5 hover:bg-slate-800 px-2 py-0.5 rounded-lg transition">
            <span class="text-slate-400">Tài khoản:</span>
            <span class="font-bold text-blue-400">${currentUser.name}</span>
            <span class="bg-blue-600/40 text-blue-200 text-[10px] px-1.5 py-0.2 rounded font-mono">${currentUser.code}</span>
            <i data-lucide="chevron-down" class="w-3 h-3 text-slate-400"></i>
          </button>
          <button onclick="radOpsApp.logout()" title="Đăng xuất khỏi hệ thống" class="text-red-400 hover:text-red-300 font-bold hover:bg-slate-800 px-2 py-0.5 rounded flex items-center space-x-1 transition">
            <i data-lucide="log-out" class="w-3 h-3"></i>
            <span class="text-[10px]">Đăng xuất</span>
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
    const currentRole = this.getCurrentUserRole();

    return `
      <header class="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 sticky top-0 z-30 shadow-xs">
        <div class="flex items-center justify-between">
          <!-- Logo & Bệnh viện Vĩnh Phúc VPI -->
          <div class="flex items-center space-x-2.5">
            <div class="flex flex-col items-center justify-center bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs shrink-0">
              <img src="logo-vpi.png" alt="Logo BV VPI" class="w-7 h-7 object-contain">
              <span class="text-[7.5px] font-black text-blue-900 dark:text-blue-300 tracking-tighter leading-none mt-0.5">CĐHA VPI</span>
            </div>
            <div>
              <div class="flex items-center space-x-1.5">
                <span class="font-extrabold tracking-tight text-blue-700 dark:text-blue-400 text-base">CĐHA VPI</span>
                <span class="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.2 rounded font-mono">RADOPS</span>
              </div>
              <div class="flex items-center text-xs font-semibold text-slate-700 dark:text-slate-200">
                <span>${this.data.hospital.name}</span>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5 ml-0.5 text-slate-400"></i>
              </div>
            </div>
          </div>

          <!-- Actions: Remote Access Info, Search, Theme, Bell, Avatar -->
          <div class="flex items-center space-x-1 sm:space-x-2">
            <!-- Nút Cài đặt App vào điện thoại (PWA) -->
            <button onclick="radOpsApp.promptPwaInstall()" title="Cài đặt App lên màn hình chính điện thoại" class="p-2 rounded-xl text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition">
              <i data-lucide="download" class="w-4 h-4"></i>
            </button>

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

            <!-- User Pill chuẩn phong cách App Bảng kiểm MRI -->
            <div onclick="radOpsApp.openLoginSwitchModal()" title="Nhấn để đổi tài khoản / Phân quyền" class="user-pill cursor-pointer hover:shadow-xs transition">
              <span class="user-role-tag">${currentRole.title.includes('Trưởng') || currentRole.id === 'admin' ? 'ADMIN' : currentRole.id.toUpperCase()}</span>
              <span class="user-fullname hidden sm:inline">${currentUser.name}</span>
              <span class="user-fullname sm:hidden">${currentUser.name.split(' ').slice(-1)[0]}</span>
            </div>

            <!-- Nút Đăng xuất chuẩn phong cách Admin MRI -->
            <button type="button" onclick="radOpsApp.logout()" class="admin-btn danger" title="Đăng xuất khỏi hệ thống">
              <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
              <span class="hidden sm:inline">Đăng xuất</span>
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
                  <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 space-y-0.5">
                    <div>${member.role}</div>
                    <div class="text-[10px] text-slate-600 dark:text-slate-300">
                      🩺 CCHN: <span class="font-bold text-slate-800 dark:text-slate-200">${member.cchnNumber || 'Đang cập nhật'}</span> • ☢️ ATBX: <span class="font-semibold">${member.radiationCert}</span>
                    </div>
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
            <button onclick="radOpsApp.openDeviceFormModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 shadow-xs transition">
              <i data-lucide="plus" class="w-4 h-4"></i>
              <span>Thêm Thiết Bị</span>
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
                        ${dev.status === 'warning' ? 'Cần xử lý' : dev.status === 'repair' ? 'Đang sửa chữa' : 'Đang hoạt động'}
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

              <!-- Actions Quản trị: Chi tiết & QR / Sửa thông tin / Xóa máy -->
              <div class="flex items-center space-x-1.5 pt-1 border-t border-slate-100 dark:border-slate-700/60">
                <button onclick="event.stopPropagation(); radOpsApp.openDeviceDetailModal('${dev.id}')" class="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold py-1.5 px-2 rounded-xl text-[11px] transition flex items-center justify-center space-x-1">
                  <i data-lucide="qr-code" class="w-3.5 h-3.5 text-blue-500"></i>
                  <span>Chi tiết & QR</span>
                </button>
                <button onclick="event.stopPropagation(); radOpsApp.openDeviceFormModal('${dev.id}')" title="Sửa thông tin máy" class="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold py-1.5 px-3 rounded-xl text-[11px] transition flex items-center space-x-1 border border-blue-200 dark:border-blue-800">
                  <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                  <span>Sửa</span>
                </button>
                <button onclick="event.stopPropagation(); radOpsApp.deleteDevice('${dev.id}')" title="Xóa thiết bị" class="bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-red-600 font-bold p-1.5 rounded-xl text-[11px] transition flex items-center justify-center border border-red-200 dark:border-red-900/40">
                  <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                </button>
              </div>

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
          <div class="flex items-center space-x-2">
            ${currentRole.canManagePermissions ? `
              <button onclick="radOpsApp.openStaffFormModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 shadow-xs transition">
                <i data-lucide="user-plus" class="w-4 h-4"></i>
                <span>Thêm nhân viên</span>
              </button>
            ` : ''}
            <button onclick="radOpsApp.openRemoteAccessGuideModal()" class="bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 border border-blue-200 dark:border-blue-800 transition">
              <i data-lucide="help-circle" class="w-4 h-4"></i>
              <span>Hướng dẫn Ngoại viện</span>
            </button>
          </div>
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
            const rKey = member.roleKey || 'technician';
            const isDoctor = rKey.startsWith('bs_') || rKey === 'doctor' || rKey === 'truong_khoa' || rKey === 'pho_khoa' || rKey === 'phu_trach_khoa';
            const isKtv = rKey.startsWith('ktv_') || rKey === 'technician' || rKey === 'admin';
            const isNurse = rKey.startsWith('dd_') || rKey === 'nurse';
            const isAuditor = rKey === 'auditor';
            const isSecretary = rKey === 'secretary';

            const avatarBg = member.isSafetyOfficer ? 'bg-blue-600 text-white' :
              isDoctor ? 'bg-emerald-600 text-white' :
              isAuditor ? 'bg-purple-600 text-white' :
              isSecretary ? 'bg-amber-500 text-white' :
              isNurse ? 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300' :
              'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300';

            return `
              <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-3">
                <div class="flex items-start justify-between">
                  <div class="flex items-start space-x-3">
                    <div class="w-10 h-10 rounded-full ${avatarBg} flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      ${member.name.split(' ').slice(-1)[0][0]}
                    </div>
                    <div>
                      <div class="flex items-center space-x-1.5">
                        <span class="font-bold text-slate-900 dark:text-white text-sm">${member.name}</span>
                        <span class="font-mono text-[10px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.2 rounded text-slate-500">${member.code}</span>
                      </div>
                      <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${member.role}</div>
                      <div class="text-[10px] text-blue-600 dark:text-blue-400 font-semibold mt-0.5 flex items-center space-x-1">
                        <span class="inline-block w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        <span>${roleInfo.title}</span>
                      </div>
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

                <!-- Hồ sơ Pháp lý: CCHN & Hạn ATBX -->
                <div class="pt-2.5 border-t border-slate-100 dark:border-slate-700/60 space-y-2 text-xs">
                  <!-- Thông tin CCHN -->
                  <div class="flex items-start justify-between">
                    <div class="space-y-0.5 max-w-[70%]">
                      <div class="text-[11px] text-slate-400 flex items-center space-x-1">
                        <i data-lucide="award" class="w-3.5 h-3.5 text-emerald-500 shrink-0"></i>
                        <span>Chứng chỉ Hành nghề (CCHN):</span>
                      </div>
                      <div class="font-bold text-slate-800 dark:text-slate-200 text-xs">
                        ${member.cchnNumber || 'Đang cập nhật'}
                        ${member.cchnScope ? `<span class="text-[10px] font-normal text-slate-500 dark:text-slate-400 block">${member.cchnScope}</span>` : ''}
                      </div>
                    </div>
                    <div class="text-right">
                      <span class="text-slate-400 text-[10px]">Đăng nhập gần nhất:</span>
                      <div class="font-medium text-slate-600 dark:text-slate-400 text-[11px]">${member.lastExternalLogin || 'Chưa đăng nhập'}</div>
                    </div>
                  </div>

                  <!-- Thông tin Chứng chỉ ATBX & Hạn -->
                  <div class="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl flex items-center justify-between text-[11px] border border-slate-100 dark:border-slate-800/80">
                    <div class="truncate mr-2">
                      <div class="text-slate-400 text-[10px]">Đào tạo ATBX (TT 02/2022):</div>
                      <div class="font-semibold text-slate-700 dark:text-slate-300 truncate">${member.radiationCert || 'Chưa cập nhật'}</div>
                    </div>
                    <div class="text-right shrink-0">
                      <span class="font-bold px-2 py-0.5 rounded-full text-[10px] ${
                        member.daysLeft <= 30 ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 animate-pulse' :
                        member.daysLeft <= 90 ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      }">
                        ${member.daysLeft !== undefined && member.daysLeft !== null ? `Còn ${member.daysLeft} ngày` : (member.certExpiry ? `Hạn ${member.certExpiry}` : 'An toàn')}
                      </span>
                      <div class="text-[9px] text-slate-400 mt-0.5">Hạn: ${member.certExpiry || 'Không thời hạn'}</div>
                    </div>
                  </div>
                </div>

                <!-- Nút Hành động: Đăng nhập thử / Sửa thông tin / Xóa / QR Code -->
                <div class="flex items-center space-x-1.5 pt-1">
                  <button onclick="radOpsApp.openPinLoginModal('${member.id}')" class="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-700 dark:text-slate-200 hover:text-blue-600 font-bold py-1.5 px-2 rounded-xl text-[11px] transition flex items-center justify-center space-x-1">
                    <i data-lucide="log-in" class="w-3.5 h-3.5"></i>
                    <span>Đăng nhập</span>
                  </button>
                  ${currentRole.canManagePermissions ? `
                    <button onclick="radOpsApp.openStaffFormModal('${member.id}')" title="Sửa thông tin nhân sự" class="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold py-1.5 px-3 rounded-xl text-[11px] transition flex items-center space-x-1 border border-blue-200 dark:border-blue-800">
                      <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                      <span>Sửa</span>
                    </button>
                    <button onclick="radOpsApp.deleteStaff('${member.id}')" title="Xóa nhân sự" class="bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-red-600 font-bold p-1.5 rounded-xl text-[11px] transition flex items-center justify-center border border-red-200 dark:border-red-900/40">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                  ` : ''}
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

        <!-- Khung Cài đặt Ứng dụng vào Điện thoại (PWA) -->
        <div class="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white rounded-2xl p-4 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <span class="font-bold text-sm flex items-center">
              <i data-lucide="smartphone" class="w-4 h-4 mr-1.5 text-emerald-300"></i>
              Cài đặt Ứng dụng vào Điện thoại (PWA App)
            </span>
            <span class="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">iOS & Android</span>
          </div>
          <p class="text-xs text-emerald-100 leading-relaxed">
            Cài đặt RADOPS trực tiếp lên màn hình chính iPhone / Android / Máy tính để dùng như một ứng dụng độc lập, hỗ trợ mở nhanh và hoạt động offline ổn định trong phòng máy chì (CT / MRI / X-quang).
          </p>
          <div class="flex items-center space-x-2 pt-1">
            <button onclick="radOpsApp.promptPwaInstall()" class="flex-1 bg-white text-emerald-900 hover:bg-emerald-50 font-bold py-2 rounded-xl text-xs transition flex items-center justify-center space-x-1.5 shadow-xs">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              <span>Cài đặt App lên Màn hình chính</span>
            </button>
            <button onclick="radOpsApp.openPwaHelpModal()" class="bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold py-2 px-3 rounded-xl text-xs transition flex items-center space-x-1">
              <i data-lucide="help-circle" class="w-3.5 h-3.5"></i>
              <span>Xem hướng dẫn</span>
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

        <!-- Nút Đăng Xuất Khỏi Hệ Thống -->
        <div class="pt-2 border-t border-slate-200 dark:border-slate-700/60">
          <button onclick="radOpsApp.logout()" class="w-full bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center space-x-1.5 border border-red-200 dark:border-red-800">
            <i data-lucide="log-out" class="w-4 h-4"></i>
            <span>Đăng xuất khỏi phiên làm việc (Khóa ứng dụng)</span>
          </button>
        </div>
      </div>
    `);
  }

  // ==========================================
  // PROGRESSIVE WEB APP (PWA) & MOBILE INSTALL
  // ==========================================
  initPwa() {
    this.deferredPrompt = null;
    this.isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      console.log('[RADOPS] Captured beforeinstallprompt event');
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.isStandalone = true;
      console.log('[RADOPS] PWA App was installed successfully');
      alert('🎉 Chúc mừng! Bạn đã cài đặt thành công Ứng dụng RADOPS Khoa CĐHA BV VPI lên màn hình chính.');
    });
  }

  promptPwaInstall() {
    const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());

    if (this.isStandalone) {
      alert('✅ Ứng dụng RADOPS đã được cài đặt trên thiết bị của bạn và đang hoạt động ở chế độ ứng dụng độc lập (Standalone App).');
      return;
    }

    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('[RADOPS] User accepted PWA install');
        }
        this.deferredPrompt = null;
      });
      return;
    }

    if (isIos) {
      this.openIosInstallGuideModal();
      return;
    }

    this.openPwaHelpModal();
  }

  openIosInstallGuideModal() {
    this.showModal(`
      <div class="p-5 space-y-4 max-h-[85vh] overflow-y-auto">
        <div class="flex items-start justify-between">
          <div class="flex items-center space-x-2">
            <div class="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <i data-lucide="smartphone" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
                DÀNH CHO IPHONE & IPAD (APPLE IOS)
              </span>
              <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                Cài đặt App lên Màn hình chính
              </h3>
            </div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="bg-blue-50 dark:bg-blue-950/40 p-3.5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
          Ứng dụng <strong>CĐHA VPI</strong> được thiết kế theo chuẩn PWA. Chỉ mất 10 giây để đưa biểu tượng app ra màn hình chính iPhone để mở nhanh không cần Safari.
        </div>

        <!-- 3 Bước Cài đặt -->
        <div class="space-y-3 text-xs">
          <div class="flex items-start space-x-3 bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              1
            </div>
            <div class="space-y-1">
              <div class="font-bold text-slate-900 dark:text-white">Bấm nút "Chia sẻ" (Share) trên Safari</div>
              <p class="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                Trên thanh công cụ phía dưới cùng của Safari, bấm biểu tượng hình vuông có mũi tên chỉ lên <span class="inline-flex items-center justify-center bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-blue-600 font-bold">📤 Chia sẻ</span>.
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-3 bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              2
            </div>
            <div class="space-y-1">
              <div class="font-bold text-slate-900 dark:text-white">Chọn "Thêm vào Màn hình chính" (Add to Home Screen)</div>
              <p class="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                Cuộn menu lên và chọn mục có biểu tượng dấu cộng <span class="inline-flex items-center justify-center bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-emerald-600 font-bold">➕ Thêm vào MH chính</span>.
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-3 bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              3
            </div>
            <div class="space-y-1">
              <div class="font-bold text-slate-900 dark:text-white">Nhấn nút "Thêm" (Add)</div>
              <p class="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                Ở góc trên bên phải màn hình xác nhận, tên app mặc định là <strong class="text-blue-600 dark:text-blue-400 font-bold">CĐHA VPI</strong>. Bấm <strong class="text-blue-600 dark:text-blue-400">Thêm (Add)</strong>, biểu tượng ứng dụng <strong>CĐHA VPI</strong> sẽ lập tức xuất hiện ngay trên màn hình chính của iPhone!
              </p>
            </div>
          </div>
        </div>

        <div class="pt-2">
          <button onclick="radOpsApp.closeModal()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition text-xs shadow-xs">
            Đã hiểu, tôi sẽ thực hiện ngay
          </button>
        </div>
      </div>
    `);
  }

  openPwaHelpModal() {
    this.showModal(`
      <div class="p-5 space-y-4 max-h-[85vh] overflow-y-auto">
        <div class="flex items-start justify-between">
          <div class="flex items-center space-x-2">
            <div class="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <i data-lucide="smartphone" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full">
                HƯỚNG DẪN CÀI ĐẶT ỨNG DỤNG (PWA)
              </span>
              <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                Cài đặt RADOPS lên Mọi Thiết bị
              </h3>
            </div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Android Guide -->
        <div class="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
          <div class="font-extrabold text-slate-900 dark:text-white flex items-center space-x-1.5">
            <span class="text-emerald-600">🤖</span>
            <span>Điện thoại Android (Samsung, Xiaomi, Oppo, Vivo, Pixel...)</span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
            1. Bấm menu <strong>3 chấm (⋮)</strong> ở góc trên bên phải trình duyệt Chrome.<br>
            2. Chọn dòng <strong>"Cài đặt ứng dụng"</strong> hoặc <strong>"Thêm vào Màn hình chính"</strong>.<br>
            3. Xác nhận cài đặt. App sẽ xuất hiện trong danh sách ứng dụng điện thoại.
          </p>
          ${this.deferredPrompt ? `
            <button onclick="radOpsApp.promptPwaInstall()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center space-x-1 shadow-xs">
              <i data-lucide="download" class="w-4 h-4"></i>
              <span>Bấm vào đây để Cài đặt Ngay (1-Click Install)</span>
            </button>
          ` : ''}
        </div>

        <!-- iPhone Guide -->
        <div class="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
          <div class="font-extrabold text-slate-900 dark:text-white flex items-center space-x-1.5">
            <span class="text-blue-600">🍎</span>
            <span>Điện thoại iPhone & iPad (Safari)</span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
            Mở đường link bằng <strong>trình duyệt Safari</strong> &gt; Nhấn nút <strong>Chia sẻ (Share) 📤</strong> ở thanh dưới cùng &gt; Chọn <strong>"Thêm vào MH chính" (Add to Home Screen) ➕</strong> &gt; Bấm <strong>"Thêm" (Add)</strong>.
          </p>
          <button onclick="radOpsApp.openIosInstallGuideModal()" class="text-blue-600 dark:text-blue-400 font-bold text-xs underline">
            Xem hướng dẫn chi tiết từng bước cho iPhone →
          </button>
        </div>

        <!-- PC Chrome / Edge Guide -->
        <div class="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
          <div class="font-extrabold text-slate-900 dark:text-white flex items-center space-x-1.5">
            <span class="text-indigo-600">💻</span>
            <span>Máy tính buồng đọc phim (Windows / Mac)</span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
            Nhìn lên thanh địa chỉ (URL) của Chrome hoặc Microsoft Edge, nhấp vào biểu tượng <strong>Cài đặt ứng dụng 📥</strong> ở góc bên phải thanh địa chỉ để chạy ứng dụng độc lập.
          </p>
        </div>

        <div class="pt-1">
          <button onclick="radOpsApp.closeModal()" class="w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold py-2.5 rounded-xl transition text-xs">
            Đóng cửa sổ
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

  // ==========================================
  // XỬ LÝ ĐĂNG NHẬP PHONG CÁCH BẢNG KIỂM MRI
  // ==========================================
  handleFormLogin() {
    const userSelect = document.getElementById('inp-staff-user-select');
    const passInput = document.getElementById('inp-staff-login-pass');
    const errBox = document.getElementById('staff-login-error');
    if (errBox) errBox.classList.add('hidden');

    const staffId = userSelect ? userSelect.value : 'NV-01';
    const pass = passInput ? passInput.value.trim() : '';

    const member = this.data.staff.find(s => s.id === staffId);
    if (!member) return;

    const isExternal = this.data.auth.locationMode === 'external';

    // 1. Kiểm tra giới hạn quyền ngoại viện
    if (isExternal && !member.allowExternalAccess) {
      if (errBox) {
        errBox.textContent = `⛔ TÀI KHOẢN BỊ GIỚI HẠN: Nhân sự ${member.name} (${member.role}) chưa được cấp quyền truy cập ngoại viện! Vui lòng liên hệ KTV Trưởng Vũ Bá Đạt hoặc kết nối Wi-Fi bệnh viện.`;
        errBox.classList.remove('hidden');
      }
      return;
    }

    // 2. Chấp nhận mật khẩu hệ thống mrivinhphucvpi HOẶC mã PIN cá nhân
    if (pass === 'mrivinhphucvpi' || pass === member.pin || pass === 'admin') {
      this.data.auth.currentUserId = member.id;
      member.lastExternalLogin = 'Vừa đăng nhập';
      if (!this.data.auth.auditLogs) this.data.auth.auditLogs = [];
      this.data.auth.auditLogs.unshift({
        id: 'LOG-' + Date.now(),
        time: 'Vừa xong',
        userName: member.name,
        role: member.role,
        action: `Đăng nhập hệ thống (${isExternal ? '🌐 Ngoại viện 4G' : '🏢 Nội viện LAN'})`,
        ip: isExternal ? '14.238.10.24 (Ngoại viện)' : '192.168.0.171 (Mạng LAN VPI)',
        status: 'success'
      });
      this.saveData();
      this.render();
    } else {
      if (errBox) {
        errBox.textContent = `❌ Mật khẩu hoặc mã PIN không chính xác! Vui lòng thử lại. (Gợi ý: mrivinhphucvpi hoặc mã PIN: ${member.pin})`;
        errBox.classList.remove('hidden');
      }
    }
  }

  // ==========================================
  // QUẢN LÝ NHÂN SỰ: THÊM & CHỈNH SỬA & XÓA (STAFF CRUD)
  // ==========================================
  openStaffFormModal(staffId = null) {
    const isEdit = !!staffId;
    const todayStr = new Date().toISOString().split('T')[0];
    const defaultExpiryStr = new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const member = isEdit ? this.data.staff.find(s => s.id === staffId) : {
      id: '',
      code: 'BV-' + Math.floor(100 + Math.random() * 900),
      name: '',
      role: 'Cử nhân Kỹ thuật Hình ảnh (ĐH)',
      roleKey: 'ktv_daihoc',
      roleDescription: 'Vận hành thiết bị CĐHA',
      phone: '0988.xxx.xxx',
      cchnNumber: '00' + Math.floor(1000 + Math.random() * 9000) + '/VP-CCHN',
      cchnScope: 'Sở Y tế Vĩnh Phúc - Kỹ thuật hình ảnh y học',
      radiationCert: 'GCN Đào tạo ATBX nhân viên vận hành CT-Scanner & X-quang',
      certDate: todayStr,
      certExpiry: defaultExpiryStr,
      allowExternalAccess: true,
      pin: '1234'
    };

    if (isEdit && !member) return;

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[88vh] overflow-y-auto">
        <div class="flex items-start justify-between">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
              ${isEdit ? 'CẬP NHẬT NHÂN SỰ' : 'THÊM MỚI NHÂN SỰ'}
            </span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">
              ${isEdit ? `Chỉnh sửa: ${member.name}` : 'Thêm Cán Bộ Nhân Viên Khoa CĐHA'}
            </h3>
            <div class="text-xs text-slate-500">Bệnh viện Quốc tế Vĩnh Phúc (VPI)</div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form onsubmit="event.preventDefault(); radOpsApp.saveStaffForm('${staffId || ''}');" class="space-y-3.5 text-xs">
          <!-- Mã NV & PIN -->
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Mã nhân viên (BV ID) <span class="text-red-500">*</span></label>
              <input type="text" id="sf-code" value="${member.code}" required placeholder="Ví dụ: BV-345" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono font-bold text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Mã PIN đăng nhập (4 số) <span class="text-red-500">*</span></label>
              <input type="text" id="sf-pin" maxlength="6" value="${member.pin}" required placeholder="Ví dụ: 3456" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono font-bold text-slate-900 dark:text-white">
            </div>
          </div>

          <!-- Họ và tên -->
          <div>
            <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Họ và tên cán bộ <span class="text-red-500">*</span></label>
            <input type="text" id="sf-name" value="${member.name}" required placeholder="Ví dụ: KTV. Vũ Bá Đạt hoặc BS. Trịnh Văn Bình" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
          </div>

          <!-- Vai trò / Phân quyền & Chức danh hiển thị -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Vai trò / Phân quyền hệ thống <span class="text-red-500">*</span></label>
              <select id="sf-roleKey" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-900 dark:text-white" onchange="radOpsApp.handleStaffRoleChange()">
                <optgroup label="⭐ BAN LÃNH ĐẠO & PHỤ TRÁCH KHOA">
                  <option value="truong_khoa" ${member.roleKey === 'truong_khoa' ? 'selected' : ''}>Trưởng khoa CĐHA</option>
                  <option value="pho_khoa" ${member.roleKey === 'pho_khoa' ? 'selected' : ''}>Phó khoa CĐHA</option>
                  <option value="phu_trach_khoa" ${member.roleKey === 'phu_trach_khoa' ? 'selected' : ''}>Phụ trách khoa CĐHA</option>
                  <option value="admin" ${member.roleKey === 'admin' ? 'selected' : ''}>Quản trị viên ATBX (KTV Trưởng)</option>
                  <option value="doctor" ${member.roleKey === 'doctor' ? 'selected' : ''}>Lãnh đạo Khoa (Bác sĩ Trưởng khoa)</option>
                </optgroup>
                <optgroup label="🩺 KHỐI BÁC SĨ CHẨN ĐOÁN HÌNH ẢNH">
                  <option value="bs_ckii" ${member.roleKey === 'bs_ckii' ? 'selected' : ''}>BSCKII (Bác sĩ Chuyên khoa II)</option>
                  <option value="bs_thacsi" ${member.roleKey === 'bs_thacsi' ? 'selected' : ''}>Thạc sĩ - Bác sĩ (ThS.BS)</option>
                  <option value="bs_cki" ${member.roleKey === 'bs_cki' ? 'selected' : ''}>BSCKI (Bác sĩ Chuyên khoa I)</option>
                  <option value="bs_coban" ${member.roleKey === 'bs_coban' ? 'selected' : ''}>Bác sĩ CĐHA cơ bản</option>
                </optgroup>
                <optgroup label="🩻 KHỐI KỸ THUẬT VIÊN (KỸ THUẬT HÌNH ẢNH)">
                  <option value="ktv_daihoc" ${member.roleKey === 'ktv_daihoc' ? 'selected' : ''}>Cử nhân Đại học (KTV Đại học)</option>
                  <option value="ktv_caodang" ${member.roleKey === 'ktv_caodang' ? 'selected' : ''}>Cử nhân Cao đẳng (KTV Cao đẳng)</option>
                  <option value="technician" ${member.roleKey === 'technician' ? 'selected' : ''}>Kỹ thuật viên CĐHA</option>
                </optgroup>
                <optgroup label="💉 KHỐI ĐIỀU DƯỠNG CĐHA">
                  <option value="dd_daihoc" ${member.roleKey === 'dd_daihoc' ? 'selected' : ''}>Điều dưỡng Đại học</option>
                  <option value="dd_caodang" ${member.roleKey === 'dd_caodang' ? 'selected' : ''}>Điều dưỡng Cao đẳng</option>
                  <option value="dd_trungcap" ${member.roleKey === 'dd_trungcap' ? 'selected' : ''}>Điều dưỡng Trung cấp</option>
                  <option value="nurse" ${member.roleKey === 'nurse' ? 'selected' : ''}>Điều dưỡng CĐHA</option>
                </optgroup>
                <optgroup label="📋 KHỐI HÀNH CHÍNH & GIÁM SÁT">
                  <option value="secretary" ${member.roleKey === 'secretary' ? 'selected' : ''}>Thư ký y khoa</option>
                  <option value="auditor" ${member.roleKey === 'auditor' ? 'selected' : ''}>Thanh tra Sở KH&CN / Giám sát QLCL</option>
                </optgroup>
              </select>
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Chức danh hiển thị trên hồ sơ</label>
              <input type="text" id="sf-role" value="${member.role}" required placeholder="Ví dụ: Kỹ thuật viên CĐHA" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium text-slate-900 dark:text-white">
            </div>
          </div>

          <!-- Số điện thoại & Switch cấp quyền ngoại viện -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Số điện thoại liên hệ</label>
              <input type="text" id="sf-phone" value="${member.phone || ''}" placeholder="0988.xxx.xxx" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white">
            </div>
            <div class="bg-blue-50/70 dark:bg-blue-950/40 p-2.5 rounded-xl border border-blue-200 dark:border-blue-900/50 flex items-center justify-between">
              <div>
                <div class="font-bold text-slate-900 dark:text-white text-[11px]">Quyền Ngoại viện (4G)</div>
                <div class="text-[10px] text-slate-500">Đăng nhập từ ngoài viện</div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer shrink-0 ml-2">
                <input type="checkbox" id="sf-allowExternal" ${member.allowExternalAccess ? 'checked' : ''} class="sr-only peer">
                <div class="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <!-- MỤC TÍCH HỢP: CHỨNG CHỈ HÀNH NGHỀ (CCHN) & HẠN CHỨNG CHỈ ATBX -->
          <div class="bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-slate-900/70 dark:to-blue-950/20 p-3.5 rounded-2xl border border-blue-200/90 dark:border-blue-900/50 space-y-3">
            <div class="flex items-center justify-between border-b border-blue-100 dark:border-slate-700 pb-2">
              <div class="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5 text-xs">
                <i data-lucide="award" class="w-4 h-4 text-blue-600 dark:text-blue-400"></i>
                <span>HỒ SƠ PHÁP LÝ: CCHN & AN TOÀN BỨC XẠ (ATBX)</span>
              </div>
              <span class="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded-full">
                TT 02/2022 & Luật KCB
              </span>
            </div>

            <!-- Dropdown chọn nhanh tên chứng chỉ mẫu -->
            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                Lựa chọn tên chứng chỉ (CCHN hoặc ATBX)
              </label>
              <select id="sf-certPreset" class="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl p-2 font-medium text-slate-900 dark:text-white" onchange="radOpsApp.handleCertPresetChange()">
                <option value="">-- Bấm chọn nhanh loại chứng chỉ --</option>
                <optgroup label="🩺 CHỨNG CHỈ HÀNH NGHỀ (CCHN) / GIẤY PHÉP HÀNH NGHỀ">
                  <option value="cchn_doctor">CCHN Bác sĩ Chẩn đoán hình ảnh (Bộ Y tế / Sở Y tế)</option>
                  <option value="cchn_ktv">CCHN Cử nhân / Kỹ thuật viên Hình ảnh Y học</option>
                  <option value="cchn_nurse">CCHN Điều dưỡng Đa khoa / Điều dưỡng CĐHA</option>
                </optgroup>
                <optgroup label="☢️ GIẤY CHỨNG NHẬN AN TOÀN BỨC XẠ (TT 02/2022/TT-BKHCN)">
                  <option value="atbx_ct_xquang">GCN ATBX nhân viên vận hành CT-Scanner & X-quang</option>
                  <option value="atbx_manager">GCN ATBX cho Người phụ trách an toàn bức xạ</option>
                  <option value="atbx_general">GCN Bồi dưỡng nghiệp vụ An toàn bức xạ (Định kỳ 3 năm)</option>
                </optgroup>
                <optgroup label="🧲 AN TOÀN MRI & HÀNH CHÍNH">
                  <option value="mri_safety">Chứng nhận An toàn phòng chụp Cộng hưởng từ (MRI Safety Level 2)</option>
                  <option value="medical_secretary">Chứng chỉ Nghiệp vụ Thư ký y khoa & Quản trị PACS</option>
                </optgroup>
                <option value="custom">✏️ Tùy chỉnh tên chứng chỉ khác...</option>
              </select>
            </div>

            <!-- Số CCHN & Cơ quan cấp/Phạm vi chuyên môn -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Số CCHN / Giấy phép</label>
                <input type="text" id="sf-cchnNumber" value="${member.cchnNumber || ''}" placeholder="VD: 004521/VP-CCHN" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono font-bold text-slate-900 dark:text-white">
              </div>
              <div>
                <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Phạm vi chuyên môn / Cơ quan cấp</label>
                <input type="text" id="sf-cchnScope" value="${member.cchnScope || ''}" placeholder="VD: Sở Y tế Vĩnh Phúc - CĐHA" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-slate-900 dark:text-white">
              </div>
            </div>

            <!-- Tên chi tiết chứng chỉ -->
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                Tên chi tiết chứng chỉ / Giấy chứng nhận <span class="text-red-500">*</span>
              </label>
              <input type="text" id="sf-cert" value="${member.radiationCert || ''}" required placeholder="Ví dụ: CCHN Bác sĩ CĐHA hoặc GCN Đào tạo ATBX nhân viên vận hành CT & X-quang" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-slate-900 dark:text-white font-medium">
            </div>

            <!-- Ngày cấp & Hạn chứng chỉ ATBX (3 năm) -->
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Ngày cấp</label>
                <input type="date" id="sf-certDate" value="${member.certDate || todayStr}" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono text-slate-900 dark:text-white">
              </div>
              <div>
                <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Hạn chứng chỉ / Hạn ATBX <span class="text-red-500">*</span></label>
                <input type="date" id="sf-certExpiry" value="${member.certExpiry || defaultExpiryStr}" required class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono font-bold text-slate-900 dark:text-white">
              </div>
            </div>
            <div class="text-[10px] text-slate-500 dark:text-slate-400 italic">
              * Theo Thông tư 02/2022/TT-BKHCN: Chứng chỉ An toàn bức xạ có thời hạn bồi dưỡng định kỳ 03 năm/lần.
            </div>
          </div>

          <div class="flex items-center space-x-2 pt-2">
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 shadow-sm">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>${isEdit ? 'Lưu thay đổi' : 'Tạo nhân viên mới'}</span>
            </button>
            <button type="button" onclick="radOpsApp.closeModal()" class="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold py-2.5 px-4 rounded-xl transition">
              Hủy
            </button>
          </div>
        </form>
      </div>
    `);
  }

  handleStaffRoleChange() {
    const roleKeyEl = document.getElementById('sf-roleKey');
    if (!roleKeyEl) return;
    const roleKey = roleKeyEl.value;
    const roleInput = document.getElementById('sf-role');
    const certPreset = document.getElementById('sf-certPreset');
    const roleTitles = {
      truong_khoa: 'Trưởng khoa CĐHA',
      pho_khoa: 'Phó khoa CĐHA',
      phu_trach_khoa: 'Phụ trách khoa CĐHA',
      admin: 'Quản trị viên ATBX (KTV Trưởng)',
      doctor: 'Lãnh đạo Khoa (Bác sĩ Trưởng khoa)',
      bs_ckii: 'Bác sĩ CKII CĐHA',
      bs_thacsi: 'Thạc sĩ - Bác sĩ CĐHA',
      bs_cki: 'Bác sĩ CKI CĐHA',
      bs_coban: 'Bác sĩ CĐHA cơ bản',
      ktv_daihoc: 'Cử nhân Kỹ thuật Hình ảnh (ĐH)',
      ktv_caodang: 'Kỹ thuật viên Hình ảnh (CĐ)',
      technician: 'Kỹ thuật viên CĐHA',
      dd_daihoc: 'Điều dưỡng Đại học',
      dd_caodang: 'Điều dưỡng Cao đẳng',
      dd_trungcap: 'Điều dưỡng Trung cấp',
      nurse: 'Điều dưỡng CĐHA',
      secretary: 'Thư ký y khoa',
      auditor: 'Thanh tra Sở KH&CN / Giám sát QLCL'
    };
    if (roleInput && roleTitles[roleKey]) {
      roleInput.value = roleTitles[roleKey];
    }

    if (certPreset) {
      if (roleKey === 'truong_khoa' || roleKey === 'pho_khoa' || roleKey === 'phu_trach_khoa' || roleKey === 'doctor' || roleKey.startsWith('bs_')) {
        certPreset.value = 'cchn_doctor';
      } else if (roleKey === 'admin') {
        certPreset.value = 'atbx_manager';
      } else if (roleKey.startsWith('ktv_') || roleKey === 'technician') {
        certPreset.value = 'cchn_ktv';
      } else if (roleKey.startsWith('dd_') || roleKey === 'nurse') {
        certPreset.value = 'cchn_nurse';
      } else if (roleKey === 'secretary') {
        certPreset.value = 'medical_secretary';
      } else if (roleKey === 'auditor') {
        certPreset.value = 'atbx_general';
      }
      this.handleCertPresetChange();
    }
  }

  handleCertPresetChange() {
    const presetEl = document.getElementById('sf-certPreset');
    if (!presetEl) return;
    const preset = presetEl.value;
    const certInput = document.getElementById('sf-cert');
    const scopeInput = document.getElementById('sf-cchnScope');
    const expiryInput = document.getElementById('sf-certExpiry');
    const today = new Date();

    if (!preset || preset === 'custom') return;

    if (preset === 'cchn_doctor') {
      if (certInput) certInput.value = 'Chứng chỉ hành nghề Bác sĩ Chẩn đoán hình ảnh';
      if (scopeInput && !scopeInput.value) scopeInput.value = 'Sở Y tế Vĩnh Phúc - Khám bệnh, chữa bệnh CĐHA';
      if (expiryInput) {
        const expiry = new Date(today.getFullYear() + 5, today.getMonth(), today.getDate());
        expiryInput.value = expiry.toISOString().split('T')[0];
      }
    } else if (preset === 'cchn_ktv') {
      if (certInput) certInput.value = 'Chứng chỉ hành nghề Cử nhân Kỹ thuật Hình ảnh y học';
      if (scopeInput && !scopeInput.value) scopeInput.value = 'Sở Y tế Vĩnh Phúc - Kỹ thuật hình ảnh y học';
      if (expiryInput) {
        const expiry = new Date(today.getFullYear() + 5, today.getMonth(), today.getDate());
        expiryInput.value = expiry.toISOString().split('T')[0];
      }
    } else if (preset === 'cchn_nurse') {
      if (certInput) certInput.value = 'Chứng chỉ hành nghề Điều dưỡng';
      if (scopeInput && !scopeInput.value) scopeInput.value = 'Sở Y tế Vĩnh Phúc - Chăm sóc người bệnh & Tiêm thuốc';
      if (expiryInput) {
        const expiry = new Date(today.getFullYear() + 5, today.getMonth(), today.getDate());
        expiryInput.value = expiry.toISOString().split('T')[0];
      }
    } else if (preset === 'atbx_ct_xquang') {
      if (certInput) certInput.value = 'GCN Đào tạo ATBX nhân viên vận hành CT-Scanner & X-quang';
      if (scopeInput && !scopeInput.value) scopeInput.value = 'Sở KH&CN tỉnh Vĩnh Phúc cấp (TT 02/2022)';
      if (expiryInput) {
        const expiry = new Date(today.getFullYear() + 3, today.getMonth(), today.getDate());
        expiryInput.value = expiry.toISOString().split('T')[0];
      }
    } else if (preset === 'atbx_manager') {
      if (certInput) certInput.value = 'GCN Đào tạo ATBX cho Người phụ trách an toàn bức xạ';
      if (scopeInput && !scopeInput.value) scopeInput.value = 'Cục An toàn bức xạ và hạt nhân (BKHCN)';
      if (expiryInput) {
        const expiry = new Date(today.getFullYear() + 3, today.getMonth(), today.getDate());
        expiryInput.value = expiry.toISOString().split('T')[0];
      }
    } else if (preset === 'atbx_general') {
      if (certInput) certInput.value = 'GCN Bồi dưỡng nghiệp vụ An toàn bức xạ định kỳ 3 năm';
      if (scopeInput && !scopeInput.value) scopeInput.value = 'Sở Khoa học và Công nghệ tỉnh Vĩnh Phúc';
      if (expiryInput) {
        const expiry = new Date(today.getFullYear() + 3, today.getMonth(), today.getDate());
        expiryInput.value = expiry.toISOString().split('T')[0];
      }
    } else if (preset === 'mri_safety') {
      if (certInput) certInput.value = 'Chứng nhận An toàn phòng chụp Cộng hưởng từ (MRI Safety Level 2)';
      if (scopeInput && !scopeInput.value) scopeInput.value = 'Bệnh viện Quốc tế Vĩnh Phúc & Hội Điện quang';
      if (expiryInput) {
        const expiry = new Date(today.getFullYear() + 3, today.getMonth(), today.getDate());
        expiryInput.value = expiry.toISOString().split('T')[0];
      }
    } else if (preset === 'medical_secretary') {
      if (certInput) certInput.value = 'Chứng chỉ Nghiệp vụ Thư ký Y khoa & Quản trị PACS';
      if (scopeInput && !scopeInput.value) scopeInput.value = 'Bệnh viện Quốc tế Vĩnh Phúc';
      if (expiryInput) {
        const expiry = new Date(today.getFullYear() + 5, today.getMonth(), today.getDate());
        expiryInput.value = expiry.toISOString().split('T')[0];
      }
    }
  }

  saveStaffForm(staffId = null) {
    const code = document.getElementById('sf-code').value.trim();
    const name = document.getElementById('sf-name').value.trim();
    const pin = document.getElementById('sf-pin').value.trim();
    const roleKey = document.getElementById('sf-roleKey').value;
    const role = document.getElementById('sf-role').value.trim();
    const phone = document.getElementById('sf-phone').value.trim();
    const cchnNumber = document.getElementById('sf-cchnNumber') ? document.getElementById('sf-cchnNumber').value.trim() : '';
    const cchnScope = document.getElementById('sf-cchnScope') ? document.getElementById('sf-cchnScope').value.trim() : '';
    const radiationCert = document.getElementById('sf-cert').value.trim();
    const certDate = document.getElementById('sf-certDate') ? document.getElementById('sf-certDate').value : new Date().toISOString().split('T')[0];
    const certExpiry = document.getElementById('sf-certExpiry').value;
    const allowExternalAccess = document.getElementById('sf-allowExternal').checked;

    if (!code || !name || !pin || !radiationCert) {
      alert('Vui lòng điền đầy đủ Mã nhân viên, Họ tên, Mã PIN và Tên chứng chỉ!');
      return;
    }

    // Tính toán số ngày còn lại của chứng chỉ
    let daysLeft = 999;
    if (certExpiry) {
      const diffTime = new Date(certExpiry) - new Date();
      daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    const status = daysLeft <= 30 ? 'danger' : daysLeft <= 90 ? 'warning' : 'safe';

    if (staffId) {
      // Sửa nhân viên đã có
      const member = this.data.staff.find(s => s.id === staffId);
      if (member) {
        member.code = code;
        member.name = name;
        member.pin = pin;
        member.roleKey = roleKey;
        member.role = role;
        member.phone = phone;
        member.cchnNumber = cchnNumber;
        member.cchnScope = cchnScope;
        member.radiationCert = radiationCert;
        member.certDate = certDate;
        member.certExpiry = certExpiry;
        member.daysLeft = daysLeft;
        member.status = status;
        member.allowExternalAccess = allowExternalAccess;
      }
    } else {
      // Thêm nhân viên mới
      const newId = 'NV-' + (this.data.staff.length + 1).toString().padStart(2, '0');
      this.data.staff.push({
        id: newId,
        code: code,
        name: name,
        role: role,
        roleKey: roleKey,
        roleDescription: role,
        phone: phone,
        cchnNumber: cchnNumber || ('00' + Math.floor(1000 + Math.random() * 9000) + '/VP-CCHN'),
        cchnScope: cchnScope || 'Hồ sơ CĐHA Bệnh viện VPI',
        radiationCert: radiationCert,
        certDate: certDate,
        certExpiry: certExpiry || '2028-12-31',
        daysLeft: daysLeft,
        status: status,
        allowExternalAccess: allowExternalAccess,
        pin: pin,
        lastExternalLogin: 'Chưa đăng nhập'
      });
    }

    this.saveData();
    this.closeModal();
    this.render();
    alert('✅ Đã lưu thông tin cán bộ nhân viên thành công!');
  }

  deleteStaff(staffId) {
    if (staffId === this.data.auth.currentUserId) {
      alert('⛔ Bạn không thể xóa tài khoản mà bạn đang đăng nhập!');
      return;
    }
    const member = this.data.staff.find(s => s.id === staffId);
    if (!member) return;

    if (confirm(`Bạn có chắc chắn muốn xóa nhân sự "${member.name}" (${member.code}) khỏi danh sách Khoa CĐHA?`)) {
      this.data.staff = this.data.staff.filter(s => s.id !== staffId);
      this.saveData();
      this.render();
      alert(`Đã xóa nhân viên ${member.name} thành công!`);
    }
  }

  // ==========================================
  // QUẢN LÝ THIẾT BỊ: THÊM & CHỈNH SỬA & XÓA (DEVICE CRUD)
  // ==========================================
  openDeviceFormModal(deviceId = null) {
    const isEdit = !!deviceId;
    const dev = isEdit ? this.data.devices.find(d => d.id === deviceId) : {
      id: '',
      code: 'TB-' + (this.data.devices.length + 1),
      name: '',
      category: 'Bức xạ',
      subCategory: 'Cắt lớp vi tính',
      model: '',
      manufacturer: 'GE Healthcare',
      country: 'Mỹ',
      serialNumber: '',
      yearManufacture: 2022,
      yearUsage: 2022,
      room: 'Phòng CT-Scanner',
      roomLocation: 'Tầng 1 - Khoa CĐHA',
      personInCharge: 'KTV. Vũ Bá Đạt',
      phone: '0978.892.345',
      status: 'active',
      statusText: 'Đang hoạt động tốt',
      licenseNumber: 'GP-ATBX (Cục ATBXHN)',
      licenseAuthority: 'Cục An toàn bức xạ và hạt nhân',
      licenseExpiry: '2028-12-31',
      inspectionNumber: 'KĐ-VPI-2025',
      inspectionDate: '2025-10-15',
      inspectionExpiry: '2026-10-15',
      specifications: '',
      notes: ''
    };

    if (isEdit && !dev) return;

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[85vh] overflow-y-auto">
        <div class="flex items-start justify-between">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
              ${isEdit ? 'CẬP NHẬT THIẾT BỊ' : 'THÊM MỚI THIẾT BỊ'}
            </span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">
              ${isEdit ? `Chỉnh sửa: ${dev.name}` : 'Thêm Thiết Bị Chẩn Đoán Hình Ảnh'}
            </h3>
            <div class="text-xs text-slate-500">Bệnh viện Quốc tế Vĩnh Phúc (VPI)</div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form onsubmit="event.preventDefault(); radOpsApp.saveDeviceForm('${deviceId || ''}');" class="space-y-3 text-xs">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Mã định danh máy <span class="text-red-500">*</span></label>
              <input type="text" id="df-code" value="${dev.code}" required placeholder="Ví dụ: CT-03, MRI-02, XQ-03" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono font-bold text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Phân loại thiết bị <span class="text-red-500">*</span></label>
              <select id="df-category" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-900 dark:text-white">
                <option value="Bức xạ" ${dev.category === 'Bức xạ' ? 'selected' : ''}>⚡ Phát bức xạ X-ray (CT, X-quang, C-arm)</option>
                <option value="Từ trường" ${dev.category === 'Từ trường' ? 'selected' : ''}>🧲 Từ trường CHT (MRI 1.5T / 3.0T)</option>
                <option value="Không bức xạ" ${dev.category === 'Không bức xạ' ? 'selected' : ''}>🩺 Không bức xạ (Siêu âm, Máy in, PACS)</option>
                <option value="Đo lường" ${dev.category === 'Đo lường' ? 'selected' : ''}>💉 Đo lường / Bơm tiêm tự động</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Tên thiết bị y tế <span class="text-red-500">*</span></label>
            <input type="text" id="df-name" value="${dev.name}" required placeholder="Ví dụ: Máy Cắt lớp vi tính CT Revolution ACT GE" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Hãng sản xuất</label>
              <input type="text" id="df-manufacturer" value="${dev.manufacturer}" placeholder="GE Healthcare, Siemens..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Model máy</label>
              <input type="text" id="df-model" value="${dev.model}" placeholder="Revolution ACT, Signa..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white">
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Số Serial</label>
              <input type="text" id="df-serial" value="${dev.serialNumber}" placeholder="SN-xxx" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Nước SX</label>
              <input type="text" id="df-country" value="${dev.country}" placeholder="Mỹ, Đức..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Năm sử dụng</label>
              <input type="number" id="df-year" value="${dev.yearUsage}" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Phòng đặt máy <span class="text-red-500">*</span></label>
              <input type="text" id="df-room" value="${dev.room}" required placeholder="Phòng CT-Scanner, Phòng MRI..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Cán bộ phụ trách máy</label>
              <select id="df-person" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white">
                ${this.data.staff.map(s => `
                  <option value="${s.name}" ${s.name === dev.personInCharge ? 'selected' : ''}>${s.name} (${s.role})</option>
                `).join('')}
              </select>
            </div>
          </div>

          <!-- Thông số Pháp lý ATBX & Kiểm định -->
          <div class="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900/40 space-y-2">
            <div class="font-bold text-amber-900 dark:text-amber-300 flex items-center space-x-1">
              <i data-lucide="shield" class="w-3.5 h-3.5"></i>
              <span>Pháp lý Giấy phép Cục ATBX & Kiểm định định kỳ:</span>
            </div>
            
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Số Giấy phép ATBX</label>
                <input type="text" id="df-licNum" value="${dev.licenseNumber || ''}" placeholder="45/GP-ATBX (Cục ATBXHN)" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-slate-900 dark:text-white">
              </div>
              <div>
                <label class="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Hạn Giấy phép (NĐ 142)</label>
                <input type="date" id="df-licExp" value="${dev.licenseExpiry || ''}" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono text-slate-900 dark:text-white">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Số tem / GCN Kiểm định</label>
                <input type="text" id="df-insNum" value="${dev.inspectionNumber || ''}" placeholder="KĐ-CT-2025" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-slate-900 dark:text-white">
              </div>
              <div>
                <label class="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Hạn Kiểm định (TT 23)</label>
                <input type="date" id="df-insExp" value="${dev.inspectionExpiry || ''}" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono text-slate-900 dark:text-white">
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Trạng thái hoạt động</label>
              <select id="df-status" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-900 dark:text-white">
                <option value="active" ${dev.status === 'active' ? 'selected' : ''}>🟢 Đang hoạt động bình thường</option>
                <option value="warning" ${dev.status === 'warning' ? 'selected' : ''}>🟡 Cảnh báo / Sắp đến hạn kiểm định/GP</option>
                <option value="repair" ${dev.status === 'repair' ? 'selected' : ''}>🔴 Đang sửa chữa / Chờ kiểm định</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Số điện thoại phụ trách</label>
              <input type="text" id="df-phone" value="${dev.phone || '0978.892.345'}" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white">
            </div>
          </div>

          <div>
            <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Thông số kỹ thuật chính</label>
            <textarea id="df-specs" rows="2" placeholder="Ví dụ: 32 lát cắt/vòng quay; Gantry 70cm; Phần mềm ASiR..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-slate-900 dark:text-white">${dev.specifications || ''}</textarea>
          </div>

          <div class="flex items-center space-x-2 pt-2">
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 shadow-sm">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>${isEdit ? 'Lưu thông tin máy' : 'Tạo thiết bị mới'}</span>
            </button>
            <button type="button" onclick="radOpsApp.closeModal()" class="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold py-2.5 px-4 rounded-xl transition">
              Hủy
            </button>
          </div>
        </form>
      </div>
    `);
  }

  saveDeviceForm(deviceId = null) {
    const code = document.getElementById('df-code').value.trim();
    const category = document.getElementById('df-category').value;
    const name = document.getElementById('df-name').value.trim();
    const manufacturer = document.getElementById('df-manufacturer').value.trim();
    const model = document.getElementById('df-model').value.trim();
    const serialNumber = document.getElementById('df-serial').value.trim();
    const country = document.getElementById('df-country').value.trim();
    const yearUsage = parseInt(document.getElementById('df-year').value) || 2022;
    const room = document.getElementById('df-room').value.trim();
    const personInCharge = document.getElementById('df-person').value;
    const licenseNumber = document.getElementById('df-licNum').value.trim();
    const licenseExpiry = document.getElementById('df-licExp').value;
    const inspectionNumber = document.getElementById('df-insNum').value.trim();
    const inspectionExpiry = document.getElementById('df-insExp').value;
    const status = document.getElementById('df-status').value;
    const phone = document.getElementById('df-phone').value.trim();
    const specifications = document.getElementById('df-specs').value.trim();

    if (!code || !name || !room) {
      alert('Vui lòng điền đầy đủ Mã định danh, Tên máy và Phòng đặt máy!');
      return;
    }

    // Tính toán số ngày còn lại
    const now = new Date();
    let licenseDaysLeft = 365;
    let licenseAlertLevel = 'safe';
    if (licenseExpiry) {
      const diff = Math.ceil((new Date(licenseExpiry) - now) / (1000 * 60 * 60 * 24));
      licenseDaysLeft = diff;
      licenseAlertLevel = diff <= 45 ? 'danger' : diff <= 90 ? 'warning' : 'safe';
    }

    let inspectionDaysLeft = 365;
    let inspectionAlertLevel = 'safe';
    if (inspectionExpiry) {
      const diff = Math.ceil((new Date(inspectionExpiry) - now) / (1000 * 60 * 60 * 24));
      inspectionDaysLeft = diff;
      inspectionAlertLevel = diff <= 30 ? (diff <= 7 ? 'danger' : 'warning') : 'safe';
    }

    if (deviceId) {
      // Sửa máy đã có
      const dev = this.data.devices.find(d => d.id === deviceId);
      if (dev) {
        dev.code = code;
        dev.category = category;
        dev.name = name;
        dev.manufacturer = manufacturer;
        dev.model = model;
        dev.serialNumber = serialNumber;
        dev.country = country;
        dev.yearUsage = yearUsage;
        dev.room = room;
        dev.personInCharge = personInCharge;
        dev.licenseNumber = licenseNumber;
        dev.licenseExpiry = licenseExpiry;
        dev.licenseDaysLeft = licenseDaysLeft;
        dev.licenseAlertLevel = licenseAlertLevel;
        dev.inspectionNumber = inspectionNumber;
        dev.inspectionExpiry = inspectionExpiry;
        dev.inspectionDaysLeft = inspectionDaysLeft;
        dev.inspectionAlertLevel = inspectionAlertLevel;
        dev.status = status;
        dev.statusText = status === 'active' ? 'Đang hoạt động tốt' : status === 'warning' ? 'Sắp đến hạn kiểm định/GP' : 'Đang bảo dưỡng sửa chữa';
        dev.phone = phone;
        dev.specifications = specifications;
      }
    } else {
      // Thêm máy mới
      const newId = 'TB-' + (this.data.devices.length + 1).toString().padStart(2, '0');
      this.data.devices.push({
        id: newId,
        code: code,
        name: name,
        category: category,
        subCategory: category === 'Bức xạ' ? 'Phát tia X' : 'Chẩn đoán',
        model: model,
        manufacturer: manufacturer,
        country: country,
        serialNumber: serialNumber,
        yearManufacture: yearUsage,
        yearUsage: yearUsage,
        room: room,
        roomLocation: 'Tầng 1 - Khoa CĐHA',
        personInCharge: personInCharge,
        phone: phone,
        status: status,
        statusText: status === 'active' ? 'Đang hoạt động tốt' : status === 'warning' ? 'Cảnh báo hạn kiểm định' : 'Đang sửa chữa',
        licenseNumber: licenseNumber,
        licenseAuthority: 'Cục An toàn bức xạ và hạt nhân',
        licenseExpiry: licenseExpiry,
        licenseDaysLeft: licenseDaysLeft,
        licenseAlertLevel: licenseAlertLevel,
        inspectionNumber: inspectionNumber,
        inspectionDate: '2025-10-15',
        inspectionExpiry: inspectionExpiry,
        inspectionDaysLeft: inspectionDaysLeft,
        inspectionAlertLevel: inspectionAlertLevel,
        specifications: specifications,
        notes: 'Thiết bị mới bổ sung vào cơ sở dữ liệu BV VPI'
      });
    }

    this.saveData();
    this.closeModal();
    this.render();
    alert('✅ Đã lưu thiết bị chẩn đoán hình ảnh thành công!');
  }

  deleteDevice(deviceId) {
    const dev = this.data.devices.find(d => d.id === deviceId);
    if (!dev) return;

    if (confirm(`Bạn có chắc chắn muốn xóa thiết bị "${dev.name}" (${dev.code}) khỏi hệ thống BV VPI?`)) {
      this.data.devices = this.data.devices.filter(d => d.id !== deviceId);
      this.saveData();
      this.render();
      alert(`Đã xóa thiết bị ${dev.name} thành công!`);
    }
  }

  bindGlobalEvents() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }
}

// Khởi chạy ứng dụng toàn cục an toàn
let radOpsApp;
function initRadOpsApp() {
  if (!window.radOpsApp) {
    try {
      radOpsApp = new RadOpsApp();
      window.radOpsApp = radOpsApp;
    } catch (err) {
      console.error('[RADOPS] Critical Initialization Error:', err);
      const appEl = document.getElementById('app-container');
      if (appEl) {
        appEl.innerHTML = `
          <div class="p-6 text-center space-y-3">
            <div class="w-12 h-12 mx-auto rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center font-bold text-xl">⚠️</div>
            <h3 class="font-bold text-slate-800 dark:text-white text-base">Khởi động ứng dụng gặp sự cố</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 font-mono">${err.message || err}</p>
            <button onclick="localStorage.clear(); location.reload();" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition shadow-sm">
              Đặt lại dữ liệu & Tải lại trang
            </button>
          </div>
        `;
      }
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRadOpsApp);
} else {
  initRadOpsApp();
}

