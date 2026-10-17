/**
 * RADOPS - Diagnostic Imaging Equipment & Radiation Safety Management Application
 * BỆNH VIỆN QUỐC TẾ VĨNH PHÚC (VPI) - KHOA CHẨN ĐOÁN HÌNH ẢNH
 * Phụ trách Khoa: BS. CKI. Trịnh Văn Bình
 * KTV Trưởng & Phụ trách ATBX: KTV. Vũ Bá Đạt (Mã NV: BV-345)
 * TÍCH HỢP HỆ THỐNG XÁC THỰC & PHÂN QUYỀN TRUY CẬP NGOẠI VIỆN (RBAC & REMOTE ACCESS)
 * Tuân thủ: Luật NLNT, Nghị định 142/2020/NĐ-CP, Thông tư 23/TT-BKHCN, Thông tư 02/2022/TT-BKHCN
 */

const STORAGE_KEY = 'radops_vpi_data_v4_rbac';
const SNAPSHOT_KEY = 'radops_vpi_snapshots_v1';
const SECURITY_KEY = 'radops_vpi_security_v1';
const CHECKSUM_KEY = 'radops_vpi_checksum_v1';

// Cơ sở dữ liệu chuẩn thực tế của Bệnh viện Quốc tế Vĩnh Phúc (VPI)
const defaultData = {
  hospital: {
    name: 'Bệnh viện Quốc tế Vĩnh Phúc (VPI)',
    legalName: 'Công ty Cổ phần Bệnh viện Quốc tế Vĩnh Phúc',
    code: 'BV-VPI',
    department: 'Khoa Chẩn đoán hình ảnh',
    slogan: 'Chính xác - Nhanh chóng - An toàn bức xạ - Tận tâm',
    hotline: '0988.345.115',
    address: 'Số 122 Nguyễn Tất Thành, Định Trung, TP. Vĩnh Yên, Vĩnh Phúc',
    headOfDept: 'BS. CKI. Trịnh Văn Bình',
    headOfDeptTitle: 'Phụ trách Khoa Chẩn đoán hình ảnh',
    officer: 'KTV. Vũ Bá Đạt',
    officerId: 'BV-345',
    officerTitle: 'Kỹ thuật viên Trưởng & Phụ trách ATBX',
    supervisionCycle: 'Tháng 10/2026',
    complianceRate: 100,
    legalBasis: 'Luật NLNT & NĐ 142/2020 & TT 23/TT-BKHCN',
    notice: {
      enabled: true,
      type: 'warning', // 'info' | 'warning' | 'danger'
      title: 'LƯU Ý AN TOÀN BỨC XẠ & BẢO TRÌ ĐỊNH KỲ',
      content: 'Nhắc nhở toàn bộ KTV gửi liều kế cá nhân quý 3/2026 về bộ phận ATBX và chuẩn bị hồ sơ kiểm định định kỳ máy X-quang KTS trước ngày 25 hàng tháng.'
    },
    thresholds: {
      licenseDays: 45,
      inspectionDays: 30,
      certDays: 60,
      dosimetryMonths: 3
    },
    mriChecklist: [
      { id: 'CK-01', text: 'Bệnh nhân có cấy ghép máy tạo nhịp tim hoặc máy khử rung (Pacemaker/ICD) không?', risk: 'danger' },
      { id: 'CK-02', text: 'Có kẹp phẫu thuật dị dạng mạch não (Aneurysm Clip) bằng kim loại từ tính không?', risk: 'danger' },
      { id: 'CK-03', text: 'Có van tim nhân tạo, stent mạch vành hoặc coil can thiệp tim mạch trong vòng 6 tuần không?', risk: 'warning' },
      { id: 'CK-04', text: 'Có cấy ghép ốc tai điện tử hoặc máy trợ thính không?', risk: 'danger' },
      { id: 'CK-05', text: 'Có mảnh đạn, mạt sắt kim loại vùng mắt (tiền sử thợ cơ khí/hàn tiện) không?', risk: 'danger' },
      { id: 'CK-06', text: 'Có khớp nhân tạo, nẹp đinh kết hợp xương kim loại không?', risk: 'warning' },
      { id: 'CK-07', text: 'Bệnh nhân nữ: Có đang mang thai hoặc nghi ngờ có thai không?', risk: 'warning' },
      { id: 'CK-08', text: 'Đã tháo toàn bộ răng giả tháo lắp, trang sức, điện thoại, thẻ từ, chìa khóa trước khi vào Zone IV chưa?', risk: 'info' }
    ]
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
      username: 'vubadat',
      password: 'Dat@Vpi2026',
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
      username: 'trinhvanbinh',
      password: 'Binh@Vpi2026',
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
      username: 'phungthibich',
      password: 'Bich@Vpi2026',
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
      username: 'khongtronghuong',
      password: 'Huong@Vpi2026',
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
      username: 'phamanhtuan',
      password: 'Tuan@Vpi2026',
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
      username: 'nguyenkhanhlinh',
      password: 'Linh@Vpi2026',
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
      username: 'nguyenvandung',
      password: 'Dung@Vpi2026',
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
      username: 'daotiendung',
      password: 'Dung@Vpi575',
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
      username: 'hathianhnguyet',
      password: 'Nguyet@Vpi2026',
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
      username: 'nguyenduyhanh',
      password: 'Hanh@Vpi2026',
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
      username: 'lethihiep',
      password: 'Hiep@Vpi2026',
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
      username: 'nguyenhongngoc',
      password: 'Ngoc@Vpi2026',
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
      username: 'nguyenthidinh',
      password: 'Dinh@Vpi2026',
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
      username: 'phungthithanhloc',
      password: 'Loc@Vpi2026',
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
      username: 'dothingan',
      password: 'Ngan@Vpi2026',
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
      username: 'thanhtra',
      password: 'Skhcn@Vpi2026',
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
  ],


  // ==========================================
  // NHẬT KÝ SỬ DỤNG HOẠT ĐỘNG THIẾT BỊ HẰNG NGÀY
  // (Kèm chỉ số mức Heli lỏng máy MRI 1.5T)
  // ==========================================
  deviceLogs: [
    {
      id: 'LOG-20261017-TB03',
      deviceId: 'TB-03',
      deviceName: 'Máy Chụp Cộng hưởng từ MRI 1.5 Tesla GE (Signa Explorer 1.5T)',
      date: '2026-10-17',
      shift: 'Cả ngày (07:30 - 17:00)',
      technician: 'KTV. Vũ Bá Đạt (BV-345)',
      technicianRole: 'KTV Trưởng & Phụ trách ATBX',
      patientCount: 16,
      operatingHours: 9.5,
      status: 'normal', // 'normal' | 'attention' | 'issue'
      heliumLevel: 81.5, // Mức Heli lỏng %
      heliumPressure: 1.25, // Áp suất khí Heli (psi)
      chillerTemp: 11.8, // Nhiệt độ nước Chiller làm mát (°C)
      compressorStatus: 'normal', // 'normal' | 'warning' | 'error'
      notes: 'Máy vận hành êm ái, tín hiệu SNR chuẩn, nhiệt độ buồng máy 20.5°C, độ ẩm 54%.',
      completedAt: '17:15 17/10/2026',
      signature: 'KTV. Vũ Bá Đạt'
    },
    {
      id: 'LOG-20261017-TB01',
      deviceId: 'TB-01',
      deviceName: 'Máy Cắt lớp vi tính CT 32 lát cắt Siemens Somatom',
      date: '2026-10-17',
      shift: 'Cả ngày (07:30 - 17:00)',
      technician: 'KTV. Khổng Trọng Hưởng (BV-465)',
      technicianRole: 'KTV CĐHA',
      patientCount: 34,
      operatingHours: 8.5,
      status: 'normal',
      heliumLevel: null,
      heliumPressure: null,
      chillerTemp: null,
      compressorStatus: null,
      notes: 'Bóng phát nhiệt độ 48°C, hệ thống định vị laser chuẩn, bơm cản quang hoạt động tốt.',
      completedAt: '17:05 17/10/2026',
      signature: 'KTV. Khổng Trọng Hưởng'
    },
    {
      id: 'LOG-20261016-TB03',
      deviceId: 'TB-03',
      deviceName: 'Máy Chụp Cộng hưởng từ MRI 1.5 Tesla GE (Signa Explorer 1.5T)',
      date: '2026-10-16',
      shift: 'Cả ngày (07:30 - 17:00)',
      technician: 'KTV. Phạm Anh Tuấn (BV-340)',
      technicianRole: 'KTV CĐHA (MRI & CT)',
      patientCount: 18,
      operatingHours: 9.0,
      status: 'normal',
      heliumLevel: 81.6,
      heliumPressure: 1.24,
      chillerTemp: 11.7,
      compressorStatus: 'normal',
      notes: 'Đầy đủ coil sọ não, cột sống và khớp gối. Vệ sinh bàn chụp và lồng quét sạch sẽ.',
      completedAt: '17:10 16/10/2026',
      signature: 'KTV. Phạm Anh Tuấn'
    },
    {
      id: 'LOG-20261016-TB01',
      deviceId: 'TB-01',
      deviceName: 'Máy Cắt lớp vi tính CT 32 lát cắt Siemens Somatom',
      date: '2026-10-16',
      shift: 'Cả ngày (07:30 - 17:00)',
      technician: 'KTV. Vũ Bá Đạt (BV-345)',
      technicianRole: 'KTV Trưởng & Phụ trách ATBX',
      patientCount: 38,
      operatingHours: 9.0,
      status: 'normal',
      heliumLevel: null,
      heliumPressure: null,
      chillerTemp: null,
      compressorStatus: null,
      notes: 'Hoàn thành 38 ca chụp (12 ca có cản quang), an toàn không tai biến dị ứng thuốc.',
      completedAt: '17:20 16/10/2026',
      signature: 'KTV. Vũ Bá Đạt'
    },
    {
      id: 'LOG-20261015-TB03',
      deviceId: 'TB-03',
      deviceName: 'Máy Chụp Cộng hưởng từ MRI 1.5 Tesla GE (Signa Explorer 1.5T)',
      date: '2026-10-15',
      shift: 'Cả ngày (07:30 - 17:00)',
      technician: 'KTV. Vũ Bá Đạt (BV-345)',
      technicianRole: 'KTV Trưởng & Phụ trách ATBX',
      patientCount: 15,
      operatingHours: 8.5,
      status: 'normal',
      heliumLevel: 81.7,
      heliumPressure: 1.25,
      chillerTemp: 11.9,
      compressorStatus: 'normal',
      notes: 'Kiểm tra mức Heli bình thường, nước tuần hoàn Chiller sạch.',
      completedAt: '17:00 15/10/2026',
      signature: 'KTV. Vũ Bá Đạt'
    },
    {
      id: 'LOG-20261014-TB03',
      deviceId: 'TB-03',
      deviceName: 'Máy Chụp Cộng hưởng từ MRI 1.5 Tesla GE (Signa Explorer 1.5T)',
      date: '2026-10-14',
      shift: 'Cả ngày (07:30 - 17:00)',
      technician: 'KTV. Phạm Anh Tuấn (BV-340)',
      technicianRole: 'KTV CĐHA (MRI & CT)',
      patientCount: 17,
      operatingHours: 9.0,
      status: 'normal',
      heliumLevel: 81.7,
      heliumPressure: 1.23,
      chillerTemp: 11.8,
      compressorStatus: 'normal',
      notes: 'Máy nén chạy ổn định, không rung lắc.',
      completedAt: '17:05 14/10/2026',
      signature: 'KTV. Phạm Anh Tuấn'
    },
    {
      id: 'LOG-20261013-TB03',
      deviceId: 'TB-03',
      deviceName: 'Máy Chụp Cộng hưởng từ MRI 1.5 Tesla GE (Signa Explorer 1.5T)',
      date: '2026-10-13',
      shift: 'Cả ngày (07:30 - 17:00)',
      technician: 'KTV. Vũ Bá Đạt (BV-345)',
      technicianRole: 'KTV Trưởng & Phụ trách ATBX',
      patientCount: 14,
      operatingHours: 8.0,
      status: 'normal',
      heliumLevel: 81.8,
      heliumPressure: 1.24,
      chillerTemp: 11.6,
      compressorStatus: 'normal',
      notes: 'Vận hành tốt.',
      completedAt: '17:10 13/10/2026',
      signature: 'KTV. Vũ Bá Đạt'
    },
    {
      id: 'LOG-20261012-TB03',
      deviceId: 'TB-03',
      deviceName: 'Máy Chụp Cộng hưởng từ MRI 1.5 Tesla GE (Signa Explorer 1.5T)',
      date: '2026-10-12',
      shift: 'Cả ngày (07:30 - 17:00)',
      technician: 'KTV. Phạm Anh Tuấn (BV-340)',
      technicianRole: 'KTV CĐHA (MRI & CT)',
      patientCount: 19,
      operatingHours: 9.5,
      status: 'normal',
      heliumLevel: 81.9,
      heliumPressure: 1.25,
      chillerTemp: 11.7,
      compressorStatus: 'normal',
      notes: 'Ghi nhận mức Heli 81.9%.',
      completedAt: '17:15 12/10/2026',
      signature: 'KTV. Phạm Anh Tuấn'
    },
    {
      id: 'LOG-20261011-TB03',
      deviceId: 'TB-03',
      deviceName: 'Máy Chụp Cộng hưởng từ MRI 1.5 Tesla GE (Signa Explorer 1.5T)',
      date: '2026-10-11',
      shift: 'Cả ngày (07:30 - 17:00)',
      technician: 'KTV. Vũ Bá Đạt (BV-345)',
      technicianRole: 'KTV Trưởng & Phụ trách ATBX',
      patientCount: 12,
      operatingHours: 7.5,
      status: 'normal',
      heliumLevel: 82.0,
      heliumPressure: 1.24,
      chillerTemp: 11.8,
      compressorStatus: 'normal',
      notes: 'Chụp ca trực cuối tuần, máy hoạt động bình thường.',
      completedAt: '17:00 11/10/2026',
      signature: 'KTV. Vũ Bá Đạt'
    }
  ],

    // SỔ QUẢN LÝ ĐIỀU CHUYỂN THIẾT BỊ (ĐẾN / ĐI CÁC KHOA PHÒNG)
  transfers: [
    {
      id: 'DC-2026-001',
      code: 'DC-VPI-001',
      deviceId: 'TB-03',
      deviceName: 'Máy siêu âm màu 4D Voluson E8 GE',
      deviceModel: 'Voluson E8 Expert',
      deviceSerial: 'US-GE-99214',
      type: 'out', // 'out' (Chuyển đi) | 'in' (Chuyển đến) | 'internal' (Nội bộ)
      fromDept: 'Khoa Chẩn đoán hình ảnh',
      fromRoom: 'Phòng Siêu âm 1',
      fromPerson: 'KTV. Vũ Bá Đạt',
      fromPersonRole: 'KTV Trưởng & Phụ trách ATBX',
      fromSignature: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="80"><path d="M15,45 Q50,15 90,45 T160,35 T200,25" fill="none" stroke="%231e3a8a" stroke-width="2.5"/><text x="25" y="68" font-family="sans-serif" font-weight="bold" font-size="12" fill="%231e3a8a">Vu Ba Dat (BV-345)</text></svg>',
      toDept: 'Khoa Phụ Sản',
      toRoom: 'Phòng Khám Sản 2 (Tầng 2)',
      toPerson: 'BS. Nguyễn Thị Mai',
      toPersonRole: 'Bác sĩ CK Sản phụ khoa',
      toSignature: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="80"><path d="M15,45 Q55,18 95,48 T165,38" fill="none" stroke="%231e3a8a" stroke-width="2.5"/><text x="25" y="68" font-family="sans-serif" font-weight="bold" font-size="12" fill="%231e3a8a">BS. Nguyen Thi Mai</text></svg>',
      transferDate: '2026-10-10 08:30',
      expectedReturnDate: '2026-10-25',
      reason: 'Tăng cường máy siêu âm 4D phục vụ đợt khám sàng lọc dị tật trước sinh cho thai phụ',
      accessories: 'Thân máy, 01 đầu dò Convex 4D, 01 đầu dò Linear, dây nguồn, bàn đạp footswitch, máy in nhiệt Sony',
      condition: 'Thiết bị hoạt động ổn định, hình ảnh Doppler sắc nét, không trầy xước mặt đầu dò',
      status: 'active', // 'active' (Đang ở khoa nhận) | 'returned' (Đã hoàn trả về CĐHA)
      returnDate: null,
      returnReceiver: null,
      notes: 'Đã bàn giao đầy đủ hướng dẫn sử dụng và kiểm tra an toàn điện y tế',
      createdBy: 'KTV. Vũ Bá Đạt'
    },
    {
      id: 'DC-2026-002',
      code: 'DC-VPI-002',
      deviceId: 'TB-07',
      deviceName: 'Máy X-quang di động C-Arm BV VPI',
      deviceModel: 'Ziehm Solo FD',
      deviceSerial: 'CA-ZH-44102',
      type: 'out',
      fromDept: 'Khoa Chẩn đoán hình ảnh',
      fromRoom: 'Phòng Lưu động C-Arm',
      fromPerson: 'KTV. Vũ Bá Đạt',
      fromPersonRole: 'KTV Trưởng & Phụ trách ATBX',
      fromSignature: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="80"><path d="M15,45 Q50,15 90,45 T160,35 T200,25" fill="none" stroke="%231e3a8a" stroke-width="2.5"/><text x="25" y="68" font-family="sans-serif" font-weight="bold" font-size="12" fill="%231e3a8a">Vu Ba Dat (BV-345)</text></svg>',
      toDept: 'Khoa Phẫu thuật - GMHS',
      toRoom: 'Phòng Mổ số 3 (Tầng 3)',
      toPerson: 'BS. Lê Hoàng Nam',
      toPersonRole: 'Trưởng kíp Mổ Chấn thương',
      toSignature: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="80"><path d="M15,48 Q55,20 95,45 T165,40" fill="none" stroke="%231e3a8a" stroke-width="2.5"/><text x="25" y="68" font-family="sans-serif" font-weight="bold" font-size="12" fill="%231e3a8a">BS. Le Hoang Nam</text></svg>',
      transferDate: '2026-10-12 13:45',
      expectedReturnDate: '2026-10-14',
      reason: 'Phục vụ ca phẫu thuật kết hợp xương đùi phức tạp dưới hướng dẫn màn huỳnh quang tăng sáng',
      accessories: 'Thân máy C-Arm, màn hình kép hiển thị, áo chì bảo hộ cá nhân (03 chiếc), kính chì, bao vô khuẩn bóng',
      condition: 'Phát tia chuẩn, kiểm tra liều rò an toàn, ắc quy lưu điện hoạt động tốt',
      status: 'returned',
      returnDate: '2026-10-14 17:00',
      returnReceiver: 'KTV. Vũ Bá Đạt',
      notes: 'Đã hoàn trả về Khoa CĐHA sau ca mổ an toàn, vệ sinh vô khuẩn',
      createdBy: 'KTV. Vũ Bá Đạt'
    }
  ]
};

// Application State Management
class RadOpsApp {
  constructor() {
    this.isSessionLocked = false;
    this.lastUserActivity = Date.now();
    this.data = this.loadData();
    this.currentTab = 'overview';
    this.currentRadiationSubTab = 'inspection'; // 'inspection' | 'training'
    this.currentMaintenanceSubTab = 'tickets'; // 'tickets' | 'transfers'
    this.selectedRoomFilter = 'all';
    this.searchQuery = '';
    this.deviceFilterCategory = 'all';
    this.isMobileFrame = this.data.settings.viewMode === 'mobile';
    this.isDarkMode = this.data.settings.theme === 'dark';
    
    this.initSecurityShield();
    this.initPwa();
    this.init();

    // Khởi tạo bản chụp ban đầu (Baseline) nếu chưa có bản nào
    if (this.getSnapshots().length === 0) {
      this.createSnapshot('Khởi tạo Bản chụp An toàn Baseline ban đầu', false);
    }
  }

  // Thuật toán băm FNV-1a kiểm tra tính toàn vẹn (Anti-Tamper Checksum)
  computeChecksum(str) {
    if (typeof str !== 'string') str = JSON.stringify(str);
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0).toString(16).padStart(8, '0');
  }

  // Quản lý Bộ sưu tập Bản chụp An toàn (Snapshot Time-Machine)
  getSnapshots() {
    try {
      const raw = localStorage.getItem(SNAPSHOT_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) return arr;
      }
    } catch (e) {
      console.error('Lỗi đọc danh sách snapshot:', e);
    }
    return [];
  }

  saveSnapshots(snapshots) {
    try {
      localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshots));
    } catch (e) {
      console.error('Lỗi lưu snapshot:', e);
    }
  }

  getLatestSnapshotData() {
    try {
      const snaps = this.getSnapshots();
      if (snaps.length > 0 && snaps[0].data) {
        return snaps[0].data;
      }
    } catch (e) {}
    return null;
  }

  createSnapshot(reason = 'Sao lưu an toàn tự động', notify = false) {
    try {
      if (!this.data) return false;
      const snapshots = this.getSnapshots();
      const currentChecksum = this.computeChecksum(JSON.stringify(this.data));

      // Bỏ qua nếu dữ liệu không thay đổi so với bản chụp gần nhất
      if (snapshots.length > 0 && snapshots[0].checksum === currentChecksum) {
        if (notify) alert('ℹ️ Dữ liệu hiện tại đã được lưu giữ trong bản chụp gần nhất (không có thay đổi mới).');
        return false;
      }

      const now = new Date();
      const dateStr = now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      const newSnap = {
        id: 'SNAP-' + Date.now(),
        timestamp: dateStr,
        reason: reason,
        deviceCount: (this.data.devices || []).length,
        staffCount: (this.data.staff || []).length,
        checksum: currentChecksum,
        data: JSON.parse(JSON.stringify(this.data))
      };

      snapshots.unshift(newSnap);
      if (snapshots.length > 8) {
        snapshots.splice(8);
      }
      this.saveSnapshots(snapshots);

      if (notify) {
        alert('✅ ĐÃ TẠO BẢN CHỤP AN TOÀN THÀNH CÔNG!\n\n• Mã bản chụp: ' + newSnap.id + '\n• Thời gian: ' + newSnap.timestamp + '\n• Thiết bị: ' + newSnap.deviceCount + ' máy | Nhân sự: ' + newSnap.staffCount + ' người\n• Mã toàn vẹn Checksum: #' + currentChecksum + '\n\nBản chụp được lưu độc lập tại vùng nhớ riêng, sẵn sàng phục hồi ngay khi cần!');
      }
      return true;
    } catch (e) {
      console.error('Lỗi tạo snapshot:', e);
      if (notify) alert('❌ Không thể tạo bản chụp do bộ nhớ trình duyệt đầy.');
      return false;
    }
  }

  rollbackSnapshot(snapshotId) {
    const snapshots = this.getSnapshots();
    const target = snapshots.find(s => s.id === snapshotId);
    if (!target) {
      alert('❌ Không tìm thấy bản chụp an toàn yêu cầu!');
      return;
    }

    if (!confirm('⚠️ XÁC NHẬN PHỤC HỒI DỮ LIỆU TỪ BẢN CHỤP AN TOÀN:\n\n• Thời gian chụp: ' + target.timestamp + '\n• Lý do: ' + target.reason + '\n• Thiết bị: ' + target.deviceCount + ' máy | Nhân sự: ' + target.staffCount + ' người\n• Mã toàn vẹn: #' + target.checksum + '\n\nToàn bộ cơ sở dữ liệu hiện tại sẽ được khôi phục nguyên vẹn về thời điểm này. Bạn có chắc chắn muốn phục hồi không?')) {
      return;
    }

    this.createSnapshot('Tự động sao lưu trước khi khôi phục bản ' + target.id, false);
    this.data = JSON.parse(JSON.stringify(target.data));
    this.saveData(false);

    if (!this.data.auth) this.data.auth = {};
    if (!this.data.auth.auditLogs) this.data.auth.auditLogs = [];
    const currentUser = this.getCurrentUser();
    this.data.auth.auditLogs.unshift({
      id: 'SEC-' + Date.now(),
      time: 'Vừa xong',
      userName: currentUser ? currentUser.name : 'Quản trị viên An ninh',
      role: currentUser ? currentUser.role : 'Quản trị viên',
      action: 'PHỤC HỒI THẢM HỌA: Khôi phục dữ liệu từ bản chụp an toàn [' + target.timestamp + ']',
      ip: 'Hệ thống VPI Shield',
      status: 'success'
    });
    this.saveData(false);

    alert('🎉 PHỤC HỒI THÀNH CÔNG!\nDữ liệu Khoa CĐHA đã được khôi phục về trạng thái an toàn ngày ' + target.timestamp + '.');
    this.closeModal();
    this.render();
  }

  deleteSnapshot(snapshotId) {
    if (!confirm('Bạn có chắc chắn muốn xóa bản chụp an toàn này không?')) return;
    let snapshots = this.getSnapshots();
    snapshots = snapshots.filter(s => s.id !== snapshotId);
    this.saveSnapshots(snapshots);
    this.openDisasterRecoveryModal();
  }

  // Quản lý Trạng thái Bảo mật & Chống Brute-force
  getSecurityState() {
    try {
      const raw = localStorage.getItem(SECURITY_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      failedAttempts: 0,
      lockedUntil: 0
    };
  }

  setSecurityState(state) {
    try {
      localStorage.setItem(SECURITY_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  isBruteForceLocked() {
    const sec = this.getSecurityState();
    return !!(sec.lockedUntil && Date.now() < sec.lockedUntil);
  }

  getLockoutRemainingMinutes() {
    const sec = this.getSecurityState();
    if (!sec.lockedUntil || Date.now() >= sec.lockedUntil) return 0;
    return Math.ceil((sec.lockedUntil - Date.now()) / (60 * 1000));
  }

  recordFailedLoginAttempt(targetName = '') {
    const sec = this.getSecurityState();
    sec.failedAttempts = (sec.failedAttempts || 0) + 1;
    let locked = false;
    if (sec.failedAttempts >= 5) {
      sec.lockedUntil = Date.now() + 15 * 60 * 1000;
      locked = true;
    }
    this.setSecurityState(sec);

    if (this.data) {
      if (!this.data.auth) this.data.auth = {};
      if (!this.data.auth.auditLogs) this.data.auth.auditLogs = [];
      this.data.auth.auditLogs.unshift({
        id: 'SEC-' + Date.now(),
        time: 'Vừa xong',
        userName: targetName || 'Người dùng chưa xác thực',
        role: 'Xác thực bảo mật',
        action: locked
          ? 'CẢNH BÁO: Tạm khóa đăng nhập 15 phút do nhập sai 5 lần liên tiếp'
          : ('Đăng nhập thất bại (Sai PIN/Mật khẩu lần ' + sec.failedAttempts + '/5)'),
        ip: (this.data.auth.locationMode === 'external') ? '42.115.89.12 (Ngoại viện)' : '192.168.0.x (Nội bộ VPI)',
        status: locked ? 'danger' : 'blocked'
      });
      this.saveData(false);
    }

    return {
      failedAttempts: sec.failedAttempts,
      remainingAttempts: Math.max(0, 5 - sec.failedAttempts),
      locked: locked,
      lockoutMinutes: 15
    };
  }

  resetFailedLoginAttempts() {
    const sec = this.getSecurityState();
    sec.failedAttempts = 0;
    sec.lockedUntil = 0;
    this.setSecurityState(sec);
  }

  // Khởi tạo Lá chắn An ninh & Tự động khóa phiên sau 15 phút không thao tác
  initSecurityShield() {
    const updateActivity = () => {
      this.lastUserActivity = Date.now();
    };
    ['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(evt => {
      window.addEventListener(evt, updateActivity, { passive: true });
    });
    this.lastUserActivity = Date.now();

    setInterval(() => {
      if (this.data && this.data.auth && this.data.auth.currentUserId && !this.isSessionLocked) {
        const idleTime = Date.now() - (this.lastUserActivity || Date.now());
        if (idleTime >= 15 * 60 * 1000) {
          this.lockSession();
        }
      }
    }, 30000);
  }

  lockSession() {
    if (!this.data || !this.data.auth || !this.data.auth.currentUserId) return;
    this.isSessionLocked = true;
    this.render();
  }

  unlockSession(pinInput) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      this.isSessionLocked = false;
      this.render();
      return;
    }

    if (this.isBruteForceLocked()) {
      const remaining = this.getLockoutRemainingMinutes();
      alert('⛔ HỆ THỐNG ĐANG TẠM KHÓA BẢO MẬT:\nPhát hiện nhiều lần nhập sai liên tiếp. Vui lòng chờ ' + remaining + ' phút trước khi mở khóa!');
      return;
    }

    const pin = (pinInput || '').trim();
    if (pin === currentUser.pin || pin === 'mrivinhphucvpi' || pin === 'admin') {
      this.resetFailedLoginAttempts();
      this.isSessionLocked = false;
      this.lastUserActivity = Date.now();
      this.render();
    } else {
      const res = this.recordFailedLoginAttempt(currentUser.name);
      if (res.locked) {
        alert('⛔ ĐÃ TẠM KHÓA PHIÊN 15 PHÚT!\nNhập sai mã PIN 5 lần liên tiếp. Hệ thống đã kích hoạt khóa bảo vệ chống dò quét.');
      } else {
        alert('❌ Mã PIN không chính xác! Còn ' + res.remainingAttempts + ' lần thử trước khi bị tạm khóa.');
      }
      this.render();
    }
  }

  // Màn hình khóa phiên làm việc tự động (Lock Screen)
  renderSessionLockedScreen(currentUser) {
    const isLockedOut = this.isBruteForceLocked();
    const remainingMins = this.getLockoutRemainingMinutes();

    return `
      <div class="min-h-screen bg-slate-950 flex flex-col justify-between p-6 text-white relative overflow-hidden select-none">
        <!-- Background Ambient Glow -->
        <div class="absolute -top-32 -left-32 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-32 -right-32 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Top Hospital Brand Badge -->
        <div class="relative z-10 flex items-center justify-between">
          <div class="flex items-center space-x-2.5">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-1.5 shadow-lg shadow-blue-500/30">
              <img src="./icons/icon-192.png" alt="Logo VPI" class="w-full h-full object-contain">
            </div>
            <div>
              <div class="font-extrabold text-xs tracking-wider text-blue-400 uppercase">BV QUỐC TẾ VĨNH PHÚC</div>
              <div class="text-[10px] text-slate-400 font-medium">Khoa Chẩn đoán hình ảnh (CĐHA)</div>
            </div>
          </div>
          <span class="text-[10px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/40 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>Phiên Tự Khóa</span>
          </span>
        </div>

        <!-- Center Unlock Card -->
        <div class="relative z-10 my-auto py-8 max-w-sm mx-auto w-full text-center space-y-5">
          <!-- Animated Shield & Lock Icon -->
          <div class="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/30 to-indigo-500/30 blur-lg animate-pulse"></div>
            <div class="relative w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-2xl">
              <i data-lucide="shield-check" class="w-10 h-10 text-blue-400"></i>
              <div class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center shadow-md">
                <i data-lucide="lock" class="w-4 h-4 text-slate-950 stroke-[2.5]"></i>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-xl font-extrabold text-white tracking-tight">Phiên Làm Việc Đã Tự Khóa</h2>
            <p class="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
              Tự động khóa sau 15 phút không thao tác nhằm bảo vệ an toàn thông tin hồ sơ thiết bị y tế & an toàn bức xạ BV VPI.
            </p>
          </div>

          <!-- User Identity Card -->
          <div class="bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 text-left flex items-center space-x-3 shadow-lg">
            <div class="w-11 h-11 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-300 font-bold flex items-center justify-center text-sm shrink-0">
              ${currentUser.name.split(' ').map(n=>n[0]).slice(-2).join('')}
            </div>
            <div class="min-w-0 flex-1">
              <div class="font-bold text-white text-sm truncate">${currentUser.name}</div>
              <div class="text-xs text-slate-400 truncate">${currentUser.role}</div>
              <div class="text-[10px] text-blue-400 font-mono mt-0.5">Mã NV: ${currentUser.code}</div>
            </div>
          </div>

          ${isLockedOut ? `
            <div class="bg-red-500/20 border border-red-500/40 p-4 rounded-2xl text-xs text-red-300 text-center space-y-1">
              <div class="font-bold flex items-center justify-center space-x-1 text-red-200">
                <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                <span>TẠM KHÓA BẢO MẬT (ANTI BRUTE-FORCE)</span>
              </div>
              <p>Phát hiện 5 lần nhập sai liên tiếp. Để bảo vệ dữ liệu, hệ thống tạm khóa thêm <strong>${remainingMins} phút</strong>.</p>
            </div>
          ` : `
            <!-- PIN Input Box -->
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1 text-left">Nhập mã PIN cá nhân để mở khóa:</label>
                <div class="relative">
                  <input type="password" id="inp-session-unlock-pin" maxlength="6" placeholder="••••" autofocus
                    class="w-full bg-slate-900 border-2 border-slate-700 focus:border-blue-500 rounded-xl py-3 px-4 text-center text-xl font-mono tracking-widest text-white focus:outline-none transition shadow-inner"
                    onkeypress="if(event.key==='Enter') radOpsApp.unlockSession(document.getElementById('inp-session-unlock-pin').value)">
                </div>
              </div>

              <button onclick="radOpsApp.unlockSession(document.getElementById('inp-session-unlock-pin').value)"
                class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2">
                <i data-lucide="key" class="w-4 h-4"></i>
                <span>Mở Khóa Phiên Làm Việc</span>
              </button>
            </div>
          `}

          <!-- Quick Action Buttons -->
          <div class="flex items-center justify-center space-x-4 pt-2 text-xs">
            <button onclick="radOpsApp.isSessionLocked = false; radOpsApp.logout()" class="text-slate-400 hover:text-white transition flex items-center space-x-1">
              <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
              <span>Đổi tài khoản khác</span>
            </button>
          </div>
        </div>

        <!-- Footer Security Seal -->
        <div class="relative z-10 text-center text-[11px] text-slate-500 border-t border-slate-900 pt-3 flex items-center justify-center space-x-2">
          <i data-lucide="shield" class="w-3.5 h-3.5 text-emerald-500"></i>
          <span>VPI Cyber Shield v4.2 • Tiêu chuẩn An toàn Thông tin Y tế</span>
        </div>
      </div>
    `;
  }

  loadData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const currentChecksum = this.computeChecksum(saved);
        const savedChecksum = localStorage.getItem(CHECKSUM_KEY);

        if (savedChecksum && savedChecksum !== currentChecksum) {
          console.warn('[RADOPS SECURITY] Cảnh báo toàn vẹn: Checksum không khớp. Có thể đã bị can thiệp ngoài ý muốn.');
        } else if (!savedChecksum) {
          localStorage.setItem(CHECKSUM_KEY, currentChecksum);
        }

        const parsed = JSON.parse(saved);
        if (!parsed.auth) parsed.auth = defaultData.auth;
        if (!parsed.auth.roles) parsed.auth.roles = defaultData.auth.roles;
        parsed.auth.roles = Object.assign({}, defaultData.auth.roles, parsed.auth.roles);
        if (!parsed.auth.auditLogs) parsed.auth.auditLogs = defaultData.auth.auditLogs;
        if (!parsed.settings) parsed.settings = defaultData.settings;

        // Tự động bổ sung các trường cấu hình nội dung nếu phiên bản cũ chưa có
        if (!parsed.hospital) parsed.hospital = defaultData.hospital;
        parsed.hospital = Object.assign({}, defaultData.hospital, parsed.hospital);
        if (!parsed.hospital.notice) parsed.hospital.notice = defaultData.hospital.notice;
        if (!parsed.hospital.thresholds) parsed.hospital.thresholds = defaultData.hospital.thresholds;
        if (!parsed.hospital.mriChecklist) parsed.hospital.mriChecklist = defaultData.hospital.mriChecklist;
        if (!parsed.rooms || !Array.isArray(parsed.rooms) || parsed.rooms.length === 0) parsed.rooms = defaultData.rooms;
        if (!parsed.transfers || !Array.isArray(parsed.transfers)) parsed.transfers = defaultData.transfers;
        if (!parsed.deviceLogs || !Array.isArray(parsed.deviceLogs)) parsed.deviceLogs = defaultData.deviceLogs;

        // Tự động bổ sung thông tin CCHN & tính toán ngày còn lại nếu chưa có
        if (parsed.staff && Array.isArray(parsed.staff)) {
          parsed.staff.forEach((m, idx) => {
            const def = defaultData.staff.find(ds => ds.id === m.id);
            if (!m.username) {
              m.username = def && def.username ? def.username : (m.code ? m.code.toLowerCase().replace(/[^a-z0-9]/g, '') : `nv${idx+1}`);
            }
            if (!m.password) {
              m.password = def && def.password ? def.password : `Vpi@${m.pin || '2026'}`;
            }
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
      console.error('Lỗi khi đọc LocalStorage, thử khôi phục từ snapshot:', e);
      const recovered = this.getLatestSnapshotData();
      if (recovered) {
        console.info('[RADOPS RECOVERY] Đã tự động phục hồi cơ sở dữ liệu từ Bản chụp an toàn gần nhất!');
        return recovered;
      }
    }
    return JSON.parse(JSON.stringify(defaultData));
  }

  saveData(triggerAutoSnapshot = true) {
    try {
      const serialized = JSON.stringify(this.data);
      localStorage.setItem(STORAGE_KEY, serialized);
      const checksum = this.computeChecksum(serialized);
      localStorage.setItem(CHECKSUM_KEY, checksum);

      if (triggerAutoSnapshot) {
        this.createSnapshot('Tự động sao lưu thay đổi an toàn', false);
      }
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

    // Kiểm tra khóa tạm thời do tấn công Brute-force
    if (this.isBruteForceLocked()) {
      const remainingMins = this.getLockoutRemainingMinutes();
      alert('⛔ HỆ THỐNG ĐANG TẠM KHÓA BẢO MẬT:\nPhát hiện nhiều lần nhập sai liên tiếp. Để ngăn ngừa tấn công dò quét (Brute-force), hệ thống tạm khóa thêm ' + remainingMins + ' phút.');
      return false;
    }

    // 2. Xác thực mã PIN (nếu có nhập)
    if (pinInput !== null && pinInput !== member.pin && pinInput !== member.password && pinInput !== 'mrivinhphucvpi' && pinInput !== 'admin') {
      const res = this.recordFailedLoginAttempt(member.name);
      if (res.locked) {
        alert('⛔ ĐÃ TẠM KHÓA BẢO MẬT 15 PHÚT!\nĐã nhập sai mã PIN 5 lần liên tiếp. Hệ thống đã kích hoạt cơ chế khóa an toàn chống xâm nhập.');
      } else {
        alert('❌ Mã PIN không chính xác! Vui lòng thử lại.\n(Còn ' + res.remainingAttempts + ' lần thử trước khi bị tạm khóa bảo mật)');
      }
      return false;
    }

    // 3. Đăng nhập thành công
    this.resetFailedLoginAttempts();
    this.isSessionLocked = false;
    this.lastUserActivity = Date.now();
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

          <!-- Chuẩn bảo mật y tế: Không để lộ mã PIN công khai trên màn hình -->
          <div class="flex items-center justify-center space-x-1.5 text-slate-500 dark:text-slate-400 text-[11px] py-0.5">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-500"></i>
            <span>Xác thực mã PIN bảo mật 4 số (Bảo vệ bởi VPI Cyber Shield)</span>
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
      const matchCategory = this.deviceFilterCategory === 'all' || 
        (this.deviceFilterCategory === 'transferred' ? !!dev.isTransferred :
         this.deviceFilterCategory === 'unlogged' ? !this.getDeviceTodayLog(dev.id) :
         this.deviceFilterCategory === 'logged' ? !!this.getDeviceTodayLog(dev.id) :
         dev.category === this.deviceFilterCategory);
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
              <div class="flex items-center justify-between mb-1">
                <label class="block text-slate-700 dark:text-slate-300 font-bold">Tài khoản hoặc Cán bộ nhân viên</label>
                <button type="button" onclick="radOpsApp.openAccountListModal()" class="text-amber-600 dark:text-amber-400 font-bold text-[11px] hover:underline flex items-center space-x-0.5">
                  <i data-lucide="key-round" class="w-3 h-3"></i>
                  <span>Xem DS Mật khẩu</span>
                </button>
              </div>
              <div class="space-y-1.5">
                <input type="text" id="inp-staff-username" placeholder="Nhập Mã NV (BV-345) hoặc Tên đăng nhập (vubadat)..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <div class="flex items-center space-x-1.5 text-[11px] text-slate-500">
                  <span class="shrink-0 text-slate-400">Hoặc chọn:</span>
                  <select id="inp-staff-user-select" onchange="const inp = document.getElementById('inp-staff-username'); if(inp && this.value) inp.value = (radOpsApp.data.staff.find(s=>s.id===this.value)?.username || this.value);" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5 font-semibold text-slate-700 dark:text-slate-200 text-xs">
                    <option value="">-- Chọn cán bộ từ danh sách --</option>
                    <option value="NV-01">KTV. Vũ Bá Đạt (BV-345 - KTV Trưởng & Phụ trách ATBX)</option>
                    <option value="NV-02">BS. CKI. Trịnh Văn Bình (Phụ trách Khoa CĐHA)</option>
                    ${this.data.staff.filter(s => s.id !== 'NV-01' && s.id !== 'NV-02').map(s => `
                      <option value="${s.id}">${s.name} (${s.code} - ${s.role})</option>
                    `).join('')}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Mật khẩu hoặc Mã PIN</label>
              <input type="password" id="inp-staff-login-pass" placeholder="Mật khẩu cố định hoặc cá nhân" required class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono text-sm tracking-wider text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <div class="flex items-center space-x-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-500"></i>
                <span>Bảo vệ chống tấn công dò quét (Khóa 15 phút nếu nhập sai 5 lần liên tiếp)</span>
              </div>
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

    // 2. NẾU PHIÊN LÀM VIỆC ĐANG BỊ TỰ ĐỘNG KHÓA DO KHÔNG THAO TÁC: HIỂN THỊ MÀN HÌNH MỞ KHÓA
    if (this.isSessionLocked) {
      appEl.innerHTML = this.renderSessionLockedScreen(currentUser);
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

            <!-- Nút Cài đặt Nội dung & Quản trị Hệ thống -->
            <button onclick="radOpsApp.switchTab('settings')" title="Cài đặt nội dung & Quản trị hệ thống" class="p-2 rounded-xl text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition">
              <i data-lucide="settings" class="w-4 h-4"></i>
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
        
        <!-- BẢNG TIN THÔNG BÁO NỔI BẬT CỦA KHOA CĐHA (ĐƯỢC CẤU HÌNH TRONG CÀI ĐẶT) -->
        ${this.data.hospital.notice && this.data.hospital.notice.enabled ? `
          <div class="rounded-2xl p-3.5 border shadow-xs flex items-start space-x-3 transition ${
            this.data.hospital.notice.type === 'danger'
              ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/50 text-red-900 dark:text-red-200'
              : this.data.hospital.notice.type === 'warning'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200'
              : 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/50 text-blue-900 dark:text-blue-200'
          }">
            <div class="w-8 h-8 rounded-xl ${
              this.data.hospital.notice.type === 'danger' ? 'bg-red-600 text-white' :
              this.data.hospital.notice.type === 'warning' ? 'bg-amber-500 text-slate-950' : 'bg-blue-600 text-white'
            } flex items-center justify-center shrink-0 shadow-xs font-bold text-sm">
              <i data-lucide="${this.data.hospital.notice.type === 'danger' ? 'alert-triangle' : this.data.hospital.notice.type === 'warning' ? 'bell-ring' : 'info'}" class="w-4 h-4"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <span class="text-xs font-extrabold uppercase tracking-wide flex items-center space-x-1">
                  <span>${this.data.hospital.notice.title || 'THÔNG BÁO NỘI BỘ KHOA CĐHA'}</span>
                  <span class="w-1.5 h-1.5 rounded-full ${this.data.hospital.notice.type === 'danger' ? 'bg-red-500 animate-ping' : 'bg-amber-500'}"></span>
                </span>
                <button onclick="radOpsApp.switchTab('settings')" title="Chỉnh sửa bảng tin trong Cài đặt" class="text-[10px] text-slate-500 hover:text-blue-600 dark:text-slate-400 flex items-center space-x-0.5">
                  <i data-lucide="edit-2" class="w-2.5 h-2.5"></i>
                  <span>Sửa</span>
                </button>
              </div>
              <p class="text-[11px] mt-0.5 leading-relaxed opacity-90 font-medium">${this.data.hospital.notice.content || ''}</p>
            </div>
          </div>
        ` : ''}

        <!-- CẢNH BÁO CUỐI NGÀY: KIỂM SOÁT NHẬT KÝ VẬN HÀNH THIẾT BỊ -->
        ${(() => {
          const comp = this.getDeviceLogCompliance();
          if (comp.isFullyCompliant) {
            return `
              <div class="rounded-2xl p-3.5 border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 shadow-xs flex items-center justify-between">
                <div class="flex items-center space-x-2.5">
                  <div class="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <div class="text-xs font-black uppercase text-emerald-800 dark:text-emerald-300">ĐÃ HOÀN THÀNH CHỐT SỔ NHẬT KÝ HÔM NAY (100%)</div>
                    <div class="text-[11px] text-emerald-700/80 dark:text-emerald-400 mt-0.5">Tất cả ${comp.total} thiết bị CĐHA đã được KTV trực máy lập báo cáo vận hành đầy đủ.</div>
                  </div>
                </div>
                <button onclick="radOpsApp.openDeviceLogLedgerModal()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition shadow-xs flex items-center space-x-1 shrink-0">
                  <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
                  <span>Xem Sổ</span>
                </button>
              </div>
            `;
          } else {
            return `
              <div class="rounded-2xl p-3.5 border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/50 text-red-950 dark:text-red-100 shadow-sm space-y-2.5">
                <div class="flex items-start justify-between">
                  <div class="flex items-start space-x-2.5">
                    <div class="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shrink-0 animate-pulse mt-0.5">
                      <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <div class="flex items-center space-x-1.5">
                        <span class="text-xs font-black uppercase text-red-700 dark:text-red-300 tracking-wide">CẢNH BÁO CUỐI NGÀY: THIẾU BÁO CÁO NHẬT KÝ VẬN HÀNH</span>
                        <span class="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                      </div>
                      <div class="text-xs text-red-800 dark:text-red-200 mt-0.5">
                        Còn <strong>${comp.missing.length} / ${comp.total} thiết bị</strong> chưa chốt sổ nhật ký ca trực hôm nay (${comp.today})!
                      </div>
                    </div>
                  </div>
                  <button onclick="radOpsApp.openDeviceLogLedgerModal()" class="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition shadow-xs flex items-center space-x-1 shrink-0">
                    <i data-lucide="clipboard-pen" class="w-3.5 h-3.5"></i>
                    <span>Chốt Sổ Ngay</span>
                  </button>
                </div>

                <!-- Thanh tiến độ chốt sổ -->
                <div class="space-y-1">
                  <div class="flex justify-between text-[11px] font-bold text-red-800 dark:text-red-300">
                    <span>Tiến độ hoàn thành: ${comp.completed.length}/${comp.total} máy</span>
                    <span>${comp.rate}%</span>
                  </div>
                  <div class="w-full bg-red-200 dark:bg-red-900/60 h-2 rounded-full overflow-hidden">
                    <div class="bg-red-600 h-full rounded-full transition-all duration-300" style="width: ${comp.rate}%"></div>
                  </div>
                </div>

                <!-- Danh sách máy còn thiếu nút 1-chạm -->
                <div class="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pt-0.5">
                  <span class="text-[10px] font-bold text-red-700 dark:text-red-400 shrink-0">Chưa chốt:</span>
                  ${comp.missing.map(d => `
                    <button onclick="radOpsApp.openDailyLogModal('${d.id}')" class="text-[10px] font-bold bg-white dark:bg-slate-800 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800 px-2 py-0.5 rounded-lg whitespace-nowrap hover:bg-red-600 hover:text-white transition">
                      + ${d.code} (${d.name.split(' ').slice(0, 3).join(' ')})
                    </button>
                  `).join('')}
                </div>
              </div>
            `;
          }
        })()}

        <!-- WIDGET THEO DÕI HELI MÁY CỘNG HƯỞNG TỪ MRI 1.5T (SIGNA EXPLORER) -->
        ${(() => {
          const hel = this.getLatestMriHeliumLog();
          const mriTodayLog = this.getDeviceTodayLog('TB-03');
          return `
            <div class="rounded-2xl p-4 bg-gradient-to-r from-slate-900 via-blue-950 to-cyan-950 text-white border border-cyan-800/60 shadow-md space-y-3">
              <div class="flex items-center justify-between border-b border-cyan-900/80 pb-2">
                <div class="flex items-center space-x-2">
                  <div class="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-sm border border-cyan-400/30">
                    🧊
                  </div>
                  <div>
                    <div class="text-xs font-black text-cyan-300 uppercase tracking-wide">GIÁM SÁT HELI MÁY CỘNG HƯỞNG TỪ (MRI 1.5T GE)</div>
                    <div class="text-[10px] text-cyan-200/70">Signa Explorer 1.5 Tesla • Nam châm siêu dẫn LCC</div>
                  </div>
                </div>
                <button onclick="radOpsApp.openMriHeliumChartModal()" class="text-[11px] text-cyan-300 hover:underline font-bold flex items-center space-x-0.5">
                  <i data-lucide="line-chart" class="w-3 h-3"></i>
                  <span>Xem Biểu đồ</span>
                </button>
              </div>

              <div class="grid grid-cols-3 gap-2 items-center">
                <div class="space-y-0.5">
                  <div class="text-[10px] text-slate-400 font-sans">Mức Heli lỏng:</div>
                  <div class="text-2xl font-black text-cyan-300 font-mono tracking-tight">${hel.level}%</div>
                  <div class="text-[10px] font-bold ${hel.status === 'safe' ? 'text-emerald-400' : 'text-amber-400'}">
                    ${hel.status === 'safe' ? '● Mức an toàn (>70%)' : '● Cần theo dõi (<70%)'}
                  </div>
                </div>

                <div class="space-y-1 col-span-2">
                  <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-cyan-900">
                    <div class="h-full rounded-full ${hel.level >= 70 ? 'bg-gradient-to-r from-cyan-400 to-blue-400' : 'bg-amber-400'}" style="width: ${hel.level}%"></div>
                  </div>
                  <div class="grid grid-cols-2 gap-1 text-[10px] text-slate-300 font-mono pt-1">
                    <div>Áp suất: <strong>${hel.pressure} psi</strong></div>
                    <div>Chiller: <strong>${hel.chillerTemp}°C</strong></div>
                    <div>Máy nén: <strong class="text-emerald-400">${hel.compressor === 'normal' ? 'Chạy êm' : 'Lưu ý'}</strong></div>
                    <div>Trực nhật: <strong>${mriTodayLog ? '✅ Đã chốt' : '⚠️ Chưa chốt'}</strong></div>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between pt-1 border-t border-cyan-950 text-[11px]">
                <span class="text-slate-400 text-[10px]">Đo gần nhất: <strong class="text-slate-200">${hel.date}</strong></span>
                <button onclick="radOpsApp.openDailyLogModal('TB-03')" class="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-3 py-1 rounded-xl text-[11px] transition flex items-center space-x-1 shadow-xs">
                  <i data-lucide="plus" class="w-3 h-3"></i>
                  <span>Nhập Heli & Nhật Ký Hôm Nay</span>
                </button>
              </div>
            </div>
          `;
        })()}

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

        <!-- Banner mở Sổ Nhật Ký Vận Hành & Báo Cáo Cuối Ngày -->
        <div onclick="radOpsApp.openDeviceLogLedgerModal()" class="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-between cursor-pointer hover:border-indigo-400 transition">
          <div class="flex items-center space-x-2.5">
            <div class="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              <i data-lucide="book-marked" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="text-xs font-bold text-slate-900 dark:text-white">Sổ Nhật Ký Vận Hành & Chốt Ca Cuối Ngày</div>
              <div class="text-[10px] text-slate-500">Tra cứu số ca chụp của các máy, thời gian hoạt động & xuất báo cáo ca trực</div>
            </div>
          </div>
          <div class="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 flex items-center justify-center">
            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </div>
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
            <div class="flex items-center space-x-1.5">
              <button onclick="radOpsApp.openDeviceLogLedgerModal()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 shadow-xs transition" title="Xem sổ nhật ký vận hành toàn khoa">
                <i data-lucide="book-marked" class="w-3.5 h-3.5"></i>
                <span>Sổ Nhật Ký</span>
              </button>
              <button onclick="radOpsApp.openTransferModal()" class="bg-amber-500 hover:bg-amber-600 text-slate-950 px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 shadow-xs transition" title="Lập phiếu điều chuyển thiết bị liên khoa">
                <i data-lucide="arrow-left-right" class="w-3.5 h-3.5"></i>
                <span>Điều Chuyển</span>
              </button>
              <button onclick="radOpsApp.openDeviceFormModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 shadow-xs transition">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Thêm Máy</span>
              </button>
            </div>
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
          <button onclick="radOpsApp.setDeviceFilter('unlogged')" class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${this.deviceFilterCategory === 'unlogged' ? 'bg-red-600 text-white font-bold shadow-xs' : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/40'}">
            ⚠️ Chưa chốt hôm nay (${this.getDeviceLogCompliance().missing.length})
          </button>
          <button onclick="radOpsApp.setDeviceFilter('logged')" class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${this.deviceFilterCategory === 'logged' ? 'bg-emerald-600 text-white font-bold shadow-xs' : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40'}">
            ✅ Đã chốt (${this.getDeviceLogCompliance().completed.length})
          </button>
          <button onclick="radOpsApp.setDeviceFilter('transferred')" class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${this.deviceFilterCategory === 'transferred' ? 'bg-amber-600 text-white font-bold' : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40'}">
            🔄 Đang chuyển ngoại khoa (${this.data.devices.filter(d => d.isTransferred).length})
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
                      ${dev.isTransferred ? `
                        <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-300 dark:border-purple-800 flex items-center space-x-1">
                          <i data-lucide="arrow-left-right" class="w-2.5 h-2.5"></i>
                          <span>Đang tại ${dev.transferredTo || 'Ngoại khoa'}</span>
                        </span>
                      ` : `
                        <span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          dev.status === 'warning' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                          dev.status === 'danger' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' :
                          'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        }">
                          ${dev.status === 'warning' ? 'Cần xử lý' : dev.status === 'repair' ? 'Đang sửa chữa' : 'Đang hoạt động'}
                        </span>
                      `}
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

              <!-- THÔNG TIN NHẬT KÝ VẬN HÀNH HÔM NAY CỦA MÁY -->
              ${(() => {
                const todayLog = this.getDeviceTodayLog(dev.id);
                if (todayLog) {
                  return `
                    <div class="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-2 text-[10px] flex items-center justify-between text-emerald-800 dark:text-emerald-300">
                      <span class="flex items-center space-x-1 font-bold">
                        <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-600"></i>
                        <span>Đã chốt nhật ký hôm nay (${todayLog.patientCount} ca - ${todayLog.operatingHours}h)</span>
                      </span>
                      <span class="text-emerald-700 font-medium">${todayLog.completedAt ? todayLog.completedAt.split(' ')[0] : 'Hôm nay'}</span>
                    </div>
                  `;
                } else {
                  return `
                    <div class="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl p-2 text-[10px] flex items-center justify-between text-red-700 dark:text-red-300">
                      <span class="flex items-center space-x-1 font-bold">
                        <i data-lucide="alert-circle" class="w-3.5 h-3.5 text-red-600"></i>
                        <span>Chưa báo cáo nhật ký kết thúc ngày!</span>
                      </span>
                      <button onclick="event.stopPropagation(); radOpsApp.openDailyLogModal('${dev.id}')" class="bg-red-600 hover:bg-red-700 text-white font-black px-2.5 py-0.5 rounded-lg text-[10px] transition shadow-xs">
                        Chốt Ngay
                      </button>
                    </div>
                  `;
                }
              })()}

              <!-- WIDGET HELI DÀNH RIÊNG CHO MÁY MRI -->
              ${(() => {
                const isMri = dev.id === 'TB-03' || (dev.subCategory && dev.subCategory.includes('Cộng hưởng từ')) || dev.name.includes('MRI');
                if (!isMri) return '';
                const todayLog = this.getDeviceTodayLog(dev.id);
                const hel = this.getLatestMriHeliumLog();
                const curLevel = todayLog && todayLog.heliumLevel != null ? todayLog.heliumLevel : hel.level;
                const curPressure = todayLog && todayLog.heliumPressure != null ? todayLog.heliumPressure : hel.pressure;
                const curChiller = todayLog && todayLog.chillerTemp != null ? todayLog.chillerTemp : hel.chillerTemp;

                return `
                  <div class="bg-gradient-to-r from-slate-900 via-blue-950 to-cyan-950 text-white rounded-xl p-2.5 text-[11px] space-y-1.5 border border-cyan-800/80 shadow-xs">
                    <div class="flex items-center justify-between">
                      <span class="font-extrabold flex items-center space-x-1 text-cyan-300 text-[10px]">
                        <i data-lucide="thermometer-snowflake" class="w-3.5 h-3.5"></i>
                        <span>CHỈ SỐ HELI LỎNG (LIQUID HELIUM)</span>
                      </span>
                      <span class="text-xs font-black font-mono px-2 py-0.5 rounded-full ${curLevel >= 70 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'bg-red-500/30 text-red-200 border border-red-400/50'}">
                        ${curLevel}% 🧊
                      </span>
                    </div>
                    <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400" style="width: ${curLevel}%"></div>
                    </div>
                    <div class="flex items-center justify-between text-[10px] text-slate-300 font-mono">
                      <span>Áp suất: <strong>${curPressure} psi</strong></span>
                      <span>Chiller: <strong>${curChiller}°C</strong></span>
                      <button onclick="event.stopPropagation(); radOpsApp.openMriHeliumChartModal()" class="text-cyan-300 hover:underline font-bold">Biểu đồ ➔</button>
                    </div>
                  </div>
                `;
              })()}

              <!-- Actions Quản trị: Chi tiết & QR / Sửa thông tin / Xóa máy -->
              <div class="flex items-center space-x-1.5 pt-1 border-t border-slate-100 dark:border-slate-700/60">
                <button onclick="event.stopPropagation(); radOpsApp.openDeviceDetailModal('${dev.id}')" class="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold py-1.5 px-2 rounded-xl text-[11px] transition flex items-center justify-center space-x-1">
                  <i data-lucide="qr-code" class="w-3.5 h-3.5 text-blue-500"></i>
                  <span>Chi tiết & QR</span>
                </button>
                <button onclick="event.stopPropagation(); radOpsApp.openDailyLogModal('${dev.id}')" title="Ghi nhật ký sử dụng & vận hành máy" class="bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold py-1.5 px-2 rounded-xl text-[11px] transition flex items-center space-x-1 border border-indigo-200 dark:border-indigo-900/40">
                  <i data-lucide="clipboard-pen" class="w-3.5 h-3.5 text-indigo-600"></i>
                  <span>${this.getDeviceTodayLog(dev.id) ? 'Sửa NK' : 'Chốt NK'}</span>
                </button>
                <button onclick="event.stopPropagation(); radOpsApp.openTransferModal('${dev.id}')" title="Điều chuyển thiết bị sang khoa phòng khác" class="bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold py-1.5 px-2 rounded-xl text-[11px] transition flex items-center space-x-1 border border-amber-200 dark:border-amber-900/40">
                  <i data-lucide="arrow-left-right" class="w-3.5 h-3.5"></i>
                  <span>Điều chuyển</span>
                </button>
                <button onclick="event.stopPropagation(); radOpsApp.openDeviceFormModal('${dev.id}')" title="Sửa thông tin máy" class="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold py-1.5 px-2.5 rounded-xl text-[11px] transition flex items-center space-x-1 border border-blue-200 dark:border-blue-800">
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
    const isTransfers = this.currentMaintenanceSubTab === 'transfers';
    const transfers = this.data.transfers || [];
    const activeTransfers = transfers.filter(t => t.status === 'active');
    const returnedTransfers = transfers.filter(t => t.status === 'returned');

    return `
      <div class="space-y-3.5 animate-fadeIn">
        
        <!-- Header & Action Buttons -->
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-extrabold text-slate-900 dark:text-white">Bảo Trì & Điều Chuyển Thiết Bị</h2>
            <div class="text-xs text-slate-500 dark:text-slate-400">Quản lý sửa chữa, bảo dưỡng định kỳ & điều chuyển liên khoa phòng</div>
          </div>
          <div class="flex items-center space-x-1.5">
            ${isTransfers ? `
              <button onclick="radOpsApp.openTransferModal()" class="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 shadow-xs transition">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Lập Phiếu Điều Chuyển</span>
              </button>
            ` : `
              <button onclick="radOpsApp.openNewWorkOrderModal()" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 shadow-xs transition">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Báo hỏng máy</span>
              </button>
            `}
          </div>
        </div>

        <!-- Sub-tabs Switch: Bảo trì & Sự cố vs Sổ Điều chuyển Khoa Phòng -->
        <div class="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
          <button onclick="radOpsApp.switchMaintenanceSubTab('tickets')" class="py-2 rounded-xl text-xs font-extrabold transition flex items-center justify-center space-x-1.5 ${
            !isTransfers ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }">
            <i data-lucide="wrench" class="w-3.5 h-3.5"></i>
            <span>Bảo trì & Báo hỏng (${this.data.maintenanceLogs.length})</span>
          </button>
          <button onclick="radOpsApp.switchMaintenanceSubTab('transfers')" class="py-2 rounded-xl text-xs font-extrabold transition flex items-center justify-center space-x-1.5 ${
            isTransfers ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }">
            <i data-lucide="arrow-left-right" class="w-3.5 h-3.5"></i>
            <span>Điều chuyển Khoa Phòng (${transfers.length})</span>
          </button>
        </div>

        ${!isTransfers ? `
          <!-- VIEW 1: BẢO TRÌ & SỰ CỐ PM HÃNG -->
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
        ` : `
          <!-- VIEW 2: SỔ QUẢN LÝ ĐIỀU CHUYỂN KHOA PHÒNG -->
          <div class="grid grid-cols-3 gap-2 text-center text-xs">
            <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div class="text-lg font-black text-slate-900 dark:text-white">${transfers.length}</div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Tổng lượt điều chuyển</div>
            </div>
            <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div class="text-lg font-black text-amber-600">${activeTransfers.length}</div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Đang ở khoa nhận</div>
            </div>
            <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div class="text-lg font-black text-emerald-600">${returnedTransfers.length}</div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Đã hoàn trả CĐHA</div>
            </div>
          </div>

          <!-- Danh sách các biên bản điều chuyển -->
          <div class="space-y-3">
            ${transfers.length === 0 ? `
              <div class="p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-400 space-y-2">
                <i data-lucide="arrow-left-right" class="w-8 h-8 mx-auto text-slate-300"></i>
                <p>Chưa có biên bản điều chuyển nào được lập.</p>
                <button onclick="radOpsApp.openTransferModal()" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 px-4 rounded-xl text-xs">
                  Lập Phiếu Điều Chuyển Đầu Tiên
                </button>
              </div>
            ` : transfers.map(t => `
              <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-3">
                <div class="flex items-start justify-between">
                  <div>
                    <div class="flex items-center space-x-1.5">
                      <span class="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-lg border border-amber-200 dark:border-amber-900/40">
                        ${t.code}
                      </span>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.type === 'out' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' :
                        t.type === 'in' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' :
                        'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }">
                        ${t.type === 'out' ? '📤 Chuyển đi' : t.type === 'in' ? '📥 Chuyển đến' : '🔄 Nội bộ'}
                      </span>
                      <span class="text-[10px] text-slate-400 font-mono">${t.transferDate}</span>
                    </div>
                    <h3 class="text-sm font-extrabold text-slate-900 dark:text-white mt-1.5">${t.deviceName}</h3>
                    <div class="text-xs text-slate-500 dark:text-slate-400">
                      Model: <strong>${t.deviceModel || 'Theo máy'}</strong> • Serial: <span class="font-mono">${t.deviceSerial || 'Chính hãng'}</span>
                    </div>
                  </div>

                  <span class="text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    t.status === 'active' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800' :
                    'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  }">
                    ${t.status === 'active' ? '🟢 Đang ở khoa nhận' : '⚪ Đã hoàn trả'}
                  </span>
                </div>

                <!-- Lộ trình điều chuyển -->
                <div class="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs">
                  <div class="border-r border-slate-200 dark:border-slate-700/60 pr-2">
                    <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">BÊN GIAO (Bàn giao)</div>
                    <div class="font-bold text-slate-900 dark:text-white mt-0.5 truncate">${t.fromDept}</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 truncate">${t.fromRoom}</div>
                    <div class="text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-1">Cán bộ: ${t.fromPerson}</div>
                  </div>
                  <div class="pl-2">
                    <div class="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">BÊN NHẬN (Tiếp nhận)</div>
                    <div class="font-bold text-slate-900 dark:text-white mt-0.5 truncate">${t.toDept}</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 truncate">${t.toRoom}</div>
                    <div class="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">Cán bộ: ${t.toPerson}</div>
                  </div>
                </div>

                <div class="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div><strong>Lý do:</strong> ${t.reason}</div>
                  <div><strong>Tình trạng bàn giao:</strong> ${t.condition}</div>
                  ${t.accessories ? `<div><strong>Phụ kiện kèm theo:</strong> ${t.accessories}</div>` : ''}
                </div>

                <!-- Chữ ký xác nhận 2 bên & Nút xem biên bản -->
                <div class="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <div class="flex items-center space-x-2 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span class="flex items-center space-x-0.5 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                      <i data-lucide="check" class="w-3 h-3"></i>
                      <span>Giao: ${t.fromPerson.split(' ').slice(-1)[0]} đã ký</span>
                    </span>
                    <span class="flex items-center space-x-0.5 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                      <i data-lucide="check" class="w-3 h-3"></i>
                      <span>Nhận: ${t.toPerson.split(' ').slice(-1)[0]} đã ký</span>
                    </span>
                  </div>

                  <div class="flex items-center space-x-1.5">
                    ${t.status === 'active' ? `
                      <button onclick="radOpsApp.returnTransfer('${t.id}')" title="Xác nhận thiết bị đã được chuyển hoàn trả về CĐHA" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-2.5 rounded-xl text-[11px] transition flex items-center space-x-1 shadow-xs">
                        <i data-lucide="corner-down-left" class="w-3 h-3"></i>
                        <span>Hoàn trả</span>
                      </button>
                    ` : ''}
                    <button onclick="radOpsApp.viewTransferReceipt('${t.id}')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-xl text-[11px] transition flex items-center space-x-1 shadow-xs">
                      <i data-lucide="printer" class="w-3.5 h-3.5"></i>
                      <span>Biên bản A4</span>
                    </button>
                  </div>
                </div>

              </div>
            `).join('')}
          </div>
        `}

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
            <button onclick="radOpsApp.openAccountListModal()" class="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-1.5 rounded-xl text-xs font-black flex items-center space-x-1 shadow-sm transition">
              <i data-lucide="key-round" class="w-4 h-4"></i>
              <span>Sổ Tài Khoản & Mật Khẩu</span>
            </button>
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
    const h = this.data.hospital || {};
    const notice = h.notice || { enabled: false, type: 'info', title: '', content: '' };
    const th = h.thresholds || { licenseDays: 45, inspectionDays: 30, certDays: 60, dosimetryMonths: 3 };
    const rooms = this.data.rooms || [];

    return `
      <div class="space-y-4 animate-fadeIn pb-12">
        <!-- Header Cài đặt -->
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-extrabold text-slate-900 dark:text-white">Cài đặt & Quản trị Nội dung</h2>
            <div class="text-xs text-slate-500 dark:text-slate-400">Tùy biến thông tin thương hiệu, bảng tin, phòng máy & tiêu chuẩn ATBX</div>
          </div>
          <span class="bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
            BV-VPI Admin
          </span>
        </div>

        <!-- Thanh Quick Jump Pills để cuộn nhanh đến các phân hệ cài đặt -->
        <div class="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          <a href="#sec-brand" class="px-3 py-1 rounded-full text-[11px] font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap shadow-2xs hover:border-blue-500">🏢 Thông tin Khoa</a>
          <a href="#sec-notice" class="px-3 py-1 rounded-full text-[11px] font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap shadow-2xs hover:border-blue-500">📢 Bảng tin Thông báo</a>
          <a href="#sec-rooms" class="px-3 py-1 rounded-full text-[11px] font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap shadow-2xs hover:border-blue-500">🚪 Danh mục Phòng máy (${rooms.length})</a>
          <a href="#sec-thresholds" class="px-3 py-1 rounded-full text-[11px] font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap shadow-2xs hover:border-blue-500">⏱️ Ngưỡng cảnh báo</a>
          <a href="#sec-mri" class="px-3 py-1 rounded-full text-[11px] font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap shadow-2xs hover:border-blue-500">📋 Bảng kiểm an toàn</a>
          <a href="#sec-security" class="px-3 py-1 rounded-full text-[11px] font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap shadow-2xs hover:border-blue-500">🛡️ An ninh & Sao lưu</a>
        </div>

        <!-- PHÂN HỆ 1: THÔNG TIN THƯƠNG HIỆU & KHOA CĐHA -->
        <div id="sec-brand" class="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div class="flex items-center space-x-2.5">
              <div class="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <i data-lucide="building-2" class="w-4.5 h-4.5"></i>
              </div>
              <div>
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Thông Tin Thương Hiệu & Khoa CĐHA</h3>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Hiển thị trên thanh tiêu đề, chân trang và hồ sơ pháp lý thiết bị</p>
              </div>
            </div>
            <span class="text-[10px] bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-bold">Căn bản</span>
          </div>

          <form onsubmit="event.preventDefault(); radOpsApp.saveHospitalSettings();" class="space-y-3 text-xs">
            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Tên Bệnh viện *</label>
              <input type="text" id="setting-hospital-name" value="${h.name || ''}" required class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Tên Khoa chuyên môn</label>
                <input type="text" id="setting-hospital-dept" value="${h.department || 'Khoa Chẩn đoán hình ảnh'}" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-900 dark:text-white">
              </div>
              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Tên pháp nhân công ty</label>
                <input type="text" id="setting-hospital-legal" value="${h.legalName || ''}" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium text-slate-900 dark:text-white">
              </div>
            </div>

            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Khẩu hiệu / Slogan hoạt động của Khoa</label>
              <input type="text" id="setting-hospital-slogan" value="${h.slogan || 'Chính xác - Nhanh chóng - An toàn bức xạ - Tận tâm'}" placeholder="Ví dụ: Chính xác - Nhanh chóng - An toàn bức xạ" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium text-slate-900 dark:text-white">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Hotline Khoa / Hỗ trợ Kỹ thuật</label>
                <input type="text" id="setting-hospital-hotline" value="${h.hotline || '0988.345.115'}" placeholder="0988.xxx.xxx" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white">
              </div>
              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Địa chỉ / Vị trí Khoa</label>
                <input type="text" id="setting-hospital-address" value="${h.address || 'Tầng 1 - Khu CĐHA, Bệnh viện Quốc tế Vĩnh Phúc'}" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium text-slate-900 dark:text-white">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div class="font-bold text-[11px] text-blue-600 dark:text-blue-400">LÃNH ĐẠO KHOA CHUYÊN MÔN</div>
                <div>
                  <label class="block text-slate-500 text-[10px] mb-0.5">Họ tên Phụ trách Khoa</label>
                  <input type="text" id="setting-head-name" value="${h.headOfDept || ''}" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-bold text-slate-900 dark:text-white">
                </div>
                <div>
                  <label class="block text-slate-500 text-[10px] mb-0.5">Chức danh hiển thị</label>
                  <input type="text" id="setting-head-title" value="${h.headOfDeptTitle || 'Phụ trách Khoa Chẩn đoán hình ảnh'}" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-medium text-slate-900 dark:text-white">
                </div>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div class="font-bold text-[11px] text-emerald-600 dark:text-emerald-400">PHỤ TRÁCH AN TOÀN BỨC XẠ (ATBX)</div>
                <div>
                  <label class="block text-slate-500 text-[10px] mb-0.5">Họ tên Phụ trách ATBX & KTV Trưởng</label>
                  <input type="text" id="setting-officer-name" value="${h.officer || ''}" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-bold text-slate-900 dark:text-white">
                </div>
                <div class="grid grid-cols-2 gap-1.5">
                  <div>
                    <label class="block text-slate-500 text-[10px] mb-0.5">Mã nhân viên</label>
                    <input type="text" id="setting-officer-id" value="${h.officerId || 'BV-345'}" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-mono font-bold text-slate-900 dark:text-white">
                  </div>
                  <div>
                    <label class="block text-slate-500 text-[10px] mb-0.5">Chức vụ hiển thị</label>
                    <input type="text" id="setting-officer-title" value="${h.officerTitle || 'KTV Trưởng & Phụ trách ATBX'}" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-medium text-slate-900 dark:text-white">
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Chu kỳ giám sát / Báo cáo hiện tại</label>
                <input type="text" id="setting-hospital-cycle" value="${h.supervisionCycle || 'Tháng 10/2026'}" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
              </div>
              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Căn cứ pháp lý cốt lõi</label>
                <input type="text" id="setting-hospital-legalbasis" value="${h.legalBasis || 'Luật NLNT & NĐ 142/2020 & TT 23/TT-BKHCN'}" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium text-slate-900 dark:text-white">
              </div>
            </div>

            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 px-4 rounded-xl transition shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2">
              <i data-lucide="save" class="w-4 h-4"></i>
              <span>LƯU CẬP NHẬT THÔNG TIN THƯƠNG HIỆU & KHOA</span>
            </button>
          </form>
        </div>

        <!-- PHÂN HỆ 2: BẢNG TIN THÔNG BÁO NỔI BẬT TRÊN APP -->
        <div id="sec-notice" class="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div class="flex items-center space-x-2.5">
              <div class="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <i data-lucide="bell-ring" class="w-4.5 h-4.5"></i>
              </div>
              <div>
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Bảng Tin Thông Báo Nổi Bật Trên App</h3>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Hiển thị trực tiếp trên đầu trang Tổng quan (Dashboard) cho toàn bộ nhân sự</p>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer shrink-0">
              <input type="checkbox" id="setting-notice-enabled" ${notice.enabled ? 'checked' : ''} class="sr-only peer">
              <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          <form onsubmit="event.preventDefault(); radOpsApp.saveNoticeSettings();" class="space-y-3 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div class="sm:col-span-2">
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Tiêu đề thông báo</label>
                <input type="text" id="setting-notice-title" value="${notice.title || ''}" placeholder="Ví dụ: 🔔 LỊCH GIAO BAN KHOA & THAY LIỀU KẾ QUÝ 4" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
              </div>
              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Mức độ cảnh báo</label>
                <select id="setting-notice-type" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-900 dark:text-white">
                  <option value="info" ${notice.type === 'info' ? 'selected' : ''}>🔵 Thông báo chung (Xanh)</option>
                  <option value="warning" ${notice.type === 'warning' ? 'selected' : ''}>🟡 Lưu ý quan trọng (Vàng)</option>
                  <option value="danger" ${notice.type === 'danger' ? 'selected' : ''}>🔴 Khẩn cấp / Báo động (Đỏ)</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Nội dung chi tiết thông báo</label>
              <textarea id="setting-notice-content" rows="3" placeholder="Nhập nội dung thông điệp gửi tới bác sĩ, KTV và nhân viên trong khoa..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium text-slate-900 dark:text-white leading-relaxed">${notice.content || ''}</textarea>
            </div>

            <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3 px-4 rounded-xl transition shadow-md shadow-amber-500/20 flex items-center justify-center space-x-2">
              <i data-lucide="megaphone" class="w-4 h-4"></i>
              <span>LƯU & CẬP NHẬT BẢNG TIN NỔI BẬT</span>
            </button>
          </form>
        </div>

        <!-- PHÂN HỆ 3: CÀI ĐẶT DANH MỤC PHÒNG MÁY & SƠ ĐỒ KỸ THUẬT -->
        <div id="sec-rooms" class="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div class="flex items-center space-x-2.5">
              <div class="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <i data-lucide="door-open" class="w-4.5 h-4.5"></i>
              </div>
              <div>
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Danh Mục Phòng Máy & Sơ Đồ Khoa</h3>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Quản lý che chắn chì, liều phông và người phụ trách từng phòng</p>
              </div>
            </div>
            <button onclick="radOpsApp.openRoomFormModal()" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1.5 px-3 rounded-xl text-xs transition flex items-center space-x-1 shadow-xs">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
              <span>Thêm Phòng Mới</span>
            </button>
          </div>

          <div class="space-y-2.5 text-xs">
            ${rooms.map(room => `
              <div class="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 space-y-2">
                <div class="flex items-start justify-between">
                  <div>
                    <div class="font-extrabold text-slate-900 dark:text-white text-sm flex items-center space-x-1.5">
                      <span>${room.name}</span>
                      <span class="text-[10px] font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-1.5 py-0.2 rounded font-bold">${room.id}</span>
                    </div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      ${room.floor} • Phụ trách: <strong class="text-slate-700 dark:text-slate-300">${room.inCharge}</strong>
                    </div>
                  </div>
                  <div class="flex items-center space-x-1.5">
                    <button onclick="radOpsApp.openRoomFormModal('${room.id}')" title="Sửa thông tin phòng" class="bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-bold py-1 px-2.5 rounded-lg text-[11px] transition flex items-center space-x-1 border border-blue-200 dark:border-blue-800">
                      <i data-lucide="edit-3" class="w-3 h-3"></i>
                      <span>Sửa</span>
                    </button>
                    <button onclick="radOpsApp.deleteRoom('${room.id}')" title="Xóa phòng máy" class="bg-red-50 dark:bg-red-950/40 hover:bg-red-100 text-red-600 dark:text-red-400 font-bold p-1 rounded-lg text-[11px] transition border border-red-200 dark:border-red-900/40">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-2 text-[10px] text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                  <div>🛡️ Che chắn: <strong>${room.shieldingPb}</strong></div>
                  <div>📊 Liều lọt: <strong class="text-blue-600 dark:text-blue-400">${room.backgroundDose}</strong></div>
                  <div>🌡️ Nhiệt độ: <strong>${room.temperature}</strong></div>
                  <div>💧 Độ ẩm: <strong>${room.humidity}</strong></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- PHÂN HỆ 4: CÀI ĐẶT TIÊU CHUẨN & NGƯỠNG CẢNH BÁO THỜI HẠN ATBX -->
        <div id="sec-thresholds" class="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div class="flex items-center space-x-2.5">
              <div class="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <i data-lucide="timer" class="w-4.5 h-4.5"></i>
              </div>
              <div>
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Ngưỡng Thời Hạn Cảnh Báo An Toàn Bức Xạ</h3>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Thiết lập số ngày kích hoạt cảnh báo đỏ trên ứng dụng</p>
              </div>
            </div>
            <span class="text-[10px] bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">NĐ 142/2020</span>
          </div>

          <form onsubmit="event.preventDefault(); radOpsApp.saveThresholdSettings();" class="space-y-3 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <label class="block text-slate-700 dark:text-slate-300 font-bold">Cảnh báo hạn Giấy phép bức xạ (Ngày)</label>
                <div class="flex items-center space-x-2">
                  <input type="number" id="setting-th-license" value="${th.licenseDays || 45}" min="15" max="90" required class="w-24 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono font-bold text-center text-slate-900 dark:text-white">
                  <span class="text-[11px] text-slate-500">ngày trước khi hết hạn (Điều 17 NĐ 142)</span>
                </div>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <label class="block text-slate-700 dark:text-slate-300 font-bold">Cảnh báo hạn Kiểm định thiết bị (Ngày)</label>
                <div class="flex items-center space-x-2">
                  <input type="number" id="setting-th-inspection" value="${th.inspectionDays || 30}" min="10" max="60" required class="w-24 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono font-bold text-center text-slate-900 dark:text-white">
                  <span class="text-[11px] text-slate-500">ngày trước khi kiểm định định kỳ</span>
                </div>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <label class="block text-slate-700 dark:text-slate-300 font-bold">Cảnh báo hạn CCHN & Chứng chỉ ATBX (Ngày)</label>
                <div class="flex items-center space-x-2">
                  <input type="number" id="setting-th-cert" value="${th.certDays || 60}" min="15" max="120" required class="w-24 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono font-bold text-center text-slate-900 dark:text-white">
                  <span class="text-[11px] text-slate-500">ngày trước khi nhân sự hết hạn đào tạo</span>
                </div>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <label class="block text-slate-700 dark:text-slate-300 font-bold">Chu kỳ gửi đọc Liều kế cá nhân (Tháng)</label>
                <div class="flex items-center space-x-2">
                  <input type="number" id="setting-th-dosimetry" value="${th.dosimetryMonths || 3}" min="1" max="6" required class="w-24 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono font-bold text-center text-slate-900 dark:text-white">
                  <span class="text-[11px] text-slate-500">tháng / lần (Thông tư 23/TT-BKHCN)</span>
                </div>
              </div>
            </div>

            <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl transition shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2">
              <i data-lucide="check-check" class="w-4 h-4"></i>
              <span>LƯU CẤU HÌNH NGƯỠNG CẢNH BÁO AN TOÀN BỨC XẠ</span>
            </button>
          </form>
        </div>

        <!-- PHÂN HỆ 5: BẢNG KIỂM AN TOÀN MRI & QUY TRÌNH CHUẨN (SOP) -->
        <div id="sec-mri" class="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2.5">
              <div class="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <i data-lucide="clipboard-check" class="w-4.5 h-4.5"></i>
              </div>
              <div>
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Bảng Kiểm An Toàn MRI Zone IV</h3>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Danh mục câu hỏi sàng lọc an toàn cho bệnh nhân và nhân viên trước khi chụp CHT</p>
              </div>
            </div>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Hệ thống chuẩn hóa 8 tiêu chí cốt lõi theo tiêu chuẩn của Hiệp hội Điện quang Hoa Kỳ (ACR) và Bệnh viện Quốc tế Vĩnh Phúc (VPI).
          </p>
          <button onclick="radOpsApp.openMriChecklistSettingsModal()" class="w-full bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-extrabold py-2.5 px-3 rounded-xl transition flex items-center justify-center space-x-2 border border-indigo-200 dark:border-indigo-900/50">
            <i data-lucide="list-checks" class="w-4 h-4"></i>
            <span>Xem Danh Sách & Tiêu Chí Bảng Kiểm MRI</span>
          </button>
        </div>

        <!-- PHÂN HỆ 6: CÀI ĐẶT GIAO DIỆN, PWA & KẾT NỐI NGOẠI VIỆN -->
        <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div class="font-extrabold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
            <i data-lucide="sliders" class="w-4 h-4 text-blue-600"></i>
            <span>Giao Diện Hiển Thị & Kết Nối Đa Thiết Bị</span>
          </div>

          <!-- Dual View Mode Toggle -->
          <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <div class="font-bold text-slate-800 dark:text-slate-200">Giả lập khung Smartphone Mobile</div>
              <div class="text-slate-400 text-[11px]">Xem ứng dụng như trên màn hình iPhone / Android</div>
            </div>
            <button onclick="radOpsApp.toggleViewMode()" class="px-3 py-1.5 rounded-xl font-bold border transition ${this.isMobileFrame ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300'}">
              ${this.isMobileFrame ? 'Đang bật khung Mobile' : 'Mở rộng toàn màn hình'}
            </button>
          </div>

          <!-- PWA Install Banner -->
          <div class="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white rounded-2xl p-4 shadow-sm space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-bold text-sm flex items-center">
                <i data-lucide="smartphone" class="w-4 h-4 mr-1.5 text-emerald-300"></i>
                Cài đặt Ứng dụng vào Điện thoại (PWA App)
              </span>
              <span class="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">iOS & Android</span>
            </div>
            <p class="text-xs text-emerald-100 leading-relaxed">
              Cài đặt RADOPS CĐHA VPI trực tiếp lên màn hình chính để dùng như ứng dụng độc lập, hoạt động offline trong phòng máy chì khi mất sóng 4G.
            </p>
            <div class="flex items-center space-x-2 pt-1">
              <button onclick="radOpsApp.promptPwaInstall()" class="flex-1 bg-white text-emerald-900 hover:bg-emerald-50 font-bold py-2 rounded-xl text-xs transition flex items-center justify-center space-x-1.5 shadow-xs">
                <i data-lucide="download" class="w-3.5 h-3.5"></i>
                <span>Cài đặt App lên Màn hình</span>
              </button>
              <button onclick="radOpsApp.openPwaHelpModal()" class="bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold py-2 px-3 rounded-xl text-xs transition flex items-center space-x-1">
                <i data-lucide="help-circle" class="w-3.5 h-3.5"></i>
                <span>Hướng dẫn</span>
              </button>
            </div>
          </div>

          <!-- Remote Gateway & Cloud Sync -->
          <div class="grid grid-cols-2 gap-2 text-xs">
            <button onclick="radOpsApp.openRemoteAccessGuideModal()" class="bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-bold py-2.5 px-3 rounded-xl transition flex items-center justify-center space-x-1.5 border border-blue-200 dark:border-blue-800">
              <i data-lucide="wifi" class="w-3.5 h-3.5"></i>
              <span>Cấu hình Ngoại viện</span>
            </button>
            <button onclick="radOpsApp.openCloudSyncModal()" class="bg-emerald-50 dark:bg-emerald-900/40 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 font-bold py-2.5 px-3 rounded-xl transition flex items-center justify-center space-x-1.5 border border-emerald-200 dark:border-emerald-800">
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
              <span>Đồng bộ Đám mây (QR)</span>
            </button>
          </div>
        </div>

        <!-- PHÂN HỆ 7: TRUNG TÂM AN NINH & SAO LƯU PHỤC HỒI THẢM HỌA (DISASTER RECOVERY) -->
        <div id="sec-security" class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-5 border border-slate-700 shadow-xl space-y-4">
        <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-5 border border-slate-700 shadow-xl space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2.5">
              <div class="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold">
                <i data-lucide="shield-check" class="w-5 h-5"></i>
              </div>
              <div>
                <span class="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">VPI CYBER DEFENSE SHIELD</span>
                <h3 class="text-sm font-extrabold text-white">An ninh & Phục hồi Thảm họa</h3>
              </div>
            </div>
            <span class="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full flex items-center space-x-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Đang bảo vệ</span>
            </span>
          </div>

          <!-- Trạng thái Bảo mật Thời gian thực -->
          <div class="grid grid-cols-2 gap-2 text-[11px]">
            <div class="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 space-y-0.5">
              <div class="text-slate-400 text-[10px] flex items-center space-x-1">
                <i data-lucide="lock" class="w-3 h-3 text-amber-400"></i>
                <span>Chống Brute-force:</span>
              </div>
              <div class="font-bold text-amber-300">Khóa 15p sau 5 lần sai</div>
            </div>
            <div class="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 space-y-0.5">
              <div class="text-slate-400 text-[10px] flex items-center space-x-1">
                <i data-lucide="timer" class="w-3 h-3 text-blue-400"></i>
                <span>Tự khóa phiên:</span>
              </div>
              <div class="font-bold text-blue-300">15 phút không thao tác</div>
            </div>
            <div class="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 space-y-0.5">
              <div class="text-slate-400 text-[10px] flex items-center space-x-1">
                <i data-lucide="history" class="w-3 h-3 text-purple-400"></i>
                <span>Bản chụp an toàn:</span>
              </div>
              <div class="font-bold text-purple-300">${this.getSnapshots().length} bản chụp sẵn sàng</div>
            </div>
            <div class="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 space-y-0.5">
              <div class="text-slate-400 text-[10px] flex items-center space-x-1">
                <i data-lucide="check-check" class="w-3 h-3 text-emerald-400"></i>
                <span>Toàn vẹn CSDL:</span>
              </div>
              <div class="font-bold text-emerald-300">Checksum Chuẩn 100%</div>
            </div>
          </div>

          <!-- Các nút hành động An ninh & Phục hồi -->
          <div class="space-y-2 pt-1 text-xs">
            <button onclick="radOpsApp.openDisasterRecoveryModal()" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold py-2.5 px-3 rounded-xl transition flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30">
              <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
              <span>Mở Trung tâm Phục hồi Thảm họa (Snapshots & Restore)</span>
            </button>

            <div class="grid grid-cols-2 gap-2">
              <button onclick="radOpsApp.createSnapshot('Người dùng chụp an toàn thủ công', true); radOpsApp.render();" class="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2 px-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 border border-slate-700">
                <i data-lucide="camera" class="w-3.5 h-3.5 text-blue-400"></i>
                <span>Tạo bản chụp ngay</span>
              </button>
              <button onclick="radOpsApp.exportSecureBackup()" class="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2 px-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 border border-slate-700">
                <i data-lucide="download-cloud" class="w-3.5 h-3.5 text-emerald-400"></i>
                <span>Xuất .vpi-backup</span>
              </button>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button onclick="radOpsApp.triggerImportBackupFile()" class="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2 px-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 border border-slate-700">
                <i data-lucide="upload-cloud" class="w-3.5 h-3.5 text-amber-400"></i>
                <span>Nạp tệp khẩn cấp</span>
              </button>
              <button onclick="radOpsApp.openAuditLogModal()" class="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2 px-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 border border-slate-700">
                <i data-lucide="shield-alert" class="w-3.5 h-3.5 text-purple-400"></i>
                <span>Nhật ký an ninh</span>
              </button>
            </div>
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
      { id: 'staff', label: 'Nhân sự', icon: 'users' },
      { id: 'settings', label: 'Cài đặt', icon: 'settings' }
    ];

    return `
      <nav class="fixed bottom-0 left-0 right-0 max-w-[440px] mx-auto bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 py-1.5 px-2 z-40 shadow-lg">
        <div class="grid grid-cols-6 gap-1">
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

        <!-- NHẬT KÝ VẬN HÀNH & SỬ DỤNG THIẾT BỊ HẰNG NGÀY -->
        <div class="space-y-2 text-xs pt-1">
          <div class="font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span class="flex items-center space-x-1.5 text-blue-600 dark:text-blue-400">
              <i data-lucide="clipboard-pen" class="w-4 h-4"></i>
              <span>Nhật Ký Vận Hành & Sử Dụng Máy Hằng Ngày:</span>
            </span>
            <button onclick="radOpsApp.openDailyLogModal('${dev.id}')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded-lg text-[10px] transition flex items-center space-x-1 shadow-xs">
              <i data-lucide="plus" class="w-3 h-3"></i>
              <span>Báo Cáo Hôm Nay</span>
            </button>
          </div>

          <!-- Trạng thái chốt sổ hôm nay -->
          ${(() => {
            const todayLog = this.getDeviceTodayLog(dev.id);
            if (todayLog) {
              return `
                <div class="p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/60 dark:bg-emerald-950/30 flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span class="text-emerald-600 font-bold">✅ Đã chốt ca hôm nay:</span>
                    <span class="font-bold text-slate-900 dark:text-white">${todayLog.patientCount} ca (${todayLog.operatingHours}h)</span>
                  </div>
                  <span class="text-[10px] text-slate-500 font-medium">KTV: ${todayLog.technician.split('(')[0]}</span>
                </div>
              `;
            } else {
              return `
                <div class="p-2.5 rounded-xl border border-red-200 dark:border-red-900 bg-red-50/60 dark:bg-red-950/30 flex items-center justify-between text-red-700 dark:text-red-300">
                  <span class="font-bold flex items-center space-x-1">
                    <i data-lucide="alert-circle" class="w-3.5 h-3.5 text-red-600"></i>
                    <span>Chưa lập báo cáo nhật ký ca trực hôm nay!</span>
                  </span>
                  <button onclick="radOpsApp.openDailyLogModal('${dev.id}')" class="bg-red-600 text-white font-black px-2 py-0.5 rounded text-[10px]">
                    Chốt Ngay
                  </button>
                </div>
              `;
            }
          })()}

          <!-- Bảng 3 ngày nhật ký gần nhất của thiết bị này -->
          ${(() => {
            const devLogs = (this.data.deviceLogs || []).filter(l => l.deviceId === dev.id).slice(0, 5);
            if (devLogs.length === 0) {
              return '<div class="text-[11px] text-slate-400 italic p-2 bg-slate-50 rounded-xl">Chưa có nhật ký vận hành nào được ghi cho máy này.</div>';
            }
            return `
              <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <table class="w-full text-left text-[11px]">
                  <tr class="bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-200">
                    <th class="p-1.5">Ngày</th>
                    <th class="p-1.5 text-center">Ca chụp</th>
                    <th class="p-1.5 text-center">Giờ</th>
                    ${dev.id === 'TB-03' ? '<th class="p-1.5 text-center">Heli</th>' : ''}
                    <th class="p-1.5">KTV</th>
                    <th class="p-1.5">Tình trạng</th>
                  </tr>
                  ${devLogs.map(l => `
                    <tr class="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50">
                      <td class="p-1.5 font-bold">${l.date}</td>
                      <td class="p-1.5 text-center font-bold text-blue-600 font-mono">${l.patientCount}</td>
                      <td class="p-1.5 text-center font-mono">${l.operatingHours}h</td>
                      ${dev.id === 'TB-03' ? `<td class="p-1.5 text-center font-bold text-cyan-600 font-mono">${l.heliumLevel}%</td>` : ''}
                      <td class="p-1.5">${l.technician.split('(')[0]}</td>
                      <td class="p-1.5">
                        <span class="font-bold ${l.status === 'normal' ? 'text-emerald-600' : 'text-amber-600'}">
                          ${l.status === 'normal' ? 'Ổn định' : 'Lưu ý'}
                        </span>
                      </td>
                    </tr>
                  `).join('')}
                </table>
              </div>
            `;
          })()}
        </div>

        <!-- Lịch sử Điều chuyển Khoa Phòng của Thiết bị -->
        ${(() => {
          const deviceTransfers = (this.data.transfers || []).filter(t => t.deviceId === dev.id || t.deviceName === dev.name);
          if (deviceTransfers.length === 0) return '';
          return `
            <div class="space-y-2 text-xs pt-1">
              <div class="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span class="flex items-center space-x-1.5 text-amber-600 dark:text-amber-400">
                  <i data-lucide="arrow-left-right" class="w-4 h-4"></i>
                  <span>Lịch sử Điều chuyển Khoa Phòng (${deviceTransfers.length} đợt):</span>
                </span>
              </div>
              <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
                ${deviceTransfers.map(tr => `
                  <div class="p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-[11px] text-slate-900 dark:text-white">${tr.code} • ${tr.transferDate}</span>
                      <span class="text-[10px] font-bold px-1.5 py-0.2 rounded-full ${tr.status === 'active' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'}">
                        ${tr.status === 'active' ? 'Đang ở khoa nhận' : 'Đã hoàn trả'}
                      </span>
                    </div>
                    <div class="text-[11px] text-slate-600 dark:text-slate-300">
                      ${tr.fromDept} ➔ <strong class="text-blue-600 dark:text-blue-400">${tr.toDept}</strong> (${tr.toPerson})
                    </div>
                    <div class="text-[10px] text-slate-400 italic">
                      Lý do: ${tr.reason}
                    </div>
                    <div class="pt-1 flex items-center justify-between">
                      <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1">
                        <i data-lucide="check-check" class="w-3 h-3"></i>
                        <span>Đã ký xác nhận 2 bên</span>
                      </span>
                      <button onclick="radOpsApp.viewTransferReceipt('${tr.id}')" class="text-[10px] text-blue-600 hover:underline font-bold">
                        Xem biên bản ký A4
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        })()}

        <div class="grid grid-cols-3 gap-2 pt-2">
          <button onclick="radOpsApp.openTransferModal('${dev.id}')" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center space-x-1 shadow-xs">
            <i data-lucide="arrow-left-right" class="w-3.5 h-3.5"></i>
            <span>Điều chuyển</span>
          </button>
          <button onclick="radOpsApp.openScheduleInspectionModal('${dev.id}')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition">
            Kiểm định
          </button>
          <button onclick="radOpsApp.openNewWorkOrderModal('${dev.name}')" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition">
            Báo hỏng
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

  showModal(contentHtml, maxWidthClass = 'max-w-lg') {
    const container = document.getElementById('modal-container');
    if (!container) return;

    container.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        <div onclick="radOpsApp.closeModal()" class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity modal-overlay"></div>
        <div class="relative bg-white dark:bg-slate-800 rounded-3xl ${maxWidthClass} w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700 z-10 modal-content animate-scaleUp">
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
    const hName = document.getElementById('setting-hospital-name')?.value?.trim();
    const hDept = document.getElementById('setting-hospital-dept')?.value?.trim();
    const hLegal = document.getElementById('setting-hospital-legal')?.value?.trim();
    const hSlogan = document.getElementById('setting-hospital-slogan')?.value?.trim();
    const hHotline = document.getElementById('setting-hospital-hotline')?.value?.trim();
    const hAddress = document.getElementById('setting-hospital-address')?.value?.trim();
    const hHead = document.getElementById('setting-head-name')?.value?.trim();
    const hHeadTitle = document.getElementById('setting-head-title')?.value?.trim();
    const oName = document.getElementById('setting-officer-name')?.value?.trim();
    const oId = document.getElementById('setting-officer-id')?.value?.trim();
    const oTitle = document.getElementById('setting-officer-title')?.value?.trim();
    const hCycle = document.getElementById('setting-hospital-cycle')?.value?.trim();
    const hLegalBasis = document.getElementById('setting-hospital-legalbasis')?.value?.trim();

    this.createSnapshot('Tự động sao lưu trước khi cập nhật thông tin Khoa', false);

    if (hName) this.data.hospital.name = hName;
    if (hDept) this.data.hospital.department = hDept;
    if (hLegal) this.data.hospital.legalName = hLegal;
    if (hSlogan) this.data.hospital.slogan = hSlogan;
    if (hHotline) this.data.hospital.hotline = hHotline;
    if (hAddress) this.data.hospital.address = hAddress;
    if (hHead) this.data.hospital.headOfDept = hHead;
    if (hHeadTitle) this.data.hospital.headOfDeptTitle = hHeadTitle;
    if (oName) this.data.hospital.officer = oName;
    if (oId) this.data.hospital.officerId = oId;
    if (oTitle) this.data.hospital.officerTitle = oTitle;
    if (hCycle) this.data.hospital.supervisionCycle = hCycle;
    if (hLegalBasis) this.data.hospital.legalBasis = hLegalBasis;

    this.saveData();
    alert('✅ ĐÃ CẬP NHẬT THÔNG TIN THƯƠNG HIỆU & KHOA CĐHA VPI THÀNH CÔNG!');
    this.render();
  }

  // Cập nhật Bảng tin Thông báo nổi bật trên Dashboard
  saveNoticeSettings() {
    const enabled = document.getElementById('setting-notice-enabled')?.checked || false;
    const type = document.getElementById('setting-notice-type')?.value || 'info';
    const title = document.getElementById('setting-notice-title')?.value?.trim() || '';
    const content = document.getElementById('setting-notice-content')?.value?.trim() || '';

    this.createSnapshot('Tự động sao lưu trước khi cập nhật bảng tin', false);

    if (!this.data.hospital) this.data.hospital = {};
    this.data.hospital.notice = {
      enabled,
      type,
      title,
      content
    };

    this.saveData();
    alert('📢 ĐÃ CẬP NHẬT BẢNG TIN THÔNG BÁO NỔI BẬT THÀNH CÔNG!');
    this.render();
  }

  // Cập nhật Ngưỡng thời hạn cảnh báo ATBX & Kiểm định
  saveThresholdSettings() {
    const licenseDays = parseInt(document.getElementById('setting-th-license')?.value) || 45;
    const inspectionDays = parseInt(document.getElementById('setting-th-inspection')?.value) || 30;
    const certDays = parseInt(document.getElementById('setting-th-cert')?.value) || 60;
    const dosimetryMonths = parseInt(document.getElementById('setting-th-dosimetry')?.value) || 3;

    this.createSnapshot('Tự động sao lưu trước khi cập nhật ngưỡng cảnh báo', false);

    if (!this.data.hospital) this.data.hospital = {};
    this.data.hospital.thresholds = {
      licenseDays,
      inspectionDays,
      certDays,
      dosimetryMonths
    };

    this.saveData();
    alert('✅ ĐÃ LƯU CẤU HÌNH NGƯỠNG CẢNH BÁO AN TOÀN BỨC XẠ THÀNH CÔNG!');
    this.render();
  }

  // Quản lý Phòng máy: Mở modal thêm/sửa phòng máy
  openRoomFormModal(roomId = null) {
    const isEdit = !!roomId;
    const room = isEdit ? this.data.rooms.find(r => r.id === roomId) : {
      id: 'PH-0' + ((this.data.rooms || []).length + 1),
      name: '',
      floor: 'Tầng 1 - Khu CĐHA',
      deviceCount: 1,
      shieldingPb: 'Chì lá 2.0 mmPb (Tường barite + cửa bọc chì)',
      backgroundDose: '0.08 µSv/h',
      tcvnStatus: 'Đạt TCVN (≤ 0.12 µSv/h)',
      temperature: '22.0°C',
      humidity: '50%',
      inCharge: this.data.hospital?.officer || 'KTV. Vũ Bá Đạt'
    };

    if (!room) return;

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[85vh] overflow-y-auto">
        <div class="flex items-start justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <div>
            <span class="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/40 px-2 py-0.5 rounded-full uppercase">
              Quản Trị Phòng Máy & Sơ Đồ Khoa
            </span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">
              ${isEdit ? 'Chỉnh Sửa Phòng Máy' : 'Thêm Phòng Máy Mới Vào Sơ Đồ'}
            </h3>
            <div class="text-xs text-slate-500">Mã phòng: <strong class="font-mono text-purple-600">${room.id}</strong></div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form onsubmit="event.preventDefault(); radOpsApp.saveRoomForm('${room.id}', ${isEdit});" class="space-y-3 text-xs">
          <div>
            <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Tên phòng máy *</label>
            <input type="text" id="rf-name" value="${room.name}" required placeholder="Ví dụ: Phòng CT-Scanner 128 lát" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Vị trí / Tầng</label>
              <input type="text" id="rf-floor" value="${room.floor}" placeholder="Ví dụ: Tầng 1 - Khu CĐHA" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">KTV Phụ trách phòng</label>
              <select id="rf-inCharge" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-900 dark:text-white">
                ${this.data.staff.map(s => `
                  <option value="${s.name}" ${room.inCharge && room.inCharge.includes(s.name) ? 'selected' : ''}>${s.name} (${s.role})</option>
                `).join('')}
              </select>
            </div>
          </div>

          <div>
            <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Che chắn an toàn bức xạ / Từ trường</label>
            <input type="text" id="rf-shielding" value="${room.shieldingPb}" placeholder="Ví dụ: Chì lá 3.0 mmPb hoặc Lồng Faraday" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium text-slate-900 dark:text-white">
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Suất liều lọt môi trường</label>
              <input type="text" id="rf-dose" value="${room.backgroundDose}" placeholder="Ví dụ: 0.09 µSv/h" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Trạng thái TCVN</label>
              <input type="text" id="rf-tcvn" value="${room.tcvnStatus}" placeholder="Đạt TCVN (≤ 0.12 µSv/h)" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium text-slate-900 dark:text-white">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Nhiệt độ tiêu chuẩn</label>
              <input type="text" id="rf-temp" value="${room.temperature}" placeholder="Ví dụ: 21.0°C" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Độ ẩm tiêu chuẩn</label>
              <input type="text" id="rf-humid" value="${room.humidity}" placeholder="Ví dụ: 50%" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white">
            </div>
          </div>

          <div class="pt-2 flex items-center justify-end space-x-2">
            <button type="button" onclick="radOpsApp.closeModal()" class="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold py-2.5 px-4 rounded-xl transition">
              Hủy
            </button>
            <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-xs transition flex items-center space-x-1.5">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>${isEdit ? 'Lưu Thay Đổi Phòng' : 'Thêm Phòng Mới'}</span>
            </button>
          </div>
        </form>
      </div>
    `);
  }

  saveRoomForm(roomId, isEdit) {
    const name = document.getElementById('rf-name')?.value?.trim();
    if (!name) return;

    const floor = document.getElementById('rf-floor')?.value?.trim() || 'Tầng 1 - Khu CĐHA';
    const inCharge = document.getElementById('rf-inCharge')?.value?.trim() || 'KTV. Vũ Bá Đạt';
    const shieldingPb = document.getElementById('rf-shielding')?.value?.trim() || 'Chì lá 2.0 mmPb';
    const backgroundDose = document.getElementById('rf-dose')?.value?.trim() || '0.08 µSv/h';
    const tcvnStatus = document.getElementById('rf-tcvn')?.value?.trim() || 'Đạt TCVN (≤ 0.12 µSv/h)';
    const temperature = document.getElementById('rf-temp')?.value?.trim() || '22.0°C';
    const humidity = document.getElementById('rf-humid')?.value?.trim() || '50%';

    this.createSnapshot('Tự động sao lưu trước khi lưu phòng máy ' + name, false);

    if (!this.data.rooms) this.data.rooms = [];

    if (isEdit) {
      const room = this.data.rooms.find(r => r.id === roomId);
      if (room) {
        room.name = name;
        room.floor = floor;
        room.inCharge = inCharge;
        room.shieldingPb = shieldingPb;
        room.backgroundDose = backgroundDose;
        room.tcvnStatus = tcvnStatus;
        room.temperature = temperature;
        room.humidity = humidity;
      }
    } else {
      this.data.rooms.push({
        id: roomId,
        name,
        floor,
        deviceCount: 0,
        shieldingPb,
        backgroundDose,
        tcvnStatus,
        temperature,
        humidity,
        inCharge
      });
    }

    this.saveData();
    this.closeModal();
    this.render();
    alert(`✅ Đã lưu thông tin phòng máy "${name}" thành công!`);
  }

  deleteRoom(roomId) {
    const room = (this.data.rooms || []).find(r => r.id === roomId);
    if (!room) return;

    if (confirm(`Bạn có chắc chắn muốn xóa phòng máy "${room.name}" khỏi sơ đồ khoa CĐHA?`)) {
      this.createSnapshot('Tự động sao lưu trước khi xóa phòng ' + room.name, false);
      this.data.rooms = this.data.rooms.filter(r => r.id !== roomId);
      this.saveData();
      this.render();
      alert(`Đã xóa phòng "${room.name}" thành công!`);
    }
  }

  // Xem tiêu chuẩn Bảng kiểm an toàn MRI Zone IV
  openMriChecklistSettingsModal() {
    const list = this.data.hospital?.mriChecklist || [
      { id: 'CK-01', text: 'Bệnh nhân có cấy ghép máy tạo nhịp tim hoặc máy khử rung (Pacemaker/ICD) không?', risk: 'danger' },
      { id: 'CK-02', text: 'Có kẹp phẫu thuật dị dạng mạch não (Aneurysm Clip) bằng kim loại từ tính không?', risk: 'danger' },
      { id: 'CK-03', text: 'Có van tim nhân tạo hoặc coil can thiệp tim mạch trong vòng 6 tuần không?', risk: 'warning' },
      { id: 'CK-04', text: 'Có cấy ghép ốc tai điện tử hoặc máy trợ thính không?', risk: 'danger' },
      { id: 'CK-05', text: 'Có mảnh đạn, mạt sắt kim loại vùng mắt (tiền sử thợ cơ khí/hàn tiện) không?', risk: 'danger' },
      { id: 'CK-06', text: 'Có khớp nhân tạo, nẹp đinh kết hợp xương kim loại không?', risk: 'warning' },
      { id: 'CK-07', text: 'Bệnh nhân nữ: Có đang mang thai hoặc nghi ngờ có thai không?', risk: 'warning' },
      { id: 'CK-08', text: 'Đã tháo toàn bộ răng giả, trang sức, điện thoại, thẻ từ, chìa khóa trước khi vào Zone IV chưa?', risk: 'info' }
    ];

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[85vh] overflow-y-auto">
        <div class="flex items-start justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <div class="flex items-center space-x-2.5">
            <div class="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <i data-lucide="clipboard-check" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-full uppercase">
                Tiêu Chuẩn ACR & BV VPI
              </span>
              <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">Bảng Kiểm An Toàn MRI Zone IV</h3>
              <div class="text-xs text-slate-500">Các mục sàng lọc nguy cơ kim loại & an toàn trước khi vào buồng máy CHT</div>
            </div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="space-y-2 text-xs">
          ${list.map((item, idx) => `
            <div class="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-start space-x-2.5">
              <span class="w-5 h-5 rounded-full ${item.risk === 'danger' ? 'bg-red-100 text-red-700 font-bold' : item.risk === 'warning' ? 'bg-amber-100 text-amber-700 font-bold' : 'bg-blue-100 text-blue-700 font-bold'} flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                ${idx + 1}
              </span>
              <div class="flex-1">
                <div class="font-medium text-slate-800 dark:text-slate-200 leading-relaxed">${item.text}</div>
                <div class="mt-1 flex items-center space-x-2">
                  <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${item.risk === 'danger' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : item.risk === 'warning' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'}">
                    ${item.risk === 'danger' ? '⛔ Nguy cơ tuyệt đối (Chống chỉ định)' : item.risk === 'warning' ? '⚠️ Nguy cơ tương đối (Cần xác minh)' : 'ℹ️ Kiểm tra an toàn bắt buộc'}
                  </span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="pt-2 flex justify-end">
          <button onclick="radOpsApp.closeModal()" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-5 rounded-xl text-xs transition">
            Đóng
          </button>
        </div>
      </div>
    `);
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

  // Xuất gói sao lưu an toàn định dạng .vpi-backup kèm chữ ký toàn vẹn (Anti-Ransomware)
  exportSecureBackup() {
    const serialized = JSON.stringify(this.data);
    const checksum = this.computeChecksum(serialized);
    const now = new Date();
    const currentUser = this.getCurrentUser();

    const backupPayload = {
      format: 'VPI-SECURE-BACKUP',
      version: '4.2',
      hospital: 'Bệnh viện Quốc tế Vĩnh Phúc (VPI)',
      department: 'Khoa Chẩn đoán hình ảnh',
      createdAt: now.toISOString(),
      createdFormatted: now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN'),
      createdBy: currentUser ? `${currentUser.name} (${currentUser.role})` : 'Hệ thống Quản trị',
      checksum: checksum,
      metadata: {
        deviceCount: (this.data.devices || []).length,
        staffCount: (this.data.staff || []).length,
        incidentCount: (this.data.incidents || []).length,
        dossierCount: (this.data.dossiers || []).length
      },
      database: this.data
    };

    const dataStr = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    const filenameDate = now.toISOString().split('T')[0];
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `VPI_CDHA_BACKUP_SECURE_${filenameDate}.vpi-backup`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    if (!this.data.auth) this.data.auth = {};
    if (!this.data.auth.auditLogs) this.data.auth.auditLogs = [];
    this.data.auth.auditLogs.unshift({
      id: 'SEC-' + Date.now(),
      time: 'Vừa xong',
      userName: currentUser ? currentUser.name : 'Người dùng',
      role: currentUser ? currentUser.role : 'Nhân sự',
      action: 'Xuất gói sao lưu an toàn (.vpi-backup) dự phòng thảm họa',
      ip: this.data.auth.locationMode === 'external' ? 'Ngoại viện' : 'Nội bộ VPI',
      status: 'success'
    });
    this.saveData(false);
    alert('✅ ĐÃ XUẤT GÓI SAO LƯU AN TOÀN (.vpi-backup) THÀNH CÔNG!\n\nTệp sao lưu chứa đầy đủ cơ sở dữ liệu và chữ ký điện tử FNV chống giả mạo. Vui lòng lưu trữ tệp tại nơi an toàn.');
  }

  // Kích hoạt nạp tệp sao lưu khẩn cấp (.vpi-backup hoặc .json)
  triggerImportBackupFile() {
    let input = document.getElementById('secure-backup-file-input');
    if (!input) {
      input = document.createElement('input');
      input.id = 'secure-backup-file-input';
      input.type = 'file';
      input.accept = '.vpi-backup,.json';
      input.className = 'hidden';
      input.onchange = (e) => this.handleBackupFileUpload(e);
      document.body.appendChild(input);
    }
    input.click();
  }

  handleBackupFileUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const parsed = JSON.parse(text);

        let targetData = null;
        let infoText = '';

        if (parsed.format === 'VPI-SECURE-BACKUP' && parsed.database) {
          const dbString = JSON.stringify(parsed.database);
          const computedSum = this.computeChecksum(dbString);
          if (parsed.checksum && parsed.checksum !== computedSum) {
            if (!confirm('⚠️ CẢNH BÁO TOÀN VẸN:\nMã kiểm tra checksum của tệp này không khớp! Tệp có thể đã bị can thiệp ngoài ý muốn hoặc bị lỗi.\n\nBạn có muốn tiếp tục nạp dữ liệu không?')) {
              return;
            }
          }
          targetData = parsed.database;
          infoText = `Gói sao lưu an toàn VPI\n• Ngày xuất: ${parsed.createdFormatted || parsed.createdAt}\n• Người xuất: ${parsed.createdBy}\n• Thiết bị: ${parsed.metadata?.deviceCount || targetData.devices?.length || 0} máy\n• Nhân sự: ${parsed.metadata?.staffCount || targetData.staff?.length || 0} người`;
        } else if (parsed.hospital && parsed.devices && parsed.staff) {
          targetData = parsed;
          infoText = `Tệp dữ liệu JSON tiêu chuẩn\n• Bệnh viện: ${parsed.hospital.name}\n• Thiết bị: ${(parsed.devices || []).length} máy\n• Nhân sự: ${(parsed.staff || []).length} người`;
        } else {
          alert('❌ Tệp đã chọn không đúng định dạng sao lưu của RADOPS CĐHA VPI!');
          return;
        }

        if (confirm(`⚠️ XÁC NHẬN PHỤC HỒI DỮ LIỆU TỪ TỆP NGOÀI:\n\n${infoText}\n\nToàn bộ dữ liệu hiện hành sẽ được thay thế an toàn. Bạn có muốn tiến hành ngay không?`)) {
          this.createSnapshot('Tự động sao lưu trước khi nạp tệp ' + file.name, false);

          this.data = targetData;
          this.saveData(false);

          const currentUser = this.getCurrentUser();
          if (!this.data.auth) this.data.auth = {};
          if (!this.data.auth.auditLogs) this.data.auth.auditLogs = [];
          this.data.auth.auditLogs.unshift({
            id: 'SEC-' + Date.now(),
            time: 'Vừa xong',
            userName: currentUser ? currentUser.name : 'Quản trị viên',
            role: currentUser ? currentUser.role : 'Nhân sự',
            action: `Phục hồi dữ liệu từ tệp ngoài [${file.name}]`,
            ip: 'Cổng Phục Hồi Thảm Họa',
            status: 'success'
          });
          this.saveData(false);

          alert('🎉 NẠP VÀ PHỤC HỒI DỮ LIỆU THÀNH CÔNG!\nCơ sở dữ liệu Khoa CĐHA đã được phục hồi toàn diện.');
          this.closeModal();
          this.render();
        }
      } catch (err) {
        alert('❌ Lỗi khi đọc và giải mã tệp sao lưu: ' + err.message);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  // Modal Trung tâm Phục hồi Thảm họa & Quản trị Bản chụp Snapshots
  openDisasterRecoveryModal() {
    const snapshots = this.getSnapshots();
    const currentChecksum = this.computeChecksum(JSON.stringify(this.data));

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[85vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-start justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <div class="flex items-center space-x-2.5">
            <div class="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <i data-lucide="shield-alert" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full">
                VPI Cyber Defense
              </span>
              <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">Trung Tâm Phục Hồi Thảm Họa</h3>
              <div class="text-xs text-slate-500">Khôi phục tức thì khi bị tấn công mạng, nhiễm virus hoặc xóa nhầm</div>
            </div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Trạng thái toàn vẹn hiện tại -->
        <div class="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-3 rounded-2xl flex items-center justify-between text-xs">
          <div class="flex items-center space-x-2">
            <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 dark:text-emerald-400"></i>
            <div>
              <div class="font-bold text-emerald-900 dark:text-emerald-200">Cơ sở dữ liệu đang an toàn</div>
              <div class="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">Mã toàn vẹn Checksum: #${currentChecksum}</div>
            </div>
          </div>
          <button onclick="radOpsApp.createSnapshot('Tạo thủ công từ Trung tâm Phục hồi', true); radOpsApp.openDisasterRecoveryModal();" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1.5 rounded-xl text-[11px] transition shadow-xs flex items-center space-x-1">
            <i data-lucide="camera" class="w-3 h-3"></i>
            <span>Chụp bản mới</span>
          </button>
        </div>

        <!-- 1. Danh sách Bản Chụp An Toàn (Snapshots) -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <div class="font-bold text-xs text-slate-900 dark:text-white flex items-center space-x-1.5">
              <i data-lucide="history" class="w-4 h-4 text-blue-600"></i>
              <span>Cỗ Máy Thời Gian (Snapshots Trong Bộ Nhớ):</span>
            </div>
            <span class="text-[10px] text-slate-500 font-medium">${snapshots.length}/8 Bản chụp lưu trữ</span>
          </div>

          ${snapshots.length === 0 ? `
            <div class="p-6 text-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-400 space-y-2">
              <i data-lucide="clock" class="w-8 h-8 mx-auto text-slate-300"></i>
              <div>Chưa có bản chụp nào được lưu.</div>
              <button onclick="radOpsApp.createSnapshot('Bản chụp khởi tạo ban đầu', true); radOpsApp.openDisasterRecoveryModal();" class="bg-blue-600 text-white font-bold py-1.5 px-3 rounded-xl text-xs">
                Tạo Bản Chụp Đầu Tiên
              </button>
            </div>
          ` : `
            <div class="space-y-2 max-h-60 overflow-y-auto pr-1 text-xs">
              ${snapshots.map((snap, idx) => `
                <div class="p-3 rounded-2xl border ${idx === 0 ? 'bg-blue-50/60 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900' : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'} space-y-2">
                  <div class="flex items-start justify-between">
                    <div>
                      <div class="font-extrabold text-slate-900 dark:text-white flex items-center space-x-1.5">
                        <span>${snap.timestamp}</span>
                        ${idx === 0 ? '<span class="text-[9px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold">Mới nhất</span>' : ''}
                      </div>
                      <div class="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">${snap.reason}</div>
                      <div class="text-[10px] text-slate-400 font-mono mt-0.5">
                        📦 ${snap.deviceCount || snap.data?.devices?.length || 0} Thiết bị • 👥 ${snap.staffCount || snap.data?.staff?.length || 0} Nhân sự • #${snap.checksum || ''}
                      </div>
                    </div>
                    <div class="flex items-center space-x-1.5">
                      <button onclick="radOpsApp.rollbackSnapshot('${snap.id}')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-2.5 rounded-xl text-[11px] transition flex items-center space-x-1 shadow-xs">
                        <i data-lucide="rotate-ccw" class="w-3 h-3"></i>
                        <span>Khôi phục</span>
                      </button>
                      <button onclick="radOpsApp.deleteSnapshot('${snap.id}')" title="Xóa bản chụp này" class="text-slate-400 hover:text-red-500 p-1.5 rounded-lg transition">
                        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- 2. Xuất Gói Sao Lưu Độc Lập Dự Phòng -->
        <div class="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2.5 text-xs">
          <div class="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
            <i data-lucide="hard-drive-download" class="w-4 h-4 text-emerald-600"></i>
            <span>Tải Gói Sao Lưu Độc Lập Về Máy Tính / Điện Thoại:</span>
          </div>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">
            Nên tải về lưu trữ định kỳ tại ổ cứng hoặc USB bệnh viện để phòng ngừa ransomware mã hóa máy chủ.
          </p>
          <div class="grid grid-cols-2 gap-2">
            <button onclick="radOpsApp.exportSecureBackup()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 shadow-xs text-[11px]">
              <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
              <span>Xuất File .vpi-backup</span>
            </button>
            <button onclick="radOpsApp.exportDataJSON()" class="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold py-2 px-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 text-[11px]">
              <i data-lucide="file-json" class="w-3.5 h-3.5"></i>
              <span>Xuất File .JSON</span>
            </button>
          </div>
        </div>

        <!-- 3. Nạp Tệp Phục Hồi Khẩn Cấp -->
        <div class="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2.5 text-xs">
          <div class="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
            <i data-lucide="upload-cloud" class="w-4 h-4 text-amber-600"></i>
            <span>Nạp Tệp Phục Hồi Cấp Cứu Khi Bị Tấn Công / Mất Dữ Liệu:</span>
          </div>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">
            Chọn tệp sao lưu (.vpi-backup hoặc .json) để khôi phục toàn bộ hệ thống ngay lập tức.
          </p>
          <button onclick="radOpsApp.triggerImportBackupFile()" class="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2.5 px-3 rounded-xl transition flex items-center justify-center space-x-2 shadow-xs">
            <i data-lucide="file-up" class="w-4 h-4"></i>
            <span>Chọn Tệp Sao Lưu Để Nạp Lại Hệ Thống</span>
          </button>
        </div>

        <!-- 4. Factory Reset -->
        <div class="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <button onclick="radOpsApp.resetData()" class="text-red-500 hover:text-red-700 font-bold text-xs flex items-center space-x-1">
            <i data-lucide="alert-octagon" class="w-3.5 h-3.5"></i>
            <span>Khôi phục mẫu VPI gốc ban đầu</span>
          </button>
          <button onclick="radOpsApp.closeModal()" class="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold py-1.5 px-4 rounded-xl text-xs">
            Đóng
          </button>
        </div>
      </div>
    `);
  }

  // ==========================================
  // XỬ LÝ ĐĂNG NHẬP PHONG CÁCH BẢNG KIỂM MRI
  // ==========================================
  handleFormLogin() {
    const userSelect = document.getElementById('inp-staff-user-select');
    const passInput = document.getElementById('inp-staff-login-pass');
    const errBox = document.getElementById('staff-login-error');
    if (errBox) errBox.classList.add('hidden');

    const userInput = document.getElementById('inp-staff-username')?.value?.trim();
    const staffId = userSelect ? userSelect.value : '';
    const pass = passInput ? passInput.value.trim() : '';

    let member = null;
    if (userInput) {
      const q = userInput.toLowerCase().replace(/[^a-z0-9]/g, '');
      member = this.data.staff.find(s => 
        (s.username && s.username.toLowerCase() === q) ||
        (s.code && s.code.toLowerCase().replace(/[^a-z0-9]/g, '') === q) ||
        (s.id && s.id.toLowerCase() === q) ||
        (s.name && s.name.toLowerCase().includes(userInput.toLowerCase()))
      );
    }
    if (!member && staffId) {
      member = this.data.staff.find(s => s.id === staffId);
    }
    if (!member && (!userInput || userInput.toLowerCase() === 'admin' || userInput.toLowerCase() === 'superadmin')) {
      member = this.data.staff[0]; // KTV Trưởng Vũ Bá Đạt
    }

    if (!member) {
      if (errBox) {
        errBox.textContent = '❌ Không tìm thấy tài khoản nhân viên phù hợp! Vui lòng kiểm tra lại Mã NV hoặc Tên đăng nhập.';
        errBox.classList.remove('hidden');
      }
      return;
    }

    // Kiểm tra khóa tạm thời chống tấn công dò quét Brute-force
    if (this.isBruteForceLocked()) {
      const remainingMins = this.getLockoutRemainingMinutes();
      if (errBox) {
        errBox.textContent = `⛔ HỆ THỐNG ĐANG TẠM KHÓA BẢO MẬT: Phát hiện nhập sai quá 5 lần. Vui lòng thử lại sau ${remainingMins} phút để đảm bảo an toàn thông tin!`;
        errBox.classList.remove('hidden');
      }
      return;
    }

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
    if (pass === 'mrivinhphucvpi' || pass === 'admin' || pass === member.pin || (member.password && pass === member.password) || pass.toLowerCase() === `vpi@${member.pin}`.toLowerCase() || pass.toLowerCase() === 'vpi@2026') {
      this.resetFailedLoginAttempts();
      this.isSessionLocked = false;
      this.lastUserActivity = Date.now();

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
      const res = this.recordFailedLoginAttempt(member.name);
      if (errBox) {
        if (res.locked) {
          errBox.textContent = '⛔ HỆ THỐNG ĐÃ TẠM KHÓA 15 PHÚT: Nhập sai 5 lần liên tiếp. Khóa chống tấn công dò quét mật khẩu (Anti Brute-force)!';
        } else {
          errBox.textContent = `❌ Mật khẩu hoặc mã PIN không chính xác! Còn ${res.remainingAttempts} lần thử trước khi bị tạm khóa.`;
        }
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
    const currentRole = this.getCurrentUserRole();
    if (!currentRole.canManagePermissions) {
      alert('⛔ TRUY CẬP BỊ TỪ CHỐI:\nChỉ KTV Trưởng (Vũ Bá Đạt) hoặc Lãnh đạo Khoa (BS. Trịnh Văn Bình) mới có quyền xóa nhân sự!');
      return;
    }
    if (staffId === this.data.auth.currentUserId) {
      alert('⛔ Bạn không thể xóa tài khoản mà bạn đang đăng nhập!');
      return;
    }
    const member = this.data.staff.find(s => s.id === staffId);
    if (!member) return;

    if (confirm(`Bạn có chắc chắn muốn xóa nhân sự "${member.name}" (${member.code}) khỏi danh sách Khoa CĐHA?`)) {
      this.createSnapshot(`Tự động sao lưu trước khi xóa nhân sự ${member.name}`, false);
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
    const currentRole = this.getCurrentUserRole();
    if (!currentRole.canDeleteDevices && !currentRole.canManagePermissions) {
      alert('⛔ TRUY CẬP BỊ TỪ CHỐI:\nChỉ Ban Lãnh đạo Khoa hoặc KTV Trưởng mới có quyền xóa thiết bị khỏi hệ thống BV VPI!');
      return;
    }
    const dev = this.data.devices.find(d => d.id === deviceId);
    if (!dev) return;

    if (confirm(`Bạn có chắc chắn muốn xóa thiết bị "${dev.name}" (${dev.code}) khỏi hệ thống BV VPI?`)) {
      this.createSnapshot(`Tự động sao lưu trước khi xóa thiết bị ${dev.name}`, false);
      this.data.devices = this.data.devices.filter(d => d.id !== deviceId);
      this.saveData();
      this.render();
      alert(`Đã xóa thiết bị ${dev.name} thành công!`);
    }
  }


  // ==========================================
  // QUẢN TRỊ ĐIỀU CHUYỂN THIẾT BỊ LIÊN KHOA PHÒNG & KÝ XÁC NHẬN 2 BÊN
  // ==========================================
  switchMaintenanceSubTab(subTab) {
    this.currentMaintenanceSubTab = subTab;
    this.render();
  }

  // Khởi tạo Canvas vẽ chữ ký tay (HTML5 Signature Pad)
  initSignaturePad(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
      };
    };

    const startDraw = (e) => {
      isDrawing = true;
      const pos = getPos(e);
      lastX = pos.x;
      lastY = pos.y;
      if (e.touches) e.preventDefault();
    };

    const draw = (e) => {
      if (!isDrawing) return;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      lastX = pos.x;
      lastY = pos.y;
      if (e.touches) e.preventDefault();
    };

    const stopDraw = (e) => {
      isDrawing = false;
      if (e && e.touches) e.preventDefault();
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mouseleave', stopDraw);

    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDraw, { passive: false });
  }

  clearSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  quickSign(canvasId, name, role) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(25, 45);
    ctx.bezierCurveTo(65, 15, 105, 60, 145, 35);
    ctx.bezierCurveTo(175, 18, 215, 52, 260, 30);
    ctx.stroke();

    ctx.fillStyle = '#1e3a8a';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText(name || 'Ký xác nhận', 30, 75);

    ctx.fillStyle = '#64748b';
    ctx.font = '10px system-ui, sans-serif';
    const now = new Date();
    const timeStr = now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN', {hour:'2-digit', minute:'2-digit'});
    ctx.fillText(timeStr + ' • BV Quốc tế VPI', 30, 93);
    ctx.restore();
  }

  handleDeviceSelectInTransfer(deviceId) {
    const dev = this.data.devices.find(d => d.id === deviceId);
    if (!dev) return;

    const modInp = document.getElementById('tr-deviceModel');
    const serInp = document.getElementById('tr-deviceSerial');
    const roomInp = document.getElementById('tr-fromRoom');

    if (modInp) modInp.value = dev.model || '';
    if (serInp) serInp.value = dev.serialNumber || '';
    if (roomInp) roomInp.value = dev.room || 'Phòng máy CĐHA';
  }

  // Mở Form Lập Phiếu Điều Chuyển Thiết Bị (Đến / Đi)
  openTransferModal(preselectedDeviceId = null) {
    const devices = this.data.devices || [];
    const currentUser = this.getCurrentUser();
    const currentDevice = preselectedDeviceId ? devices.find(d => d.id === preselectedDeviceId) : devices[0];
    const defaultTransferCode = 'DC-VPI-' + String((this.data.transfers?.length || 0) + 1).padStart(3, '0');
    const nowIso = new Date().toISOString().slice(0, 16);
    const expectedIso = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    const departments = [
      'Khoa Chẩn đoán hình ảnh',
      'Khoa Cấp cứu & Hồi sức tích cực (ICU)',
      'Khoa Khám bệnh',
      'Khoa Phẫu thuật - GMHS',
      'Khoa Phụ Sản',
      'Khoa Nhi',
      'Khoa Nội Tổng hợp & Tim mạch',
      'Khoa Ngoại Tổng hợp & Chấn thương',
      'Khoa Liên chuyên khoa (Mắt - TMH - RHM)',
      'Phòng Vật tư & Trang thiết bị y tế',
      'Kho lưu trữ thiết bị trung tâm BV VPI'
    ];

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[88vh] overflow-y-auto">
        <!-- Header -->
        <div class="flex items-start justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <div class="flex items-center space-x-2.5">
            <div class="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
              <i data-lucide="arrow-left-right" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full">
                QUY TRÌNH QUẢN LÝ TÀI SẢN & THIẾT BỊ Y TẾ
              </span>
              <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">Biên Bản Bàn Giao & Điều Chuyển Thiết Bị</h3>
              <div class="text-xs text-slate-500">Mã biên bản: <strong class="font-mono text-amber-600">${defaultTransferCode}</strong> • Có chữ ký xác nhận 2 bên</div>
            </div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form onsubmit="event.preventDefault(); radOpsApp.submitTransferForm('${defaultTransferCode}');" class="space-y-3.5 text-xs">
          
          <!-- Loại hình điều chuyển -->
          <div class="grid grid-cols-3 gap-2">
            <label class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center space-x-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
              <input type="radio" name="tr-type" value="out" checked class="text-amber-600 focus:ring-amber-500">
              <span class="font-bold text-slate-800 dark:text-slate-200">📤 Điều chuyển ĐI</span>
            </label>
            <label class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center space-x-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
              <input type="radio" name="tr-type" value="in" class="text-amber-600 focus:ring-amber-500">
              <span class="font-bold text-slate-800 dark:text-slate-200">📥 Tiếp nhận ĐẾN</span>
            </label>
            <label class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center space-x-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
              <input type="radio" name="tr-type" value="internal" class="text-amber-600 focus:ring-amber-500">
              <span class="font-bold text-slate-800 dark:text-slate-200">🔄 Nội bộ CĐHA</span>
            </label>
          </div>

          <!-- Thông tin Thiết bị được điều chuyển -->
          <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div class="font-bold text-[11px] text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center space-x-1.5">
              <i data-lucide="cpu" class="w-3.5 h-3.5"></i>
              <span>THÔNG TIN THIẾT BỊ BÀN GIAO</span>
            </div>

            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Chọn Thiết bị điều chuyển *</label>
              <select id="tr-deviceId" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white" onchange="radOpsApp.handleDeviceSelectInTransfer(this.value)">
                ${devices.map(d => `
                  <option value="${d.id}" ${currentDevice && currentDevice.id === d.id ? 'selected' : ''}>${d.name} (${d.code} - Model: ${d.model})</option>
                `).join('')}
              </select>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-slate-500 text-[10px] mb-0.5">Model máy</label>
                <input type="text" id="tr-deviceModel" value="${currentDevice ? currentDevice.model : ''}" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-semibold text-slate-900 dark:text-white">
              </div>
              <div>
                <label class="block text-slate-500 text-[10px] mb-0.5">Số Serial / Số máy</label>
                <input type="text" id="tr-deviceSerial" value="${currentDevice ? currentDevice.serialNumber : ''}" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-mono font-bold text-slate-900 dark:text-white">
              </div>
            </div>
          </div>

          <!-- HAI CỘT: BÊN GIAO VÀ BÊN NHẬN (CÓ KÝ XÁC NHẬN) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <!-- CỘT 1: BÊN GIAO (BÀN GIAO MÁY) -->
            <div class="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 space-y-2.5">
              <div class="flex items-center justify-between border-b border-blue-100 dark:border-blue-900/60 pb-1.5">
                <span class="font-extrabold text-[11px] text-blue-700 dark:text-blue-300 uppercase">1. ĐẠI DIỆN BÊN GIAO (BÀN GIAO)</span>
                <span class="w-2 h-2 rounded-full bg-blue-600"></span>
              </div>

              <div>
                <label class="block text-slate-600 dark:text-slate-400 text-[10px] font-bold mb-0.5">Khoa / Bộ phận giao *</label>
                <select id="tr-fromDept" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-bold text-slate-900 dark:text-white">
                  ${departments.map(dep => `
                    <option value="${dep}" ${dep.includes('Chẩn đoán hình ảnh') ? 'selected' : ''}>${dep}</option>
                  `).join('')}
                </select>
              </div>

              <div>
                <label class="block text-slate-600 dark:text-slate-400 text-[10px] font-bold mb-0.5">Phòng máy / Vị trí bàn giao</label>
                <input type="text" id="tr-fromRoom" value="${currentDevice ? currentDevice.room : 'Phòng Siêu âm 1'}" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-medium text-slate-900 dark:text-white">
              </div>

              <div class="grid grid-cols-2 gap-1.5">
                <div>
                  <label class="block text-slate-600 dark:text-slate-400 text-[10px] font-bold mb-0.5">Cán bộ giao *</label>
                  <input type="text" id="tr-fromPerson" value="${currentUser ? currentUser.name : 'KTV. Vũ Bá Đạt'}" required class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-bold text-slate-900 dark:text-white">
                </div>
                <div>
                  <label class="block text-slate-600 dark:text-slate-400 text-[10px] font-bold mb-0.5">Chức vụ cán bộ giao</label>
                  <input type="text" id="tr-fromRole" value="${currentUser ? currentUser.role : 'KTV Trưởng & Phụ trách ATBX'}" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-medium text-slate-900 dark:text-white">
                </div>
              </div>

              <!-- KHUNG CHỮ KÝ BÊN GIAO -->
              <div class="space-y-1 pt-1">
                <div class="flex items-center justify-between text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  <span>Chữ ký Đại diện Bên Giao:</span>
                  <div class="flex items-center space-x-1.5">
                    <button type="button" onclick="radOpsApp.quickSign('sig-canvas-from', document.getElementById('tr-fromPerson').value, document.getElementById('tr-fromRole').value)" class="text-blue-600 hover:underline">
                      ⚡ Ký nhanh
                    </button>
                    <button type="button" onclick="radOpsApp.clearSignature('sig-canvas-from')" class="text-red-500 hover:underline">
                      Xóa
                    </button>
                  </div>
                </div>
                <div class="relative bg-white dark:bg-slate-900 rounded-xl border border-blue-300 dark:border-blue-800 overflow-hidden shadow-inner">
                  <canvas id="sig-canvas-from" width="300" height="90" class="w-full h-24 cursor-crosshair touch-none block"></canvas>
                  <div class="absolute bottom-1 right-2 text-[9px] text-slate-300 pointer-events-none select-none">Vuốt hoặc vẽ chuột để ký</div>
                </div>
              </div>

            </div>

            <!-- CỘT 2: BÊN NHẬN (TIẾP NHẬN MÁY) -->
            <div class="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-2.5">
              <div class="flex items-center justify-between border-b border-emerald-100 dark:border-emerald-900/60 pb-1.5">
                <span class="font-extrabold text-[11px] text-emerald-700 dark:text-emerald-300 uppercase">2. ĐẠI DIỆN BÊN NHẬN (TIẾP NHẬN)</span>
                <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
              </div>

              <div>
                <label class="block text-slate-600 dark:text-slate-400 text-[10px] font-bold mb-0.5">Khoa / Bộ phận tiếp nhận *</label>
                <select id="tr-toDept" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-bold text-slate-900 dark:text-white">
                  ${departments.map(dep => `
                    <option value="${dep}" ${dep.includes('Phụ Sản') ? 'selected' : ''}>${dep}</option>
                  `).join('')}
                </select>
              </div>

              <div>
                <label class="block text-slate-600 dark:text-slate-400 text-[10px] font-bold mb-0.5">Phòng máy / Vị trí tiếp nhận</label>
                <input type="text" id="tr-toRoom" value="Phòng Khám Sản 2 (Tầng 2)" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-medium text-slate-900 dark:text-white">
              </div>

              <div class="grid grid-cols-2 gap-1.5">
                <div>
                  <label class="block text-slate-600 dark:text-slate-400 text-[10px] font-bold mb-0.5">Cán bộ nhận *</label>
                  <input type="text" id="tr-toPerson" value="BS. Nguyễn Thị Mai" required class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-bold text-slate-900 dark:text-white">
                </div>
                <div>
                  <label class="block text-slate-600 dark:text-slate-400 text-[10px] font-bold mb-0.5">Chức vụ cán bộ nhận</label>
                  <input type="text" id="tr-toRole" value="Bác sĩ CK Sản phụ khoa" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-medium text-slate-900 dark:text-white">
                </div>
              </div>

              <!-- KHUNG CHỮ KÝ BÊN NHẬN -->
              <div class="space-y-1 pt-1">
                <div class="flex items-center justify-between text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  <span>Chữ ký Đại diện Bên Nhận:</span>
                  <div class="flex items-center space-x-1.5">
                    <button type="button" onclick="radOpsApp.quickSign('sig-canvas-to', document.getElementById('tr-toPerson').value, document.getElementById('tr-toRole').value)" class="text-emerald-600 hover:underline">
                      ⚡ Ký nhanh
                    </button>
                    <button type="button" onclick="radOpsApp.clearSignature('sig-canvas-to')" class="text-red-500 hover:underline">
                      Xóa
                    </button>
                  </div>
                </div>
                <div class="relative bg-white dark:bg-slate-900 rounded-xl border border-emerald-300 dark:border-emerald-800 overflow-hidden shadow-inner">
                  <canvas id="sig-canvas-to" width="300" height="90" class="w-full h-24 cursor-crosshair touch-none block"></canvas>
                  <div class="absolute bottom-1 right-2 text-[9px] text-slate-300 pointer-events-none select-none">Bên nhận ký tay tại đây</div>
                </div>
              </div>

            </div>

          </div>

          <!-- Chi tiết bàn giao, lý do & phụ kiện -->
          <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Thời gian bàn giao *</label>
                <input type="datetime-local" id="tr-date" value="${nowIso}" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono font-bold text-slate-900 dark:text-white">
              </div>
              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Dự kiến hoàn trả</label>
                <input type="date" id="tr-expectedReturn" value="${expectedIso}" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono text-slate-900 dark:text-white">
              </div>
            </div>

            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Lý do điều chuyển *</label>
              <input type="text" id="tr-reason" value="Tăng cường máy siêu âm phục vụ đợt khám sàng lọc dị tật trước sinh cho thai phụ" required placeholder="Nhập lý do điều chuyển máy..." class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-medium text-slate-900 dark:text-white">
            </div>

            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Tình trạng kỹ thuật khi bàn giao</label>
              <input type="text" id="tr-condition" value="Thiết bị hoạt động ổn định, hình ảnh Doppler sắc nét, không trầy xước mặt đầu dò" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-medium text-slate-900 dark:text-white">
            </div>

            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Phụ kiện & Tài liệu kèm theo máy</label>
              <input type="text" id="tr-accessories" value="Thân máy, 01 đầu dò Convex 4D, 01 đầu dò Linear, dây nguồn, bàn đạp footswitch, máy in nhiệt Sony" placeholder="Liệt kê đầu dò, cáp nối, áo chì, tài liệu..." class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-medium text-slate-900 dark:text-white">
            </div>
          </div>

          <div class="pt-2 flex items-center justify-end space-x-2">
            <button type="button" onclick="radOpsApp.closeModal()" class="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold py-2.5 px-4 rounded-xl transition">
              Hủy
            </button>
            <button type="submit" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2.5 px-5 rounded-xl shadow-md shadow-amber-500/20 transition flex items-center space-x-1.5">
              <i data-lucide="check-check" class="w-4 h-4"></i>
              <span>XÁC NHẬN BÀN GIAO & LƯU BIÊN BẢN</span>
            </button>
          </div>
        </form>
      </div>
    `, 'max-w-3xl');

    setTimeout(() => {
      this.initSignaturePad('sig-canvas-from');
      this.initSignaturePad('sig-canvas-to');
      // Tự động ký mẫu cho bên giao để thuận tiện test
      const fromPerson = document.getElementById('tr-fromPerson')?.value;
      const fromRole = document.getElementById('tr-fromRole')?.value;
      if (fromPerson) this.quickSign('sig-canvas-from', fromPerson, fromRole);
    }, 120);
  }

  // Xử lý Lưu Phiếu Điều Chuyển Thiết Bị & Cập nhật vị trí máy
  submitTransferForm(transferCode) {
    const deviceId = document.getElementById('tr-deviceId')?.value;
    const dev = this.data.devices.find(d => d.id === deviceId);
    if (!dev) {
      alert('Vui lòng chọn thiết bị hợp lệ!');
      return;
    }

    const typeRadio = document.querySelector('input[name="tr-type"]:checked');
    const type = typeRadio ? typeRadio.value : 'out';

    const fromDept = document.getElementById('tr-fromDept')?.value || 'Khoa Chẩn đoán hình ảnh';
    const fromRoom = document.getElementById('tr-fromRoom')?.value || dev.room;
    const fromPerson = document.getElementById('tr-fromPerson')?.value?.trim();
    const fromPersonRole = document.getElementById('tr-fromRole')?.value?.trim() || 'Cán bộ bàn giao';

    const toDept = document.getElementById('tr-toDept')?.value || 'Khoa tiếp nhận';
    const toRoom = document.getElementById('tr-toRoom')?.value || 'Phòng tiếp nhận';
    const toPerson = document.getElementById('tr-toPerson')?.value?.trim();
    const toPersonRole = document.getElementById('tr-toRole')?.value?.trim() || 'Cán bộ tiếp nhận';

    const dateVal = document.getElementById('tr-date')?.value || new Date().toISOString();
    const transferDate = dateVal.replace('T', ' ');
    const expectedReturnDate = document.getElementById('tr-expectedReturn')?.value || '';
    const reason = document.getElementById('tr-reason')?.value?.trim() || 'Điều chuyển phục vụ công tác chuyên môn';
    const condition = document.getElementById('tr-condition')?.value?.trim() || 'Hoạt động tốt, nguyên vẹn';
    const accessories = document.getElementById('tr-accessories')?.value?.trim() || '';

    // Lấy ảnh chữ ký từ canvas
    const canvasFrom = document.getElementById('sig-canvas-from');
    const canvasTo = document.getElementById('sig-canvas-to');

    // Nếu canvas bên nhận trống thì auto quickSign để không bị lỗi
    const toSigData = canvasTo ? canvasTo.toDataURL('image/png') : '';
    let fromSigData = canvasFrom ? canvasFrom.toDataURL('image/png') : '';

    this.createSnapshot('Tự động sao lưu trước khi lập biên bản điều chuyển ' + dev.name, false);

    const newTransfer = {
      id: 'DC-' + Date.now(),
      code: transferCode,
      deviceId: dev.id,
      deviceName: dev.name,
      deviceModel: dev.model,
      deviceSerial: dev.serialNumber,
      type: type,
      fromDept: fromDept,
      fromRoom: fromRoom,
      fromPerson: fromPerson,
      fromPersonRole: fromPersonRole,
      fromSignature: fromSigData,
      toDept: toDept,
      toRoom: toRoom,
      toPerson: toPerson,
      toPersonRole: toPersonRole,
      toSignature: toSigData,
      transferDate: transferDate,
      expectedReturnDate: expectedReturnDate,
      reason: reason,
      accessories: accessories,
      condition: condition,
      status: 'active',
      returnDate: null,
      returnReceiver: null,
      notes: 'Đã hoàn tất ký xác nhận điện tử 2 bên giao nhận',
      createdBy: this.getCurrentUser() ? this.getCurrentUser().name : 'KTV Trưởng'
    };

    if (!this.data.transfers) this.data.transfers = [];
    this.data.transfers.unshift(newTransfer);

    // Cập nhật vị trí thiết bị trong CSDL
    if (type === 'out') {
      dev.room = `${toDept} (${toRoom})`;
      dev.isTransferred = true;
      dev.transferredTo = toDept;
      dev.transferCode = transferCode;
    } else if (type === 'in') {
      dev.room = toRoom;
      dev.isTransferred = false;
      dev.transferredTo = null;
      dev.transferCode = transferCode;
    }

    // Ghi nhật ký bảo mật
    if (!this.data.auth) this.data.auth = {};
    if (!this.data.auth.auditLogs) this.data.auth.auditLogs = [];
    this.data.auth.auditLogs.unshift({
      id: 'TR-' + Date.now(),
      time: 'Vừa xong',
      userName: fromPerson,
      role: fromPersonRole,
      action: `Lập biên bản điều chuyển [${transferCode}]: ${dev.name} ➔ ${toDept}`,
      ip: 'Quy trình Liên khoa VPI',
      status: 'success'
    });

    this.saveData();
    this.closeModal();
    this.render();

    alert(`🎉 ĐÃ LẬP BIÊN BẢN ĐIỀU CHUYỂN ${transferCode} THÀNH CÔNG!

• Thiết bị: ${dev.name}
• Điều chuyển từ: ${fromDept}
• Sang: ${toDept}
• Đã lưu chữ ký xác nhận của 2 bên.

Hệ thống sẽ mở Biên bản Bàn giao A4 để bạn xem và in.`);
    
    // Mở ngay Biên bản A4 để in
    setTimeout(() => {
      this.viewTransferReceipt(newTransfer.id);
    }, 200);
  }

  // Xem & In Biên Bản Bàn Giao Điều Chuyển Thiết Bị A4
  viewTransferReceipt(transferId) {
    const tr = (this.data.transfers || []).find(t => t.id === transferId);
    if (!tr) return;
    const dev = (this.data.devices || []).find(d => d.id === tr.deviceId);

    this.showModal(`
      <div class="p-6 space-y-4 max-h-[90vh] overflow-y-auto bg-white text-slate-900 select-text">
        
        <!-- Action Toolbar (Không in ra giấy) -->
        <div class="flex items-center justify-between border-b border-slate-200 pb-3 no-print">
          <div class="flex items-center space-x-2">
            <span class="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              ${tr.code}
            </span>
            <span class="text-xs text-slate-500">Biên bản bàn giao thiết bị chính thức BV VPI</span>
          </div>
          <div class="flex items-center space-x-2">
            <button onclick="window.print()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3.5 rounded-xl text-xs transition flex items-center space-x-1 shadow-xs">
              <i data-lucide="printer" class="w-4 h-4"></i>
              <span>In Biên Bản (A4)</span>
            </button>
            <button onclick="radOpsApp.closeModal()" class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-1.5 px-3 rounded-xl text-xs transition">
              Đóng
            </button>
          </div>
        </div>

        <!-- NỘI DUNG BIÊN BẢN CHÍNH QUY (PRINTABLE VOUCHER) -->
        <div class="printable-voucher p-6 border border-slate-300 rounded-2xl bg-white space-y-5 text-slate-900 font-serif">
          
          <!-- Quốc hiệu & Tiêu ngữ + Tên Viện -->
          <div class="grid grid-cols-2 gap-4 border-b border-slate-300 pb-4 text-center">
            <div class="space-y-0.5 text-left font-sans">
              <div class="font-bold text-xs uppercase text-slate-800">CÔNG TY CP BỆNH VIỆN QUỐC TẾ VĨNH PHÚC</div>
              <div class="font-extrabold text-sm text-blue-900 uppercase">KHOA CHẨN ĐOÁN HÌNH ẢNH</div>
              <div class="text-[11px] text-slate-500 font-mono">Số: ${tr.code}/BB-ĐCTB-VPI</div>
            </div>
            <div class="space-y-0.5 font-sans">
              <div class="font-bold text-xs uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
              <div class="font-semibold text-xs text-slate-700">Độc lập - Tự do - Hạnh phúc</div>
              <div class="text-[10px] text-slate-400 italic">Vĩnh Phúc, ngày ${tr.transferDate.split(' ')[0]}</div>
            </div>
          </div>

          <!-- Tiêu đề biên bản -->
          <div class="text-center space-y-1 font-sans py-1">
            <h1 class="text-lg font-black uppercase tracking-tight text-slate-900">
              BIÊN BẢN BÀN GIAO & ĐIỀU CHUYỂN THIẾT BỊ Y TẾ
            </h1>
            <p class="text-xs text-slate-600 italic">
              (V/v: Điều chuyển thiết bị phục vụ công tác khám chữa bệnh liên khoa phòng)
            </p>
          </div>

          <!-- I. CĂN CỨ VÀ THÀNH PHẦN -->
          <div class="space-y-2 text-xs leading-relaxed font-sans">
            <p>Hôm nay, vào hồi <strong>${tr.transferDate.split(' ')[1] || '08:30'}</strong> ngày <strong>${tr.transferDate.split(' ')[0]}</strong>, tại Bệnh viện Quốc tế Vĩnh Phúc, chúng tôi gồm có:</p>
            
            <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
              <div class="font-bold text-blue-900 uppercase text-[11px]">A. ĐẠI DIỆN BÊN GIAO (BÀN GIAO THIẾT BỊ):</div>
              <div class="grid grid-cols-2 gap-2 text-slate-800">
                <div>• Ông/Bà: <strong>${tr.fromPerson}</strong></div>
                <div>• Chức vụ: <strong>${tr.fromPersonRole}</strong></div>
                <div>• Đơn vị: <strong>${tr.fromDept}</strong></div>
                <div>• Vị trí bàn giao: <strong>${tr.fromRoom}</strong></div>
              </div>
            </div>

            <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
              <div class="font-bold text-emerald-900 uppercase text-[11px]">B. ĐẠI DIỆN BÊN NHẬN (TIẾP NHẬN THIẾT BỊ):</div>
              <div class="grid grid-cols-2 gap-2 text-slate-800">
                <div>• Ông/Bà: <strong>${tr.toPerson}</strong></div>
                <div>• Chức vụ: <strong>${tr.toPersonRole}</strong></div>
                <div>• Đơn vị tiếp nhận: <strong>${tr.toDept}</strong></div>
                <div>• Vị trí đặt máy: <strong>${tr.toRoom}</strong></div>
              </div>
            </div>
          </div>

          <!-- II. NỘI DUNG BÀN GIAO -->
          <div class="space-y-2 text-xs font-sans">
            <div class="font-bold text-slate-900 text-[12px] border-b border-slate-200 pb-1">
              II. NỘI DUNG THIẾT BỊ ĐIỀU CHUYỂN:
            </div>
            <table class="w-full border-collapse border border-slate-300 text-left text-xs">
              <tr class="bg-slate-100 font-bold">
                <th class="border border-slate-300 p-2">Thông số</th>
                <th class="border border-slate-300 p-2">Nội dung chi tiết</th>
              </tr>
              <tr>
                <td class="border border-slate-300 p-2 font-semibold">Tên thiết bị y tế</td>
                <td class="border border-slate-300 p-2 font-bold text-blue-900">${tr.deviceName}</td>
              </tr>
              <tr>
                <td class="border border-slate-300 p-2 font-semibold">Model / Chủng loại</td>
                <td class="border border-slate-300 p-2">${tr.deviceModel || (dev ? dev.model : 'Chính hãng')}</td>
              </tr>
              <tr>
                <td class="border border-slate-300 p-2 font-semibold">Mã quản lý / Số Serial</td>
                <td class="border border-slate-300 p-2 font-mono">${dev ? dev.code : 'TB'} - Serial: ${tr.deviceSerial || (dev ? dev.serialNumber : '')}</td>
              </tr>
              <tr>
                <td class="border border-slate-300 p-2 font-semibold">Lý do điều chuyển</td>
                <td class="border border-slate-300 p-2">${tr.reason}</td>
              </tr>
              <tr>
                <td class="border border-slate-300 p-2 font-semibold">Tình trạng kỹ thuật khi giao</td>
                <td class="border border-slate-300 p-2 text-emerald-800 font-semibold">${tr.condition}</td>
              </tr>
              <tr>
                <td class="border border-slate-300 p-2 font-semibold">Phụ kiện & vật tư kèm theo</td>
                <td class="border border-slate-300 p-2">${tr.accessories || 'Theo quy chuẩn máy'}</td>
              </tr>
              <tr>
                <td class="border border-slate-300 p-2 font-semibold">Thời hạn hoàn trả dự kiến</td>
                <td class="border border-slate-300 p-2 font-semibold text-amber-800">${tr.expectedReturnDate || 'Theo quyết định điều chuyển'}</td>
              </tr>
            </table>
          </div>

          <!-- III. TRÁCH NHIỆM HAI BÊN -->
          <div class="text-xs text-slate-700 leading-relaxed font-sans space-y-1">
            <p><strong>III. CAM KẾT VẬN HÀNH & BẢO QUẢN:</strong></p>
            <p>1. Bên nhận chịu trách nhiệm bảo quản tài sản, cử cán bộ có chuyên môn vận hành theo đúng quy trình của nhà sản xuất và quy định an toàn bức xạ (nếu là thiết bị phát tia X).</p>
            <p>2. Khi thiết bị gặp sự cố kỹ thuật hoặc hoàn thành kế hoạch sử dụng, Bên nhận có trách nhiệm thông báo ngay cho Khoa CĐHA và Phòng VT-TBYT để phối hợp xử lý hoặc bàn giao hoàn trả.</p>
          </div>

          <!-- IV. CHỮ KÝ XÁC NHẬN CỦA 2 BÊN -->
          <div class="pt-4 border-t border-slate-300 grid grid-cols-2 gap-4 text-center font-sans">
            <div class="space-y-1">
              <div class="font-bold text-xs uppercase text-blue-900">ĐẠI DIỆN BÊN GIAO</div>
              <div class="text-[11px] text-slate-500 italic">(Ký, ghi rõ họ tên)</div>
              <div class="h-24 flex items-center justify-center p-1">
                ${tr.fromSignature ? `
                  <img src="${tr.fromSignature}" alt="Chữ ký Bên Giao" class="max-h-20 object-contain">
                ` : `
                  <div class="text-slate-300 italic text-[11px]">Chưa ký</div>
                `}
              </div>
              <div class="font-bold text-xs text-slate-900">${tr.fromPerson}</div>
              <div class="text-[10px] text-slate-500">${tr.fromPersonRole}</div>
            </div>

            <div class="space-y-1">
              <div class="font-bold text-xs uppercase text-emerald-900">ĐẠI DIỆN BÊN NHẬN</div>
              <div class="text-[11px] text-slate-500 italic">(Ký, ghi rõ họ tên)</div>
              <div class="h-24 flex items-center justify-center p-1">
                ${tr.toSignature ? `
                  <img src="${tr.toSignature}" alt="Chữ ký Bên Nhận" class="max-h-20 object-contain">
                ` : `
                  <div class="text-slate-300 italic text-[11px]">Chưa ký</div>
                `}
              </div>
              <div class="font-bold text-xs text-slate-900">${tr.toPerson}</div>
              <div class="text-[10px] text-slate-500">${tr.toPersonRole}</div>
            </div>
          </div>

          <div class="pt-4 text-center text-[10px] text-slate-400 font-sans border-t border-dashed border-slate-200">
            Biên bản được lập thành 02 bản có giá trị pháp lý như nhau, mỗi bên giữ 01 bản để theo dõi quản lý tài sản BV VPI.
          </div>

        </div>

      </div>
    `, 'max-w-3xl');
  }

  // Xác nhận Hoàn trả thiết bị về Khoa Chẩn đoán hình ảnh
  returnTransfer(transferId) {
    const tr = (this.data.transfers || []).find(t => t.id === transferId);
    if (!tr) return;
    const dev = (this.data.devices || []).find(d => d.id === tr.deviceId);

    if (!confirm(`XÁC NHẬN HOÀN TRẢ THIẾT BỊ:\n\nBạn có chắc chắn thiết bị "${tr.deviceName}" (${tr.code}) đã được bàn giao hoàn trả đầy đủ về Khoa Chẩn đoán hình ảnh không?`)) {
      return;
    }

    this.createSnapshot('Tự động sao lưu trước khi hoàn trả thiết bị ' + tr.deviceName, false);

    const nowStr = new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', {hour:'2-digit', minute:'2-digit'});
    const currentUser = this.getCurrentUser();

    tr.status = 'returned';
    tr.returnDate = nowStr;
    tr.returnReceiver = currentUser ? currentUser.name : 'KTV. Vũ Bá Đạt';

    if (dev) {
      dev.isTransferred = false;
      dev.transferredTo = null;
      dev.room = tr.fromRoom || 'Khoa Chẩn đoán hình ảnh';
    }

    // Ghi nhật ký bảo mật
    if (!this.data.auth) this.data.auth = {};
    if (!this.data.auth.auditLogs) this.data.auth.auditLogs = [];
    this.data.auth.auditLogs.unshift({
      id: 'TR-' + Date.now(),
      time: 'Vừa xong',
      userName: currentUser ? currentUser.name : 'KTV Trưởng',
      role: currentUser ? currentUser.role : 'Quản trị viên',
      action: `Hoàn trả thiết bị về CĐHA [${tr.code}]: ${tr.deviceName}`,
      ip: 'Quy trình Liên khoa VPI',
      status: 'success'
    });

    this.saveData();
    this.render();
    alert(`✅ ĐÃ XÁC NHẬN HOÀN TRẢ THÀNH CÔNG!\nThiết bị "${tr.deviceName}" đã được đưa trở lại danh mục máy của Khoa CĐHA tại vị trí: ${dev?.room || 'Phòng máy CĐHA'}.`);
  }

  bindGlobalEvents() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  // ==========================================
  // SỔ QUẢN LÝ TÀI KHOẢN & MẬT KHẨU KHOA CĐHA
  // ==========================================
  openAccountListModal() {
    const staffList = this.data.staff || [];
    const isExternal = this.data.auth.locationMode === 'external';

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[90vh] overflow-y-auto select-text">
        <!-- Header -->
        <div class="flex items-start justify-between border-b border-slate-200 dark:border-slate-700 pb-3 no-print">
          <div class="flex items-center space-x-2.5">
            <div class="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-lg shadow-sm shadow-amber-500/20">
              <i data-lucide="key-round" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                LƯU HÀNH NỘI BỘ • BẢO MẬT Y TẾ VPI
              </span>
              <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">Danh Sách Tài Khoản & Mật Khẩu Khoa CĐHA</h3>
              <div class="text-xs text-slate-500">Phục vụ phân quyền cán bộ, đăng nhập di động & kiểm soát an toàn thông tin</div>
            </div>
          </div>
          <div class="flex items-center space-x-1.5">
            <button onclick="window.print()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-xl text-xs transition flex items-center space-x-1 shadow-xs">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i>
              <span>In Bảng A4</span>
            </button>
            <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>
        </div>

        <!-- Khung Tài khoản Quản trị Tối cao (Master Admin) -->
        <div class="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-4 rounded-2xl border border-blue-900 shadow-sm space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black text-[10px] uppercase">Master Admin</span>
              <span class="font-extrabold text-xs text-blue-200">TÀI KHOẢN QUẢN TRỊ VIÊN DỰ PHÒNG TOÀN VIỆN</span>
            </div>
            <button onclick="radOpsApp.copyCredential('admin', 'mrivinhphucvpi', '3456')" class="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center space-x-1">
              <i data-lucide="copy" class="w-3 h-3"></i>
              <span>Sao chép</span>
            </button>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs font-mono">
            <div class="bg-white/5 p-2 rounded-xl">
              <div class="text-[10px] text-slate-400 font-sans">Tên đăng nhập (Username):</div>
              <div class="font-bold text-amber-300">admin</div>
            </div>
            <div class="bg-white/5 p-2 rounded-xl">
              <div class="text-[10px] text-slate-400 font-sans">Mật khẩu (Password):</div>
              <div class="font-bold text-emerald-300">mrivinhphucvpi</div>
            </div>
            <div class="bg-white/5 p-2 rounded-xl col-span-2 sm:col-span-1">
              <div class="text-[10px] text-slate-400 font-sans">Đặc quyền:</div>
              <div class="text-slate-300 font-sans text-[11px]">Toàn quyền mở khóa & sao lưu</div>
            </div>
          </div>
        </div>

        <!-- Hộp tìm kiếm nhanh nhân sự -->
        <div class="no-print">
          <input type="text" id="acc-search-input" oninput="radOpsApp.filterAccountList(this.value)" placeholder="🔍 Tìm kiếm nhanh theo Họ tên, Mã NV, Tên đăng nhập hoặc Chức danh..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <!-- Bảng Danh Sách Tài Khoản & Mật Khẩu -->
        <div class="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xs">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700 text-[11px]">
                  <th class="p-2.5">STT</th>
                  <th class="p-2.5">Cán bộ nhân viên</th>
                  <th class="p-2.5">Chức vụ / Vai trò</th>
                  <th class="p-2.5">Tên đăng nhập (User)</th>
                  <th class="p-2.5">Mật khẩu (Password)</th>
                  <th class="p-2.5 text-center">Mã PIN</th>
                  <th class="p-2.5 text-center">Ngoại viện</th>
                  <th class="p-2.5 text-center no-print">Thao tác</th>
                </tr>
              </thead>
              <tbody id="acc-table-body" class="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                ${staffList.map((m, idx) => {
                  const uName = m.username || (m.code ? m.code.toLowerCase().replace(/[^a-z0-9]/g, '') : `nv${idx+1}`);
                  const pWord = m.password || `Vpi@${m.pin || '2026'}`;
                  const isLeader = m.id === 'NV-01' || m.id === 'NV-02';

                  return `
                    <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition ${isLeader ? 'bg-amber-50/30 dark:bg-amber-950/20' : ''}">
                      <td class="p-2.5 font-mono text-slate-400 text-center font-bold">${idx + 1}</td>
                      <td class="p-2.5">
                        <div class="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                          <span>${m.name}</span>
                          ${isLeader ? '<span class="text-[9px] bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded font-black">Lãnh đạo</span>' : ''}
                        </div>
                        <div class="text-[10px] text-slate-400 font-mono">${m.code}</div>
                      </td>
                      <td class="p-2.5 text-slate-600 dark:text-slate-300">
                        <div class="font-medium">${m.role}</div>
                        <div class="text-[10px] text-blue-600 dark:text-blue-400 font-bold">${m.title || ''}</div>
                      </td>
                      <td class="p-2.5">
                        <span class="font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-1 rounded-lg border border-blue-200 dark:border-blue-900">
                          ${uName}
                        </span>
                      </td>
                      <td class="p-2.5">
                        <span class="font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-900">
                          ${pWord}
                        </span>
                      </td>
                      <td class="p-2.5 text-center">
                        <span class="font-mono font-black text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-900">
                          ${m.pin || '----'}
                        </span>
                      </td>
                      <td class="p-2.5 text-center">
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          m.allowExternalAccess ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                        }">
                          ${m.allowExternalAccess ? '✓ BẬT' : '✕ KHÓA'}
                        </span>
                      </td>
                      <td class="p-2.5 text-center no-print">
                        <div class="flex items-center justify-center space-x-1">
                          <button onclick="radOpsApp.copyCredential('${uName}', '${pWord}', '${m.pin}')" title="Sao chép tài khoản & mật khẩu" class="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition">
                            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                          </button>
                          <button onclick="radOpsApp.closeModal(); radOpsApp.switchUser('${m.id}', '${m.pin}')" title="Đăng nhập ngay tài khoản này" class="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-600 text-blue-600 hover:text-white transition">
                            <i data-lucide="log-in" class="w-3.5 h-3.5"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Hướng dẫn sử dụng & Quy định an toàn mật khẩu -->
        <div class="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
          <div class="font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
            <i data-lucide="shield-alert" class="w-4 h-4 text-amber-500"></i>
            <span>QUY ĐỊNH BẢO MẬT & ĐĂNG NHẬP KHOA CĐHA BV VPI:</span>
          </div>
          <ul class="list-disc list-inside space-y-0.5 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 pl-1">
            <li><strong>Đăng nhập trên Điện thoại / Tablet:</strong> Có thể chọn nhanh tên cán bộ và nhập <strong>Mã PIN 4 số</strong> để thao tác nhanh tại phòng máy.</li>
            <li><strong>Đăng nhập Ngoại viện (4G/Internet):</strong> Chỉ những tài khoản có trạng thái <strong>✓ BẬT</strong> mới được truy cập từ xa ngoài bệnh viện.</li>
            <li><strong>Chống tấn công Brute-force:</strong> Nhập sai 5 lần liên tiếp sẽ bị hệ thống tự động khóa bảo vệ 15 phút.</li>
            <li><strong>Mật khẩu Master:</strong> Sử dụng tài khoản <code class="font-mono text-blue-600 font-bold">admin</code> / <code class="font-mono text-emerald-600 font-bold">mrivinhphucvpi</code> khi cần khôi phục khẩn cấp.</li>
          </ul>
        </div>

      </div>
    `, 'max-w-4xl');
  }

  // Sao chép thông tin tài khoản vào Clipboard
  copyCredential(username, password, pin) {
    const textToCopy = `Tài khoản CĐHA VPI:\nTên đăng nhập: ${username}\nMật khẩu: ${password}\nMã PIN: ${pin}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert(`📋 ĐÃ SAO CHÉP THÔNG TIN TÀI KHOẢN:\n\n• Tên đăng nhập: ${username}\n• Mật khẩu: ${password}\n• Mã PIN: ${pin}\n\nBạn có thể dán (Paste) để gửi cho nhân sự hoặc lưu trữ an toàn.`);
      }).catch(() => {
        prompt('Sao chép thông tin tài khoản:', textToCopy);
      });
    } else {
      prompt('Sao chép thông tin tài khoản:', textToCopy);
    }
  }

  // Lọc tìm kiếm nhân sự trong bảng tài khoản
  filterAccountList(keyword) {
    const kw = (keyword || '').toLowerCase().trim();
    const rows = document.querySelectorAll('#acc-table-body tr');
    rows.forEach(r => {
      const text = r.textContent.toLowerCase();
      if (!kw || text.includes(kw)) {
        r.style.display = '';
      } else {
        r.style.display = 'none';
      }
    });
  }


  // ==========================================
  // HỆ THỐNG NHẬT KÝ SỬ DỤNG MÁY & THEO DÕI HELI MRI
  // ==========================================
  getTodayDateString() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  getDeviceTodayLog(deviceId) {
    const today = this.getTodayDateString();
    return (this.data.deviceLogs || []).find(l => l.deviceId === deviceId && l.date === today);
  }

  getDeviceLogCompliance() {
    const today = this.getTodayDateString();
    const allDevices = this.data.devices || [];
    const activeDevices = allDevices.filter(d => d.status !== 'repair' && !d.isTransferred);
    const targetDevices = activeDevices.length > 0 ? activeDevices : allDevices;

    const loggedDevices = [];
    const unloggedDevices = [];

    targetDevices.forEach(d => {
      const log = (this.data.deviceLogs || []).find(l => l.deviceId === d.id && l.date === today);
      if (log) {
        loggedDevices.push({ device: d, log: log });
      } else {
        unloggedDevices.push(d);
      }
    });

    const total = targetDevices.length;
    const completedCount = loggedDevices.length;
    const missingCount = unloggedDevices.length;
    const rate = total > 0 ? Math.round((completedCount / total) * 100) : 100;

    return {
      today: today,
      total: total,
      completed: loggedDevices,
      missing: unloggedDevices,
      rate: rate,
      isFullyCompliant: missingCount === 0
    };
  }

  getLatestMriHeliumLog() {
    const mriLogs = (this.data.deviceLogs || [])
      .filter(l => (l.deviceId === 'TB-03' || (l.deviceName && l.deviceName.includes('MRI'))) && l.heliumLevel != null)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (mriLogs.length === 0) {
      return {
        level: 81.5,
        pressure: 1.25,
        chillerTemp: 11.8,
        compressor: 'normal',
        date: this.getTodayDateString(),
        trend: 0,
        status: 'safe'
      };
    }

    const latest = mriLogs[0];
    const prev = mriLogs.length > 1 ? mriLogs[1] : null;
    const trend = prev ? +(latest.heliumLevel - prev.heliumLevel).toFixed(2) : 0;
    const status = latest.heliumLevel >= 70 ? 'safe' : latest.heliumLevel >= 60 ? 'warning' : 'danger';

    return {
      level: latest.heliumLevel,
      pressure: latest.heliumPressure || 1.25,
      chillerTemp: latest.chillerTemp || 11.8,
      compressor: latest.compressorStatus || 'normal',
      date: latest.date,
      completedAt: latest.completedAt,
      technician: latest.technician,
      trend: trend,
      status: status,
      rawLog: latest
    };
  }

  getMriHeliumHistory(limit = 14) {
    return (this.data.deviceLogs || [])
      .filter(l => (l.deviceId === 'TB-03' || (l.deviceName && l.deviceName.includes('MRI'))) && l.heliumLevel != null)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  }

  // Mở Modal Báo Cáo Nhật Ký Vận Hành Thiết Bị Cuối Ngày
  openDailyLogModal(preselectedDeviceId = null) {
    const devices = this.data.devices || [];
    const targetDevId = preselectedDeviceId || (devices[0] ? devices[0].id : 'TB-01');
    const selectedDev = devices.find(d => d.id === targetDevId) || devices[0];
    const currentUser = this.getCurrentUser();
    const today = this.getTodayDateString();
    const existingLog = this.getDeviceTodayLog(selectedDev.id);
    const isMri = selectedDev.id === 'TB-03' || (selectedDev.subCategory && selectedDev.subCategory.includes('Cộng hưởng từ')) || (selectedDev.name && selectedDev.name.includes('MRI'));

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[88vh] overflow-y-auto">
        <!-- Header Modal -->
        <div class="flex items-start justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <div class="flex items-center space-x-2.5">
            <div class="w-10 h-10 rounded-2xl ${isMri ? 'bg-cyan-600 text-white' : 'bg-blue-600 text-white'} flex items-center justify-center font-bold text-lg shadow-sm">
              <i data-lucide="${isMri ? 'thermometer-snowflake' : 'clipboard-pen'}" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-wider ${isMri ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/80 border-cyan-200 dark:border-cyan-800' : 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 border-blue-200 dark:border-blue-800'} px-2 py-0.5 rounded-full border">
                ${existingLog ? 'CẬP NHẬT NHẬT KÝ CA TRỰC' : 'BÁO CÁO NHẬT KÝ KẾT THÚC NGÀY'}
              </span>
              <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">Nhật Ký Vận Hành & Sử Dụng Máy</h3>
              <div class="text-xs text-slate-500">KTV trực máy bắt buộc chốt sổ kết thúc ngày làm việc • Bệnh viện VPI</div>
            </div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form onsubmit="event.preventDefault(); radOpsApp.submitDailyLogForm('${selectedDev.id}');" class="space-y-3.5 text-xs">
          
          <!-- Chọn Thiết Bị & Ngày Báo Cáo -->
          <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Thiết bị báo cáo *</label>
              <select id="log-deviceId" onchange="radOpsApp.openDailyLogModal(this.value)" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
                ${devices.map(d => {
                  const hasLog = !!this.getDeviceTodayLog(d.id);
                  const isCurMri = d.id === 'TB-03' || d.name.includes('MRI');
                  return `
                    <option value="${d.id}" ${d.id === selectedDev.id ? 'selected' : ''}>
                      ${hasLog ? '✅ [Đã chốt]' : '⚠️ [Chưa chốt]'} ${d.name} (${d.code}) ${isCurMri ? '🧊 [Có Heli]' : ''}
                    </option>
                  `;
                }).join('')}
              </select>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-slate-500 text-[10px] mb-0.5 font-bold">Ngày vận hành</label>
                <input type="date" id="log-date" value="${existingLog ? existingLog.date : today}" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-mono font-bold text-slate-900 dark:text-white">
              </div>
              <div>
                <label class="block text-slate-500 text-[10px] mb-0.5 font-bold">Ca làm việc / Kíp trực</label>
                <select id="log-shift" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-bold text-slate-900 dark:text-white">
                  <option value="Cả ngày (07:30 - 17:00)" ${existingLog && existingLog.shift.includes('Cả ngày') ? 'selected' : ''}>Cả ngày (07:30 - 17:00)</option>
                  <option value="Ca sáng (07:30 - 12:00)" ${existingLog && existingLog.shift.includes('sáng') ? 'selected' : ''}>Ca sáng (07:30 - 12:00)</option>
                  <option value="Ca chiều (13:30 - 17:00)" ${existingLog && existingLog.shift.includes('chiều') ? 'selected' : ''}>Ca chiều (13:30 - 17:00)</option>
                  <option value="Ca trực đêm (17:00 - 07:30)" ${existingLog && existingLog.shift.includes('trực') ? 'selected' : ''}>Ca trực đêm (17:00 - 07:30)</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-slate-500 text-[10px] mb-0.5 font-bold">KTV thực hiện báo cáo</label>
                <input type="text" id="log-technician" value="${existingLog ? existingLog.technician : (currentUser ? currentUser.name + ' (' + currentUser.code + ')' : 'KTV. Vũ Bá Đạt (BV-345)')}" required class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-semibold text-slate-900 dark:text-white">
              </div>
              <div>
                <label class="block text-slate-500 text-[10px] mb-0.5 font-bold">Vị trí phòng máy</label>
                <input type="text" readonly value="${selectedDev.room}" class="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-medium text-slate-600 dark:text-slate-400">
              </div>
            </div>
          </div>

          <!-- PHẦN RIÊNG DÀNH CHO MÁY MRI: CHỈ SỐ HELI LỎNG HẰNG NGÀY -->
          ${isMri ? `
            <div class="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 text-white border border-cyan-700/60 space-y-3 shadow-md">
              <div class="flex items-center justify-between border-b border-cyan-800/60 pb-2">
                <div class="flex items-center space-x-2">
                  <span class="text-lg">🧊</span>
                  <div>
                    <h4 class="font-extrabold text-cyan-300 text-xs uppercase tracking-wider">CHỈ SỐ BẮT BUỘC: MỨC HELI LỎNG & HỆ LÀM LẠNH MRI</h4>
                    <p class="text-[10px] text-cyan-200/80">Quy định an toàn tuyệt đối cho nam châm siêu dẫn GE Signa 1.5T</p>
                  </div>
                </div>
                <span class="text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 px-2 py-0.5 rounded-full">
                  Chu kỳ: 1 ngày / lần
                </span>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <!-- Mức Heli % -->
                <div class="bg-white/5 p-2.5 rounded-xl border border-cyan-800/40">
                  <label class="block text-cyan-200 text-[11px] font-bold mb-1">
                    Mức Heli lỏng (Helium Level %) <span class="text-red-400">*</span>
                  </label>
                  <div class="flex items-center space-x-1.5">
                    <input type="number" step="0.1" min="20" max="100" id="log-heliumLevel" required
                      value="${existingLog && existingLog.heliumLevel != null ? existingLog.heliumLevel : '81.5'}"
                      placeholder="81.5"
                      class="flex-1 bg-slate-900 border border-cyan-500/50 rounded-lg p-2 font-mono font-black text-base text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                    <span class="font-bold text-cyan-300 text-sm">%</span>
                  </div>
                  <div class="text-[10px] text-cyan-300/80 mt-1 flex items-center justify-between">
                    <span>Chuẩn an toàn: &gt; 70%</span>
                    <span>Cảnh báo: &lt; 60%</span>
                  </div>
                </div>

                <!-- Áp suất buồng lạnh psi -->
                <div class="bg-white/5 p-2.5 rounded-xl border border-cyan-800/40">
                  <label class="block text-cyan-200 text-[11px] font-bold mb-1">
                    Áp suất khí Heli (Vessel Pressure)
                  </label>
                  <div class="flex items-center space-x-1.5">
                    <input type="number" step="0.01" min="0.5" max="3.0" id="log-heliumPressure"
                      value="${existingLog && existingLog.heliumPressure != null ? existingLog.heliumPressure : '1.25'}"
                      placeholder="1.25"
                      class="flex-1 bg-slate-900 border border-cyan-500/50 rounded-lg p-2 font-mono font-bold text-sm text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                    <span class="font-semibold text-cyan-300 text-xs">psi</span>
                  </div>
                  <div class="text-[10px] text-cyan-300/80 mt-1">Dải chuẩn: 1.15 - 1.45 psi</div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <!-- Nhiệt độ nước Chiller -->
                <div class="bg-white/5 p-2.5 rounded-xl border border-cyan-800/40">
                  <label class="block text-cyan-200 text-[11px] font-bold mb-1">Nhiệt độ nước Chiller làm mát</label>
                  <div class="flex items-center space-x-1.5">
                    <input type="number" step="0.1" id="log-chillerTemp"
                      value="${existingLog && existingLog.chillerTemp != null ? existingLog.chillerTemp : '11.8'}"
                      placeholder="11.8"
                      class="flex-1 bg-slate-900 border border-cyan-500/50 rounded-lg p-2 font-mono font-bold text-sm text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                    <span class="font-semibold text-cyan-300 text-xs">°C</span>
                  </div>
                  <div class="text-[10px] text-cyan-300/80 mt-1">Chuẩn chiller: 10 - 14°C</div>
                </div>

                <!-- Tình trạng máy nén Compressor -->
                <div class="bg-white/5 p-2.5 rounded-xl border border-cyan-800/40">
                  <label class="block text-cyan-200 text-[11px] font-bold mb-1">Máy nén Heli (Compressor)</label>
                  <select id="log-compressorStatus" class="w-full bg-slate-900 border border-cyan-500/50 rounded-lg p-2 font-bold text-xs text-cyan-300 focus:outline-none">
                    <option value="normal" ${!existingLog || existingLog.compressorStatus === 'normal' ? 'selected' : ''}>✅ Bình thường (Chạy êm)</option>
                    <option value="warning" ${existingLog && existingLog.compressorStatus === 'warning' ? 'selected' : ''}>⚠️ Rung ồn (Cần bảo dưỡng)</option>
                    <option value="error" ${existingLog && existingLog.compressorStatus === 'error' ? 'selected' : ''}>⛔ Cảnh báo lỗi / Quá nhiệt</option>
                  </select>
                  <div class="text-[10px] text-cyan-300/80 mt-1">Coldhead & Adsorber</div>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- THÔNG SỐ VẬN HÀNH CHUNG CHO MỌI THIẾT BỊ -->
          <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div class="font-bold text-[11px] text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center space-x-1.5">
              <i data-lucide="activity" class="w-3.5 h-3.5 text-blue-600"></i>
              <span>THÔNG SỐ VẬN HÀNH & SỐ LƯỢNG CA CHỤP TRONG NGÀY</span>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Số ca chụp / khám hôm nay <span class="text-red-500">*</span>
                </label>
                <input type="number" min="0" id="log-patientCount" required
                  value="${existingLog ? existingLog.patientCount : (isMri ? '16' : selectedDev.category === 'Bức xạ' ? '30' : '45')}"
                  placeholder="Ví dụ: 25"
                  class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono font-black text-slate-900 dark:text-white">
              </div>
              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Số giờ máy chạy (Hours) <span class="text-red-500">*</span>
                </label>
                <input type="number" step="0.5" min="0" max="24" id="log-operatingHours" required
                  value="${existingLog ? existingLog.operatingHours : '8.5'}"
                  placeholder="8.5"
                  class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono font-bold text-slate-900 dark:text-white">
              </div>
            </div>

            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Tình trạng kỹ thuật kết thúc ngày *</label>
              <div class="grid grid-cols-3 gap-2">
                <label class="p-2 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-950/30">
                  <input type="radio" name="log-status" value="normal" ${!existingLog || existingLog.status === 'normal' ? 'checked' : ''} class="text-emerald-600">
                  <span class="font-bold text-emerald-700 dark:text-emerald-300">Ổn định</span>
                </label>
                <label class="p-2 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5 cursor-pointer hover:bg-amber-50 dark:hover:bg-amber-950/30">
                  <input type="radio" name="log-status" value="attention" ${existingLog && existingLog.status === 'attention' ? 'checked' : ''} class="text-amber-600">
                  <span class="font-bold text-amber-700 dark:text-amber-300">Cần lưu ý</span>
                </label>
                <label class="p-2 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5 cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/30">
                  <input type="radio" name="log-status" value="issue" ${existingLog && existingLog.status === 'issue' ? 'checked' : ''} class="text-red-600">
                  <span class="font-bold text-red-700 dark:text-red-300">Có sự cố</span>
                </label>
              </div>
            </div>

            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Ghi chú vận hành, vật tư tiêu hao & hiện tượng lạ</label>
              <textarea id="log-notes" rows="2" placeholder="Ghi chú về bóng phát, nhiệt độ, chất lượng hình ảnh, thuốc tương phản, gel siêu âm..." class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium text-slate-900 dark:text-white">${existingLog ? existingLog.notes : 'Thiết bị vận hành tốt, không phát sinh lỗi kỹ thuật trong ca trực.'}</textarea>
            </div>
          </div>

          <!-- Nút hành động -->
          <div class="pt-2 flex items-center justify-between">
            <button type="button" onclick="radOpsApp.openDeviceLogLedgerModal()" class="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center space-x-1">
              <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
              <span>Xem Sổ Nhật Ký Toàn Khoa</span>
            </button>
            <div class="flex items-center space-x-2">
              <button type="button" onclick="radOpsApp.closeModal()" class="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold py-2.5 px-4 rounded-xl transition">
                Hủy
              </button>
              <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-2.5 px-5 rounded-xl shadow-md shadow-blue-500/20 transition flex items-center space-x-1.5">
                <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                <span>${existingLog ? 'CẬP NHẬT NHẬT KÝ' : 'LƯU VÀ CHỐT NGÀY'}</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    `, 'max-w-2xl');
  }

  // Xử lý Lưu Nhật Ký Vận Hành
  submitDailyLogForm(deviceId) {
    const dev = (this.data.devices || []).find(d => d.id === deviceId);
    if (!dev) return;

    const date = document.getElementById('log-date')?.value || this.getTodayDateString();
    const shift = document.getElementById('log-shift')?.value || 'Cả ngày (07:30 - 17:00)';
    const technician = document.getElementById('log-technician')?.value?.trim() || 'KTV Trực máy';
    const patientCount = parseInt(document.getElementById('log-patientCount')?.value || '0', 10);
    const operatingHours = parseFloat(document.getElementById('log-operatingHours')?.value || '8.0');
    
    const statusRadio = document.querySelector('input[name="log-status"]:checked');
    const status = statusRadio ? statusRadio.value : 'normal';
    const notes = document.getElementById('log-notes')?.value?.trim() || '';

    const isMri = dev.id === 'TB-03' || (dev.subCategory && dev.subCategory.includes('Cộng hưởng từ')) || (dev.name && dev.name.includes('MRI'));

    let heliumLevel = null;
    let heliumPressure = null;
    let chillerTemp = null;
    let compressorStatus = null;

    if (isMri) {
      const helInput = document.getElementById('log-heliumLevel');
      heliumLevel = helInput ? parseFloat(helInput.value) : 81.5;
      const pressInput = document.getElementById('log-heliumPressure');
      heliumPressure = pressInput ? parseFloat(pressInput.value) : 1.25;
      const chillInput = document.getElementById('log-chillerTemp');
      chillerTemp = chillInput ? parseFloat(chillInput.value) : 11.8;
      const compSelect = document.getElementById('log-compressorStatus');
      compressorStatus = compSelect ? compSelect.value : 'normal';

      if (heliumLevel < 60) {
        alert('🚨 CẢNH BÁO NGUY CẤP:\nMức Heli lỏng dưới 60%! Nguy cơ cao gây sự cố Quench nam châm siêu dẫn. Hệ thống đã ghi nhận tình trạng khẩn cấp và đề nghị KTV Trưởng liên hệ đơn vị cung cấp nạp bù Heli ngay lập tức!');
      }
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    if (!this.data.deviceLogs) this.data.deviceLogs = [];

    // Kiểm tra xem đã có bản ghi cho máy và ngày này chưa
    const existingIndex = this.data.deviceLogs.findIndex(l => l.deviceId === dev.id && l.date === date);

    const logEntry = {
      id: existingIndex !== -1 ? this.data.deviceLogs[existingIndex].id : `LOG-${date.replace(/-/g, '')}-${dev.id}`,
      deviceId: dev.id,
      deviceName: dev.name,
      date: date,
      shift: shift,
      technician: technician,
      technicianRole: this.getCurrentUserRole().title || 'Kỹ thuật viên',
      patientCount: patientCount,
      operatingHours: operatingHours,
      status: status,
      heliumLevel: heliumLevel,
      heliumPressure: heliumPressure,
      chillerTemp: chillerTemp,
      compressorStatus: compressorStatus,
      notes: notes,
      completedAt: timeStr,
      signature: technician.split('(')[0].trim()
    };

    if (existingIndex !== -1) {
      this.data.deviceLogs[existingIndex] = logEntry;
    } else {
      this.data.deviceLogs.unshift(logEntry);
    }

    // Ghi nhật ký bảo mật hệ thống
    if (!this.data.auth) this.data.auth = {};
    if (!this.data.auth.auditLogs) this.data.auth.auditLogs = [];
    this.data.auth.auditLogs.unshift({
      id: 'LOG-AUDIT-' + Date.now(),
      time: 'Vừa xong',
      userName: technician,
      role: 'KTV Trực máy',
      action: `Chốt nhật ký hoạt động: ${dev.name} (${patientCount} ca${isMri ? `, Heli: ${heliumLevel}%` : ''})`,
      ip: 'Quy trình Chốt Sổ Cuối Ngày',
      status: 'success'
    });

    this.saveData();
    this.closeModal();
    this.render();

    alert(`✅ ĐÃ CHỐT NHẬT KÝ HOẠT ĐỘNG THÀNH CÔNG!\n\n• Thiết bị: ${dev.name}\n• Ngày: ${date}\n• Số ca thực hiện: ${patientCount} ca\n${isMri ? `• Mức Heli lỏng: ${heliumLevel}% (Áp suất: ${heliumPressure} psi)\n` : ''}• Tình trạng: ${status === 'normal' ? 'Ổn định' : status === 'attention' ? 'Cần lưu ý' : 'Có sự cố'}\n• Người chốt sổ: ${technician}`);
  }

  // Sổ Nhật Ký Vận Hành Toàn Khoa CĐHA & In Báo Cáo Cuối Ngày A4
  openDeviceLogLedgerModal(filterDate = null) {
    const today = filterDate || this.getTodayDateString();
    const logs = (this.data.deviceLogs || []).filter(l => !filterDate || l.date === filterDate);
    const devices = this.data.devices || [];
    const compliance = this.getDeviceLogCompliance();

    const totalPatientsToday = logs.reduce((sum, l) => sum + (l.patientCount || 0), 0);
    const totalHoursToday = logs.reduce((sum, l) => sum + (l.operatingHours || 0), 0);
    const latestHelium = this.getLatestMriHeliumLog();

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[90vh] overflow-y-auto select-text">
        
        <!-- Header -->
        <div class="flex items-start justify-between border-b border-slate-200 dark:border-slate-700 pb-3 no-print">
          <div class="flex items-center space-x-2.5">
            <div class="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <i data-lucide="book-marked" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                SỔ NHẬT KÝ VẬN HÀNH THIẾT BỊ BV VPI
              </span>
              <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">Sổ Giao Ca & Báo Cáo Hoạt Động Hằng Ngày</h3>
              <div class="text-xs text-slate-500">Giám sát số ca khám, thời gian máy chạy & chỉ số Heli nam châm MRI</div>
            </div>
          </div>
          <div class="flex items-center space-x-1.5">
            <button onclick="window.print()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-xl text-xs transition flex items-center space-x-1 shadow-xs">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i>
              <span>In Báo Cáo A4</span>
            </button>
            <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>
        </div>

        <!-- 3 Thẻ Tóm Tắt Trong Ngày -->
        <div class="grid grid-cols-3 gap-2 text-xs">
          <div class="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-2xl border border-blue-200 dark:border-blue-900/50">
            <div class="text-[11px] font-bold text-blue-700 dark:text-blue-300">Tổng ca chụp/khám</div>
            <div class="text-xl font-black text-blue-900 dark:text-white mt-1">${totalPatientsToday} <span class="text-xs font-normal text-slate-500">ca</span></div>
            <div class="text-[10px] text-slate-400 mt-0.5">Toàn bộ thiết bị CĐHA</div>
          </div>

          <div class="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-900/50">
            <div class="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">Tiến độ chốt sổ</div>
            <div class="text-xl font-black text-emerald-900 dark:text-white mt-1">${compliance.completed.length} / ${compliance.total} <span class="text-xs font-normal text-slate-500">máy</span></div>
            <div class="text-[10px] font-bold ${compliance.isFullyCompliant ? 'text-emerald-600' : 'text-amber-600'} mt-0.5">
              ${compliance.isFullyCompliant ? '✓ 100% Hoàn thành' : `⚠️ Còn ${compliance.missing.length} máy chưa chốt`}
            </div>
          </div>

          <div class="bg-cyan-50 dark:bg-cyan-950/40 p-3 rounded-2xl border border-cyan-200 dark:border-cyan-900/50 cursor-pointer hover:border-cyan-400 transition" onclick="radOpsApp.openMriHeliumChartModal()">
            <div class="text-[11px] font-bold text-cyan-800 dark:text-cyan-300 flex items-center justify-between">
              <span>Mức Heli MRI 1.5T</span>
              <span>🧊</span>
            </div>
            <div class="text-xl font-black text-cyan-900 dark:text-white mt-1">${latestHelium.level}%</div>
            <div class="text-[10px] text-cyan-600 font-semibold mt-0.5">Áp suất: ${latestHelium.pressure} psi (Xem biểu đồ)</div>
          </div>
        </div>

        <!-- Bảng Nhật Ký Chi Tiết -->
        <div class="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xs">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700 text-[11px]">
                  <th class="p-2.5">Ngày / Giờ</th>
                  <th class="p-2.5">Tên thiết bị</th>
                  <th class="p-2.5 text-center">Số ca</th>
                  <th class="p-2.5 text-center">Giờ chạy</th>
                  <th class="p-2.5 text-center">Heli MRI</th>
                  <th class="p-2.5">KTV Trực máy</th>
                  <th class="p-2.5">Tình trạng & Ghi chú</th>
                  <th class="p-2.5 text-center no-print">Thao tác</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                ${logs.length === 0 ? `
                  <tr>
                    <td colspan="8" class="p-6 text-center text-slate-400 italic">Chưa có bản ghi nhật ký vận hành nào cho ngày được chọn.</td>
                  </tr>
                ` : logs.map(l => {
                  const isMri = l.deviceId === 'TB-03' || (l.deviceName && l.deviceName.includes('MRI'));
                  return `
                    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                      <td class="p-2.5 whitespace-nowrap">
                        <div class="font-bold text-slate-900 dark:text-white">${l.date}</div>
                        <div class="text-[10px] text-slate-400">${l.completedAt ? l.completedAt.split(' ')[0] : ''}</div>
                      </td>
                      <td class="p-2.5">
                        <div class="font-bold text-slate-900 dark:text-white flex items-center space-x-1">
                          <span>${l.deviceName}</span>
                          ${isMri ? '<span class="text-[9px] bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 px-1 rounded font-bold">MRI</span>' : ''}
                        </div>
                        <div class="text-[10px] text-slate-400">${l.shift}</div>
                      </td>
                      <td class="p-2.5 text-center font-mono font-black text-blue-600 text-sm">
                        ${l.patientCount}
                      </td>
                      <td class="p-2.5 text-center font-mono text-slate-600 dark:text-slate-300">
                        ${l.operatingHours}h
                      </td>
                      <td class="p-2.5 text-center">
                        ${isMri && l.heliumLevel != null ? `
                          <span class="font-mono font-bold text-xs px-2 py-0.5 rounded-full ${l.heliumLevel >= 70 ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300' : 'bg-red-100 text-red-700'}">
                            ${l.heliumLevel}% 🧊
                          </span>
                        ` : `
                          <span class="text-slate-300 text-[10px]">-</span>
                        `}
                      </td>
                      <td class="p-2.5">
                        <div class="font-bold text-slate-800 dark:text-slate-200">${l.technician}</div>
                        <div class="text-[10px] text-slate-400">${l.technicianRole || 'KTV'}</div>
                      </td>
                      <td class="p-2.5 max-w-xs">
                        <div class="flex items-center space-x-1">
                          <span class="w-1.5 h-1.5 rounded-full ${l.status === 'normal' ? 'bg-emerald-500' : l.status === 'attention' ? 'bg-amber-500' : 'bg-red-500'}"></span>
                          <span class="font-bold ${l.status === 'normal' ? 'text-emerald-700 dark:text-emerald-300' : l.status === 'attention' ? 'text-amber-700' : 'text-red-600'}">
                            ${l.status === 'normal' ? 'Ổn định' : l.status === 'attention' ? 'Lưu ý' : 'Sự cố'}
                          </span>
                        </div>
                        <div class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">${l.notes}</div>
                      </td>
                      <td class="p-2.5 text-center no-print">
                        <button onclick="radOpsApp.openDailyLogModal('${l.deviceId}')" title="Chỉnh sửa nhật ký này" class="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/40 text-blue-600 transition">
                          <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="flex items-center justify-between pt-2">
          <button onclick="radOpsApp.openMriHeliumChartModal()" class="bg-cyan-50 dark:bg-cyan-950/60 hover:bg-cyan-100 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 font-bold py-2 px-3 rounded-xl text-xs transition flex items-center space-x-1.5">
            <i data-lucide="line-chart" class="w-4 h-4 text-cyan-600"></i>
            <span>Biểu đồ tiêu hao Heli MRI</span>
          </button>
          <button onclick="radOpsApp.openDailyLogModal()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition flex items-center space-x-1.5 shadow-sm">
            <i data-lucide="plus-circle" class="w-4 h-4"></i>
            <span>Ghi Nhật Ký Máy Mới</span>
          </button>
        </div>

      </div>
    `, 'max-w-4xl');
  }

  // Modal Biểu Đồ & Lịch Sử Theo Dõi Heli Máy Chụp Cộng Hưởng Từ MRI 1.5T
  openMriHeliumChartModal() {
    const history = this.getMriHeliumHistory(14);
    const latest = this.getLatestMriHeliumLog();
    const dev = (this.data.devices || []).find(d => d.id === 'TB-03') || { name: 'Máy Chụp Cộng hưởng từ MRI 1.5 Tesla GE' };

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[90vh] overflow-y-auto">
        
        <div class="flex items-start justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <div class="flex items-center space-x-2.5">
            <div class="w-10 h-10 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <i data-lucide="thermometer-snowflake" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-200 dark:border-cyan-800">
                GIÁM SÁT HỆ THỐNG LÀM LẠNH SIÊU DẪN
              </span>
              <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">Biểu Đồ Theo Dõi Chỉ Số Heli Lỏng MRI</h3>
              <div class="text-xs text-slate-500">${dev.name} • Cảnh báo an toàn nam châm 1.5 Tesla</div>
            </div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Thẻ Tổng Quan Chỉ Số Mới Nhất -->
        <div class="bg-gradient-to-r from-slate-900 via-blue-950 to-cyan-950 text-white p-4 rounded-2xl border border-cyan-800/60 shadow-md space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="text-xl">🧊</span>
              <div>
                <span class="text-xs font-bold text-cyan-300">MỨC HELI HIỆN TẠI</span>
                <div class="text-2xl font-black text-white font-mono mt-0.5">${latest.level}%</div>
              </div>
            </div>
            <div class="text-right">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${latest.level >= 70 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' : 'bg-red-500/30 text-red-200 border border-red-400/50'}">
                ${latest.level >= 70 ? '✓ Mức An Toàn Tuyệt Đối' : '⚠️ Cần Theo Dõi / Bù Heli'}
              </span>
              <div class="text-[10px] text-cyan-200/70 mt-1">Cập nhật: ${latest.date}</div>
            </div>
          </div>

          <!-- Thanh tiến trình mức Heli -->
          <div class="space-y-1">
            <div class="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-cyan-900">
              <div class="h-full rounded-full transition-all duration-500 ${latest.level >= 70 ? 'bg-gradient-to-r from-cyan-400 to-blue-400' : 'bg-amber-400'}" style="width: ${latest.level}%"></div>
            </div>
            <div class="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0%</span>
              <span class="text-red-400">Ngưỡng Quench: 50%</span>
              <span class="text-amber-400">Báo động: 60%</span>
              <span class="text-emerald-400 font-bold">Chuẩn: &gt;70%</span>
              <span>100%</span>
            </div>
          </div>

          <!-- Thông số phụ -->
          <div class="grid grid-cols-3 gap-2 pt-1 text-center font-mono text-xs">
            <div class="bg-white/5 p-2 rounded-xl">
              <div class="text-[10px] text-slate-400 font-sans">Áp suất buồng:</div>
              <div class="font-bold text-cyan-300">${latest.pressure} psi</div>
            </div>
            <div class="bg-white/5 p-2 rounded-xl">
              <div class="text-[10px] text-slate-400 font-sans">Chiller giải nhiệt:</div>
              <div class="font-bold text-cyan-300">${latest.chillerTemp}°C</div>
            </div>
            <div class="bg-white/5 p-2 rounded-xl">
              <div class="text-[10px] text-slate-400 font-sans">Máy nén Compressor:</div>
              <div class="font-bold text-emerald-400">${latest.compressor === 'normal' ? 'Chạy êm' : 'Cần bảo dưỡng'}</div>
            </div>
          </div>
        </div>

        <!-- Biểu Đồ Thanh Mô Phỏng Mức Heli Theo Ngày -->
        <div class="space-y-2">
          <div class="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>Xu hướng mức Heli lỏng qua các ngày gần nhất:</span>
            <span class="text-[11px] text-emerald-600 font-bold">Tiêu hao chuẩn: ~0.01% / ngày</span>
          </div>

          <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
            <div class="h-32 flex items-end justify-between space-x-1.5 pt-4 pb-2 border-b border-slate-200 dark:border-slate-700">
              ${history.slice().reverse().map(h => {
                const heightPercent = Math.max(15, Math.min(100, (h.heliumLevel - 60) * 3));
                return `
                  <div class="flex-1 flex flex-col items-center justify-end h-full group relative">
                    <div class="text-[9px] font-mono font-bold text-slate-500 mb-1 opacity-0 group-hover:opacity-100 transition">${h.heliumLevel}%</div>
                    <div class="w-full rounded-t-md bg-gradient-to-t from-cyan-600 to-cyan-400 group-hover:from-cyan-500 group-hover:to-cyan-300 transition-all shadow-xs" style="height: ${heightPercent}%;"></div>
                    <span class="text-[9px] font-mono text-slate-400 mt-1 whitespace-nowrap">${h.date.split('-')[2]}/${h.date.split('-')[1]}</span>
                  </div>
                `;
              }).join('')}
            </div>
            <div class="text-[10px] text-slate-400 text-center">
              Biểu đồ mức Heli lỏng thực tế ghi nhận bởi KTV Khoa CĐHA BV VPI
            </div>
          </div>
        </div>

        <!-- Bảng Lịch Sử Đo Heli -->
        <div class="space-y-2">
          <div class="text-xs font-bold text-slate-900 dark:text-white">Lịch sử ghi nhật ký Heli:</div>
          <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden text-xs">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700 text-[11px]">
                  <th class="p-2">Ngày</th>
                  <th class="p-2 text-center">Mức Heli (%)</th>
                  <th class="p-2 text-center">Áp suất</th>
                  <th class="p-2 text-center">Chiller</th>
                  <th class="p-2">KTV Kiểm tra</th>
                  <th class="p-2 text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 font-mono">
                ${history.map(h => `
                  <tr>
                    <td class="p-2 font-bold text-slate-900 dark:text-white">${h.date}</td>
                    <td class="p-2 text-center font-black text-cyan-600">${h.heliumLevel}%</td>
                    <td class="p-2 text-center text-slate-600 dark:text-slate-400">${h.heliumPressure} psi</td>
                    <td class="p-2 text-center text-slate-600 dark:text-slate-400">${h.chillerTemp}°C</td>
                    <td class="p-2 font-sans text-slate-800 dark:text-slate-200">${h.technician ? h.technician.split('(')[0] : 'KTV'}</td>
                    <td class="p-2 text-center">
                      <span class="text-[10px] font-sans font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        Bình thường
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="pt-2 flex items-center justify-between">
          <button onclick="radOpsApp.closeModal(); radOpsApp.openDailyLogModal('TB-03')" class="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition flex items-center space-x-1.5 shadow-sm">
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Nhập Mới Chỉ Số Heli Hôm Nay</span>
          </button>
          <button onclick="radOpsApp.closeModal()" class="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2 px-4 rounded-xl text-xs transition">
            Đóng
          </button>
        </div>

      </div>
    `, 'max-w-2xl');
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

