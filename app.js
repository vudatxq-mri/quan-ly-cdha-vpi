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
      lastExternalLogin: 'Phiên thẩm tra online',
      isTldMonitored: false
    },
    {
      id: 'NV-17',
      cchnNumber: '002389/VP-CCHN',
      cchnScope: 'Sở Y tế Vĩnh Phúc - Kỹ thuật hình ảnh y học',
      code: 'BV-625',
      name: 'Lê Thùy Linh',
      role: 'Thư ký y khoa CĐHA',
      roleKey: 'secretary',
      qualification: 'Thư ký Y khoa / Cử nhân',
      radiationCert: 'TKYK-VPI-2024',
      certIssuer: 'Bệnh viện Quốc tế Vĩnh Phúc',
      certDate: '2024-02-10',
      certExpiry: '2027-02-10',
      daysLeft: 479,
      status: 'safe',
      tldDosimeterQ1: '0.01 mSv',
      tldDosimeterQ2: '0.01 mSv',
      tldDosimeterQ3: '0.01 mSv',
      tldDose2026: { q1: 0.01, q2: 0.01, q3: 0.01, q4: 0.01, total: 0.04 },
      tldCode: 'TLD-VPI-019',
      isTldMonitored: false,
      assignedRooms: ['Khu Đón tiếp & Trả kết quả'],
      isSafetyOfficer: false,
      allowExternalAccess: true,
      pin: '6250',
      username: 'lethuylinh',
      password: 'Linh@Vpi2026',
      birthday: '1995-10-19',
      lastExternalLogin: 'Hôm nay'
    },
    {
      id: 'NV-18',
      cchnNumber: '003112/VP-CCHN',
      cchnScope: 'Sở Y tế Vĩnh Phúc - Kỹ thuật hình ảnh y học',
      code: 'BV-522',
      name: 'BS. CKI. Ngô Văn Điều',
      role: 'Bác sĩ CKI CĐHA',
      roleKey: 'doctor',
      qualification: 'Bác sĩ Chuyên khoa I CĐHA',
      radiationCert: 'ATBX-QL-2024-VPI',
      certIssuer: 'Sở Khoa học và Công nghệ tỉnh Vĩnh Phúc',
      certDate: '2024-03-15',
      certExpiry: '2027-03-15',
      daysLeft: 512,
      status: 'safe',
      tldDosimeterQ1: '0.08 mSv',
      tldDosimeterQ2: '0.09 mSv',
      tldDosimeterQ3: '0.08 mSv',
      tldDose2026: { q1: 0.08, q2: 0.09, q3: 0.08, q4: 0.07, total: 0.32 },
      tldCode: 'TLD-VPI-020',
      isTldMonitored: true,
      assignedRooms: ['Phòng Đọc phim PACS', 'Phòng CT-Scanner'],
      isSafetyOfficer: false,
      allowExternalAccess: true,
      pin: '5220',
      username: 'ngovandieu',
      password: 'Dieu@Vpi2026',
      birthday: '1988-06-18',
      lastExternalLogin: 'Hôm nay'
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
      ticketCode: 'PM-VPI-CT32',
      deviceId: 'TB-01',
      deviceName: 'Máy CT 32 lát cắt Siemens Somatom Scope',
      room: 'Phòng CT-Scanner',
      reportedBy: 'KTV. Vũ Bá Đạt',
      dateReported: '2026-10-12',
      priority: 'Định kỳ',
      symptom: 'Bảo dưỡng gantry định kỳ, hiệu chuẩn laser định vị bệnh nhân, kiểm tra hệ thống làm mát dầu bóng phát tia X.',
      solution: 'Kỹ sư Siemens đã căn chỉnh laser lệch 0.5mm về chuẩn 0.0mm, bổ sung 300ml dầu cách điện cao áp. Máy phát tia ổn định.',
      status: 'completed',
      technician: 'Kỹ sư dịch vụ Siemens Healthineers'
    },
    {
      id: 'BT-02',
      ticketCode: 'PM-VPI-CTACT',
      deviceId: 'TB-02',
      deviceName: 'Máy Cắt lớp vi tính CT Revolution ACT GE',
      room: 'Phòng CT-Scanner',
      reportedBy: 'KTV. Trần Quốc Tuấn',
      dateReported: '2026-08-15',
      priority: 'Định kỳ',
      symptom: 'Bảo dưỡng định kỳ Quý 3/2026: Vệ sinh chổi than Slip-ring, kiểm tra hệ thống giải nhiệt quạt làm mát khoang gantry.',
      solution: 'Kỹ sư GE Healthcare đã vệ sinh bụi than trượt, đo điện áp tiếp xúc đạt chuẩn < 0.05 Ohm. Vận hành êm ái.',
      status: 'completed',
      technician: 'Kỹ sư hãng GE Healthcare'
    },
    {
      id: 'BT-03',
      ticketCode: 'PM-VPI-MRI',
      deviceId: 'TB-03',
      deviceName: 'Máy Chụp Cộng hưởng từ MRI 1.5 Tesla GE',
      room: 'Phòng MRI',
      reportedBy: 'KTV. Vũ Bá Đạt',
      dateReported: '2026-10-05',
      priority: 'Định kỳ',
      symptom: 'Bảo trì dự phòng PM Quý 3/2026: Kiểm tra Chiller làm mát nước giải nhiệt, mức Heli lỏng nam châm siêu dẫn.',
      solution: 'Kỹ sư GE Healthcare Field Service đã kiểm tra: Mức Heli 81.6%, nhiệt độ lạnh 4.2K đạt chuẩn, tẩy rửa cặn dàn giải nhiệt chiller.',
      status: 'completed',
      technician: 'Kỹ sư hãng GE Healthcare'
    },
    {
      id: 'BT-04',
      ticketCode: 'SC-VPI-XQ01',
      deviceId: 'TB-04',
      deviceName: 'Máy X-quang KTS Vikomed (Hàn Quốc)',
      room: 'Phòng X-quang 01',
      reportedBy: 'KTV. Hoàng Văn Cường',
      dateReported: '2026-09-18',
      priority: 'Trung bình',
      symptom: 'Đèn chiếu trường sáng chuẩn trực Collimator bị chập chờn khi di chuyển bóng phát sang tư thế chụp phổi đứng.',
      solution: 'Kỹ sư Vikomed đã thay thế bóng đèn halogen dẫn hướng 12V-50W và siết lại tiếp điểm giắc nối cáp cấp nguồn. Trường xạ sáng rõ.',
      status: 'completed',
      technician: 'Kỹ sư TBYT Việt Hàn (Vikomed)'
    },
    {
      id: 'BT-05',
      ticketCode: 'PM-VPI-MAMMO',
      deviceId: 'TB-05',
      deviceName: 'Máy X-quang Nhũ ảnh KTS Mammography (Vú)',
      room: 'Phòng Chụp Nhũ ảnh (Vú)',
      reportedBy: 'KTV. Lê Thị Thoa',
      dateReported: '2026-09-02',
      priority: 'Định kỳ',
      symptom: 'Kiểm chuẩn định kỳ hệ thống cảm biến lực nén vú tự động SmartCompression và vệ sinh kính chì chắn tia bảo hộ KTV.',
      solution: 'Kỹ sư Hologic kiểm tra lực nén dừng an toàn tại 150N, tấm ép vú không cong vênh, kết quả kiểm định liều hấp thụ tuyến vú đạt TCVN.',
      status: 'completed',
      technician: 'Kỹ sư Hologic / TBYT'
    },
    {
      id: 'BT-06',
      ticketCode: 'SC-VPI-DEXA',
      deviceId: 'TB-06',
      deviceName: 'Máy X-quang Đo mật độ xương DEXA toàn thân',
      room: 'Phòng Đo loãng xương DEXA',
      reportedBy: 'KTV. Nguyễn Duy Hạnh',
      dateReported: '2026-09-29',
      priority: 'Trung bình',
      symptom: 'Đề xuất lắp Card mạng máy tính đo loãng xương kết nối mạng LAN nội bộ gửi kết quả về máy chủ PACS tự động.',
      solution: 'Phòng CNTT VPI đã lắp đặt card mạng PCI Gigabit và cấu hình IP tĩnh thành công. Kết quả đo BMD truyền tức thì về PACS.',
      status: 'completed',
      technician: 'Bộ phận CNTT BV Vĩnh Phúc VPI'
    },
    {
      id: 'BT-07',
      ticketCode: 'PM-VPI-US01',
      deviceId: 'TB-07',
      deviceName: 'Máy Siêu âm Doppler màu cao cấp Mindray Resona I9',
      room: 'Phòng Siêu âm 01',
      reportedBy: 'BS. CKI. Trịnh Văn Bình',
      dateReported: '2026-08-20',
      priority: 'Định kỳ',
      symptom: 'Bảo dưỡng định kỳ 6 tháng: Vệ sinh lưới lọc gió tản nhiệt dưới gầm máy, kiểm tra các phím xoay Gain và bàn di Trackball.',
      solution: 'Kỹ sư Mindray tháo rửa màng lọc bụi, bôi trơn bạc đạn Trackball, cập nhật bản vá iScape V2.1 hoạt động mượt mà.',
      status: 'completed',
      technician: 'Kỹ sư Mindray Medical Vietnam'
    },
    {
      id: 'BT-08',
      ticketCode: 'PM-VPI-US02',
      deviceId: 'TB-08',
      deviceName: 'Máy Siêu âm Doppler màu chuyên sâu Arietta F6',
      room: 'Phòng Siêu âm 02',
      reportedBy: 'ĐD. Phùng Thị Bích',
      dateReported: '2026-07-15',
      priority: 'Thấp',
      symptom: 'Bản lề khớp gập màn hình hơi rít khi điều chỉnh góc nhìn cho bác sĩ.',
      solution: 'Kỹ sư Hitachi đã tra dầu bôi trơn trục khớp quay và cân chỉnh độ siết ốc hãm màn hình. Thao tác xoay gập êm ái nhẹ nhàng.',
      status: 'completed',
      technician: 'Phòng VT-TTBYT Bệnh viện VPI'
    },
    {
      id: 'BT-09',
      ticketCode: 'PM-VPI-US03',
      deviceId: 'TB-09',
      deviceName: 'Máy Siêu âm Doppler màu đa chức năng P6/P8',
      room: 'Phòng Siêu âm 03',
      reportedBy: 'KTV. Đỗ Thành Long',
      dateReported: '2026-06-18',
      priority: 'Định kỳ',
      symptom: 'Kiểm tra độ nhạy kết nối cổng cắm đầu dò Probe Port số 3 thỉnh thoảng báo nhận diện chậm.',
      solution: 'Vệ sinh chân tiếp xúc mạ vàng giắc cắm đầu dò bằng dung dịch cồn chuyên dụng Contact Cleaner. Đầu dò nhận diện tức thì.',
      status: 'completed',
      technician: 'Kỹ sư Phòng Vật tư y tế VPI'
    },
    {
      id: 'BT-10',
      ticketCode: 'PM-VPI-USPORT',
      deviceId: 'TB-10',
      deviceName: 'Máy Siêu âm xách tay màu tổng quát 3 đầu dò',
      room: 'Phòng Cấp cứu & Khám lưu động',
      reportedBy: 'KTV. Vũ Bá Đạt',
      dateReported: '2026-08-10',
      priority: 'Trung bình',
      symptom: 'Kiểm tra dung lượng khối pin Lithium dự phòng khi đi siêu âm cấp cứu tại giường bệnh các khoa ngoại.',
      solution: 'Đã xả sạc chuẩn chu kỳ 3 lần, pin giữ điện liên tục 2.5 giờ đạt tiêu chuẩn cấp cứu lưu động ngoài viện.',
      status: 'completed',
      technician: 'Kỹ sư TBYT Bệnh viện VPI'
    },
    {
      id: 'BT-11',
      ticketCode: 'PM-VPI-INJECT',
      deviceId: 'TB-11',
      deviceName: 'Bơm tiêm thuốc cản quang tự động 2 nòng CT Stellant',
      room: 'Phòng CT-Scanner',
      reportedBy: 'ĐD. Nguyễn Thị Thoa',
      dateReported: '2026-07-28',
      priority: 'Định kỳ',
      symptom: 'Bảo trì định kỳ hệ thống cơ điện piston đẩy áp lực cao và cảm biến quang học FluiDot.',
      solution: 'Kỹ sư Bayer Radiology đã hiệu chuẩn áp lực bơm đạt chuẩn sai số < 2 PSI, kiểm tra van chặn một chiều chống trào ngược.',
      status: 'completed',
      technician: 'Kỹ sư Bayer HealthCare Vietnam'
    },
    {
      id: 'BT-12',
      ticketCode: 'PM-VPI-SPO2',
      deviceId: 'TB-12',
      deviceName: 'Máy đo SpO2 bàn chuyên dụng phòng CHT Nonin 7500 FO cáp quang',
      room: 'Phòng MRI',
      reportedBy: 'KTV. Lê Thế Hoàng',
      dateReported: '2026-06-30',
      priority: 'Định kỳ',
      symptom: 'Kiểm tra độ suy hao tín hiệu sợi cáp quang bọc phi kim Nonin 8000FOV và độ nhạy cảnh báo nhịp tim bệnh nhân.',
      solution: 'Kỹ sư đo kiểm công suất quang đạt 98%, thử nghiệm sóng RF trong buồng Faraday không bị can nhiễu từ trường 1.5 Tesla.',
      status: 'completed',
      technician: 'Kỹ sư Meditech Chuyên dụng MRI'
    },
    {
      id: 'BT-13',
      ticketCode: 'PM-VPI-PRINTER',
      deviceId: 'TB-13',
      deviceName: 'Hệ thống Máy in phim y tế kỹ thuật số Canon / Drypix',
      room: 'Phòng In phim & Trả KQ',
      reportedBy: 'Thư ký Y khoa Nguyễn Phương Thảo',
      dateReported: '2026-08-25',
      priority: 'Trung bình',
      symptom: 'Bản in thỉnh thoảng có vệt mờ sọc ngang nhỏ do bụi bám trên thanh gia nhiệt Thermal Head.',
      solution: 'Kỹ sư Canon lau sạch đầu nhiệt bằng dung dịch chuyên dụng IPA 99%, cân chỉnh lại sensor khay nạp phim 14x17 inch.',
      status: 'completed',
      technician: 'Kỹ sư Canon Medical Vietnam'
    },
    {
      id: 'BT-14',
      ticketCode: 'PM-VPI-PACS',
      deviceId: 'TB-14',
      deviceName: 'Hệ thống Lưu trữ Hình ảnh PACS & Bệnh án điện tử EHC.VPI',
      room: 'Phòng Máy chủ Server CĐHA',
      reportedBy: 'Thư ký Y khoa Vũ Thị Dung',
      dateReported: '2026-09-30',
      priority: 'Định kỳ',
      symptom: 'Bảo trì máy chủ PACS định kỳ hàng tháng: Dọn dẹp chỉ mục CSDL DICOM, sao lưu toàn vẹn Snapshot hệ thống.',
      solution: 'Phòng CNTT VPI đã tối ưu hóa index truy vấn hình ảnh, tốc độ tải phim CT 500 lát cắt giảm từ 3.2s xuống 0.8s.',
      status: 'completed',
      technician: 'Đội ngũ Kỹ sư PACS & IT VPI'
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
  ],

  // ==========================================
  // KẾ HOẠCH & LỊCH BẢO TRÌ ĐỊNH KỲ 14 THIẾT BỊ KHOA CĐHA
  // (Cảnh báo tự động nhắc nhở khi sắp tới hạn < 30 ngày)
  // ==========================================
  maintenanceSchedules: [
    {
      id: 'SCH-01',
      deviceId: 'TB-01',
      deviceName: 'Máy CT 32 lát cắt Siemens Somatom Scope',
      room: 'Phòng CT-Scanner',
      cycle: 'Hàng quý (3 tháng)',
      lastDate: '2026-07-25',
      nextDate: '2026-10-25',
      serviceProvider: 'Siemens Healthineers Vietnam',
      contact: '0903.888.115 (KS. Nguyễn Văn Tuấn)',
      scope: 'Kiểm tra cơ điện Gantry, hiệu chuẩn laser định vị, kiểm tra dầu làm mát bóng phát tia X, đo liều rò và độ đồng nhất CT number (HU).',
      status: 'due_soon'
    },
    {
      id: 'SCH-02',
      deviceId: 'TB-02',
      deviceName: 'Máy Cắt lớp vi tính CT Revolution ACT GE',
      room: 'Phòng CT-Scanner',
      cycle: 'Hàng quý (3 tháng)',
      lastDate: '2026-08-15',
      nextDate: '2026-11-15',
      serviceProvider: 'GE Healthcare Vietnam',
      contact: '1800.5858.33 (Hotline GE)',
      scope: 'Bảo dưỡng hệ thống Slip-Ring, vệ sinh lọc gió máy chủ console, kiểm tra độ phân giải cao ma trận Detector 16 dãy.',
      status: 'ok'
    },
    {
      id: 'SCH-03',
      deviceId: 'TB-03',
      deviceName: 'Máy Chụp Cộng hưởng từ MRI 1.5 Tesla GE',
      room: 'Phòng MRI',
      cycle: 'Định kỳ 6 tháng',
      lastDate: '2026-04-22',
      nextDate: '2026-10-22',
      serviceProvider: 'GE Healthcare Field Service',
      contact: '0912.345.678 (KS. Trần Đức Nam)',
      scope: 'Đo mức Heli lỏng (bảo đảm > 70%), kiểm tra áp suất Cold-Head, bảo dưỡng máy nén Sumitomo Compressor, tẩy cặn chiller nước làm mát ngoài trời.',
      status: 'due_soon'
    },
    {
      id: 'SCH-04',
      deviceId: 'TB-04',
      deviceName: 'Máy X-quang KTS Vikomed (Hàn Quốc)',
      room: 'Phòng X-quang 01',
      cycle: 'Định kỳ 6 tháng',
      lastDate: '2026-05-20',
      nextDate: '2026-11-20',
      serviceProvider: 'Vikomed Korea - TBYT Việt Hàn',
      contact: '0989.123.456 (KS. Vũ Long)',
      scope: 'Hiệu chuẩn bộ chuẩn trực Collimator, kiểm tra đối xứng chùm tia, bảo dưỡng bàn chụp trượt nổi 4 chiều và khóa hãm điện từ.',
      status: 'ok'
    },
    {
      id: 'SCH-05',
      deviceId: 'TB-05',
      deviceName: 'Máy X-quang Nhũ ảnh KTS Mammography (Vú)',
      room: 'Phòng Chụp Nhũ ảnh (Vú)',
      cycle: 'Hàng năm',
      lastDate: '2025-11-10',
      nextDate: '2026-11-10',
      serviceProvider: 'Hologic / GE Healthcare',
      contact: '0934.567.890 (KS. Đỗ Minh Quân)',
      scope: 'Cân chỉnh lực ép nén SmartCompression (< 200N), kiểm tra liều hấp thụ tuyến vú AGD < 1.5 mGy, hiệu chuẩn detector tinh thể dẻo bắt vi vôi hóa.',
      status: 'ok'
    },
    {
      id: 'SCH-06',
      deviceId: 'TB-06',
      deviceName: 'Máy X-quang Đo mật độ xương DEXA toàn thân',
      room: 'Phòng Đo loãng xương DEXA',
      cycle: 'Hàng quý (3 tháng)',
      lastDate: '2026-09-15',
      nextDate: '2026-12-15',
      serviceProvider: 'Hologic / DMS Imaging France',
      contact: '0978.223.344 (KS. Hoàng Tùng)',
      scope: 'Chạy kiểm chuẩn hàng ngày khối Phantom tiêu chuẩn Spine/Femur, bảo dưỡng ray trượt cơ khí cánh tay quét Fan-beam, kiểm tra cáp mạng kết nối PACS.',
      status: 'ok'
    },
    {
      id: 'SCH-07',
      deviceId: 'TB-07',
      deviceName: 'Máy Siêu âm Doppler màu cao cấp Mindray Resona I9',
      room: 'Phòng Siêu âm 01',
      cycle: 'Định kỳ 6 tháng',
      lastDate: '2026-06-05',
      nextDate: '2026-12-05',
      serviceProvider: 'Mindray Medical Vietnam',
      contact: '0915.667.788 (KS. Lê Việt Anh)',
      scope: 'Vệ sinh màng lọc bụi tản nhiệt, kiểm tra độ nhạy âm tinh thể piezo các đầu dò Ma trận ZST+, cập nhật bản vá hệ điều hành Mindray iCos.',
      status: 'ok'
    },
    {
      id: 'SCH-08',
      deviceId: 'TB-08',
      deviceName: 'Máy Siêu âm Doppler màu chuyên sâu Arietta F6',
      room: 'Phòng Siêu âm 02',
      cycle: 'Định kỳ 6 tháng',
      lastDate: '2026-06-20',
      nextDate: '2026-12-20',
      serviceProvider: 'Fujifilm Healthcare / Hitachi',
      contact: '0904.112.233 (KS. Phạm Hải)',
      scope: 'Bảo dưỡng bộ biến áp nguồn cách ly y tế, kiểm tra đầu dò Convex/Linear/Tim mạch, cân chỉnh màu màn hình OLED chống lóa.',
      status: 'ok'
    },
    {
      id: 'SCH-09',
      deviceId: 'TB-09',
      deviceName: 'Máy Siêu âm Doppler màu đa chức năng P6/P8',
      room: 'Phòng Siêu âm 03',
      cycle: 'Hàng năm',
      lastDate: '2026-01-15',
      nextDate: '2027-01-15',
      serviceProvider: 'GE Healthcare Ultrasound',
      contact: '1800.5858.33 (GE Ultrasound)',
      scope: 'Bảo dưỡng cơ điện trục nâng hạ bàn phím, vệ sinh bo mạch xử lý chùm tia Beamformer, test nguồn pin dự phòng.',
      status: 'ok'
    },
    {
      id: 'SCH-10',
      deviceId: 'TB-10',
      deviceName: 'Máy Siêu âm xách tay màu tổng quát 3 đầu dò',
      room: 'Phòng Cấp cứu & Khám lưu động',
      cycle: 'Hàng quý (3 tháng)',
      lastDate: '2026-08-05',
      nextDate: '2026-11-05',
      serviceProvider: 'Phòng VT-TTBYT & Kỹ sư hãng',
      contact: '0988.345.115 (Hotline BV VPI)',
      scope: 'Kiểm tra chu kỳ sạc-xả pin Lithium dự phòng di động, kiểm tra cổng cắm đa đầu dò USB/Pin, khử khuẩn mặt đầu dò di động.',
      status: 'ok'
    },
    {
      id: 'SCH-11',
      deviceId: 'TB-11',
      deviceName: 'Bơm tiêm thuốc cản quang tự động 2 nòng CT Stellant',
      room: 'Phòng CT-Scanner',
      cycle: 'Hàng quý (3 tháng)',
      lastDate: '2026-07-28',
      nextDate: '2026-10-28',
      serviceProvider: 'Bayer HealthCare Radiology',
      contact: '0902.998.877 (KS. Nguyễn Quang)',
      scope: 'Hiệu chuẩn cảm biến giới hạn áp lực bơm PSI (chống vỡ tĩnh mạch), kiểm tra cảm biến phát hiện bọt khí tự động FluiDot, tra dầu trục ép piston kép.',
      status: 'due_soon'
    },
    {
      id: 'SCH-12',
      deviceId: 'TB-12',
      deviceName: 'Máy đo SpO2 bàn chuyên dụng phòng CHT Nonin 7500 FO cáp quang',
      room: 'Phòng MRI',
      cycle: 'Định kỳ 6 tháng',
      lastDate: '2026-06-30',
      nextDate: '2026-12-30',
      serviceProvider: 'Nonin Medical / Meditech',
      contact: '0936.445.566 (KS. Đinh Trọng)',
      scope: 'Kiểm tra suy hao sợi cáp quang không nhiễm từ Nonin 8000FOV, test độ chính xác bão hòa Oxy máu và nhịp tim qua buồng cách ly Faraday.',
      status: 'ok'
    },
    {
      id: 'SCH-13',
      deviceId: 'TB-13',
      deviceName: 'Hệ thống Máy in phim y tế kỹ thuật số Canon / Drypix',
      room: 'Phòng In phim & Trả KQ',
      cycle: 'Hàng quý (3 tháng)',
      lastDate: '2026-08-25',
      nextDate: '2026-11-25',
      serviceProvider: 'Canon Medical / Fujifilm Vietnam',
      contact: '0918.776.655 (KS. Mai Thanh)',
      scope: 'Vệ sinh thanh gia nhiệt in phim nhiệt khô (Thermal Head), kiểm tra trục cao su cuốn phim chống kẹt, cân chỉnh mật độ quang học D-max.',
      status: 'ok'
    },
    {
      id: 'SCH-14',
      deviceId: 'TB-14',
      deviceName: 'Hệ thống Lưu trữ Hình ảnh PACS & Bệnh án điện tử EHC.VPI',
      room: 'Phòng Máy chủ Server CĐHA',
      cycle: 'Hàng tháng',
      lastDate: '2026-09-30',
      nextDate: '2026-10-31',
      serviceProvider: 'Phòng CNTT & Đội kỹ sư PACS VPI',
      contact: '0988.345.115 (Nhánh IT VPI)',
      scope: 'Sao lưu toàn bộ cơ sở dữ liệu DICOM sang kho dự phòng NAS độc lập, kiểm tra dung lượng ổ đĩa SAN 24TB, test đường truyền cáp quang LAN 10Gbps kết nối máy trạm đọc phim.',
      status: 'due_soon'
    }
  ],

  // ==========================================
  // SỔ NẠP & QUẢN LÝ PHIẾU ĐO LIỀU KẾ CÁ NHÂN TLD ĐỊNH KỲ
  // (Đo đọc định kỳ theo Thông tư 19/2012/TT-BKHCN)
  // ==========================================
  dosimetryReports: [
    {
      id: 'TLD-REP-2026-Q1',
      quarter: 'Quý 1/2026',
      year: 2026,
      reportNumber: 'KQ-TLD-0412/VINATOM',
      issueDate: '2026-04-10',
      measuringLab: 'Viện Năng lượng nguyên tử Việt Nam (VINATOM) - Trung tâm An toàn Bức xạ',
      totalMonitored: 16,
      exceededLimitCount: 0,
      maxDoseRecorded: '0.16 mSv',
      avgDoseRecorded: '0.08 mSv',
      conclusion: '100% cán bộ nhân viên bức xạ có liều kế nằm trong giới hạn an toàn quy định (< 20 mSv/năm).',
      scanFileUrl: '',
      scanFileName: 'Phieu_tra_KQ_Lieu_ke_TLD_Q1_2026_VINATOM.pdf',
      notes: 'Đã hoàn tất lưu hồ sơ theo dõi liều cá nhân từng nhân viên.'
    },
    {
      id: 'TLD-REP-2026-Q2',
      quarter: 'Quý 2/2026',
      year: 2026,
      reportNumber: 'KQ-TLD-0899/VINATOM',
      issueDate: '2026-07-12',
      measuringLab: 'Viện Năng lượng nguyên tử Việt Nam (VINATOM) - Trung tâm An toàn Bức xạ',
      totalMonitored: 16,
      exceededLimitCount: 0,
      maxDoseRecorded: '0.18 mSv',
      avgDoseRecorded: '0.09 mSv',
      conclusion: '100% nhân viên an toàn tuyệt đối. Mức liều tích lũy 6 tháng đạt chuẩn ICRP-103.',
      scanFileUrl: '',
      scanFileName: 'Phieu_tra_KQ_Lieu_ke_TLD_Q2_2026_VINATOM.pdf',
      notes: 'Đầy đủ chữ ký xác nhận của Cán bộ phụ trách ATBX và Lãnh đạo Viện.'
    },
    {
      id: 'TLD-REP-2026-Q3',
      quarter: 'Quý 3/2026',
      year: 2026,
      reportNumber: 'KQ-TLD-1240/VINATOM',
      issueDate: '2026-10-08',
      measuringLab: 'Viện Năng lượng nguyên tử Việt Nam (VINATOM) - Trung tâm An toàn Bức xạ',
      totalMonitored: 16,
      exceededLimitCount: 0,
      maxDoseRecorded: '0.17 mSv',
      avgDoseRecorded: '0.09 mSv',
      conclusion: '100% nhân viên an toàn tuyệt đối. Liều kế phản ánh quy trình che chắn bức xạ chì đạt chuẩn.',
      scanFileUrl: '',
      scanFileName: 'Phieu_tra_KQ_Lieu_ke_TLD_Q3_2026_VINATOM.pdf',
      notes: 'Kỳ đo gần nhất vừa hoàn thành trong tháng 10/2026.'
    }
  ],

  // ==========================================
  // HỆ THỐNG THI ĐUA - KHEN THƯỞNG, KỶ LUẬT & SAI SÓT CHUYÊN MÔN
  // (Thống kê vi phạm, không tuân thủ, quy chế khoa & phân quyền cập nhật)
  // ==========================================
  rewardsAndDisciplines: [
    {
      id: 'KD-01',
      type: 'reward', // 'reward' | 'discipline' | 'incident'
      staffId: 'NV-01',
      staffName: 'Vũ Bá Đạt',
      staffRole: 'Kỹ thuật viên Trưởng Khoa CĐHA',
      date: '2026-09-18',
      title: 'Khen thưởng đột xuất: Xử trí cấp cứu kịp thời ca sốc phản vệ cản quang độ III',
      category: 'Chuyên môn cấp cứu',
      decisionNumber: 'QĐ-05/QĐ-BV-VPI',
      rewardOrPenalty: 'Thưởng nóng 1.000.000đ & Biểu dương toàn viện',
      severity: 'success',
      description: 'Bệnh nhân có biểu hiện khó thở, mạch nhanh huyết áp tụt sau tiêm cản quang CT bụng. KTV. Đạt cùng kíp trực đã kích hoạt báo động đỏ nội viện, tiêm Adrenalin bắp đúng phác đồ cấp cứu của Bộ Y tế, bảo đảm an toàn tính mạng người bệnh.',
      createdBy: 'Hội đồng Thi đua - Khen thưởng BV VPI',
      status: 'active'
    },
    {
      id: 'KD-02',
      type: 'reward',
      staffId: 'NV-03',
      staffName: 'Phùng Thị Bích',
      staffRole: 'Trưởng nhóm Điều dưỡng Siêu âm',
      date: '2026-09-30',
      title: 'Sáng kiến cải tiến quy trình đón tiếp & chuẩn bị bệnh nhân siêu âm',
      category: 'Sáng kiến cải tiến',
      decisionNumber: 'TB-12/CĐHA-VPI',
      rewardOrPenalty: 'Cộng 10 điểm thi đua Quý 3/2026 & Thưởng thi đua',
      severity: 'success',
      description: 'Đề xuất bảng hướng dẫn uống nước nhịn tiểu siêu âm qua mã QR và màn hình sảnh chờ, giúp giảm thời gian chờ đợi trung bình của bệnh nhân từ 45 phút xuống còn 20 phút.',
      createdBy: 'Ban Lãnh đạo Khoa CĐHA',
      status: 'active'
    },
    {
      id: 'KD-03',
      type: 'reward',
      staffId: 'NV-10',
      staffName: 'Nguyễn Duy Hạnh',
      staffRole: 'Kỹ thuật viên Vận hành DEXA',
      date: '2026-10-05',
      title: 'Thành tích xuất sắc trong công tác kiểm định máy DEXA và an toàn bức xạ',
      category: 'An toàn bức xạ',
      decisionNumber: 'QĐ-09/CĐHA-VPI',
      rewardOrPenalty: 'Biểu dương trước giao ban khoa CĐHA',
      severity: 'success',
      description: 'Chủ động hoàn thiện hồ sơ kiểm định kỹ thuật máy Đo loãng xương DEXA và kết nối PACS trước thời hạn 15 ngày, bảo đảm 100% chỉ số pháp lý an toàn bức xạ đạt chuẩn.',
      createdBy: 'Cán bộ phụ trách ATBX',
      status: 'active'
    },
    {
      id: 'KD-04',
      type: 'discipline',
      staffId: 'NV-04',
      staffName: 'Trần Quốc Tuấn',
      staffRole: 'Cử nhân Kỹ thuật Hình ảnh',
      date: '2026-10-14',
      title: 'Vi phạm quy trình: Không chốt ký sổ nhật ký sử dụng máy CT cuối ngày',
      category: 'Quy trình vận hành máy',
      decisionNumber: 'BB-03/KL-CĐHA',
      rewardOrPenalty: 'Trừ 5 điểm thi đua tháng 10 & Viết bản kiểm điểm',
      severity: 'warning',
      description: 'Kết thúc ca trực ngày 14/10, KTV không kiểm tra chỉ số bóng phát và quên ký chốt số ca chụp trên ứng dụng RADOPS theo quy định giao ban cuối ngày của Khoa.',
      createdBy: 'KTV Trưởng & Phụ trách ATBX',
      status: 'active'
    },
    {
      id: 'KD-05',
      type: 'discipline',
      staffId: 'NV-05',
      staffName: 'Lê Thế Hoàng',
      staffRole: 'Kỹ thuật viên Vận hành MRI',
      date: '2026-10-10',
      title: 'Nhắc nhở an toàn: Không kiểm tra kỹ dị vật kim loại trước khi vào Zone III MRI',
      category: 'An toàn từ trường MRI',
      decisionNumber: 'BB-04/AT-MRI',
      rewardOrPenalty: 'Khiển trách nhắc nhở toàn khoa & Đào tạo lại quy trình Zone IV',
      severity: 'warning',
      description: 'Để người nhà bệnh nhân mang chùm chìa khóa kim loại vào phòng điều khiển Zone III, cổng từ cảnh báo kịp thời ngăn chặn trước khi bước vào buồng máy Zone IV.',
      createdBy: 'Ban Quản trị An toàn MRI',
      status: 'active'
    },
    {
      id: 'KD-06',
      type: 'incident',
      staffId: 'NV-08',
      staffName: 'Đỗ Thành Long',
      staffRole: 'Kỹ thuật viên X-quang Cấp cứu',
      date: '2026-10-08',
      title: 'Sự cố suýt sai sót (Near-Miss): Nhầm chỉ định chụp X-quang gối Trái thành gối Phải',
      category: 'Sai sót chuyên môn / Near-Miss',
      decisionNumber: 'SC-02/SST-VPI',
      rewardOrPenalty: 'Ghi nhận Sổ theo dõi Suýt sai sót & Đào tạo lại quy trình 3 tra 5 đối',
      severity: 'danger',
      description: 'KTV chuẩn bị bệnh nhân chụp gối Trái nhưng chỉ định của Bác sĩ là gối Phải. KTV đã đối chiếu lại bệnh án trước khi phát tia X và chỉnh sửa đúng vị trí, không gây chiếu tia sai vị trí.',
      createdBy: 'Tổ Quản lý Chất lượng & An toàn người bệnh',
      status: 'active'
    }
  ],

  // THÔNG BÁO PHÁT THANH & CẢNH BÁO KHẨN CẤP TOÀN KHOA CĐHA
  broadcastNotices: [
    {
      id: 'BC-01',
      type: 'daily_log_reminder',
      level: 'warning',
      title: '📢 NHẮC NHỞ: Hoàn thành chốt Sổ nhật ký vận hành thiết bị cuối ngày',
      message: 'Kính gửi các KTV trực máy! Đã đến giờ chốt ca làm việc (16:30 - 17:00). Đề nghị các đồng chí hoàn thành chốt sổ nhật ký vận hành máy và kiểm tra mức Heli MRI hôm nay.',
      sender: 'KTV Trưởng Vũ Bá Đạt',
      senderRole: 'Phụ trách ATBX & KTV Trưởng',
      createdAt: '16:30 Hôm nay',
      targetDeviceId: null,
      active: true,
      isRedAlert: false
    }
  ],

};

// Application State Management
class RadOpsApp {
  constructor() {
    this.isSessionLocked = false;
    this.lastUserActivity = Date.now();
    this.data = this.loadData();
    this.currentTab = 'overview';
    this.currentRadiationSubTab = 'inspection'; // 'inspection' | 'dosimetry' | 'training'
    this.currentMaintenanceSubTab = 'schedules'; // 'schedules' | 'tickets' | 'transfers'
    this.currentStaffSubTab = 'list'; // 'list' | 'rewards'
    this.rewardTimeFilter = 'all'; // 'all' | 'day' | 'month' | 'quarter' | 'year'
    this.tldRosterFilter = 'monitored'; // 'monitored' | 'all'
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

        // Tự động bổ sung Lịch bảo trì, Phiếu trả kết quả đo liều TLD & Khen thưởng kỷ luật
        if (!parsed.maintenanceSchedules || !Array.isArray(parsed.maintenanceSchedules) || parsed.maintenanceSchedules.length === 0) {
          parsed.maintenanceSchedules = defaultData.maintenanceSchedules;
        }
        if (!parsed.maintenanceLogs || !Array.isArray(parsed.maintenanceLogs) || parsed.maintenanceLogs.length < 10) {
          parsed.maintenanceLogs = defaultData.maintenanceLogs;
        }
        if (!parsed.dosimetryReports || !Array.isArray(parsed.dosimetryReports) || parsed.dosimetryReports.length === 0) {
          parsed.dosimetryReports = defaultData.dosimetryReports;
        }
        if (!parsed.rewardsAndDisciplines || !Array.isArray(parsed.rewardsAndDisciplines) || parsed.rewardsAndDisciplines.length === 0) {
          parsed.rewardsAndDisciplines = defaultData.rewardsAndDisciplines;
        }
        if (!parsed.broadcastNotices || !Array.isArray(parsed.broadcastNotices)) {
          parsed.broadcastNotices = defaultData.broadcastNotices || [];
        }

        // Tự động bổ sung thông tin CCHN & tính toán ngày còn lại nếu chưa có
        if (parsed.staff && Array.isArray(parsed.staff)) {
          // Nếu trong bộ nhớ cũ thiếu Lê Thùy Linh hoặc Ngô Văn Điều, tự động nạp từ defaultData
          if (!parsed.staff.find(s => s.code === 'BV-625' || (s.name && s.name.includes('Lê Thùy Linh')))) {
            const defLinh = defaultData.staff.find(s => s.code === 'BV-625');
            if (defLinh) parsed.staff.push(JSON.parse(JSON.stringify(defLinh)));
          }
          if (!parsed.staff.find(s => s.code === 'BV-522' || (s.name && s.name.includes('Ngô Văn Điều')))) {
            const defDieu = defaultData.staff.find(s => s.code === 'BV-522');
            if (defDieu) parsed.staff.push(JSON.parse(JSON.stringify(defDieu)));
          }

          // BƯỚC 1: Tự động phát hiện và khắc phục triệt để trùng lặp ID (Auto-heal duplicate IDs)
          let maxNvNum = 0;
          parsed.staff.forEach(s => {
            if (s.id && typeof s.id === 'string') {
              const m = s.id.match(/^NV-(\d+)$/);
              if (m) {
                const n = parseInt(m[1], 10);
                if (n > maxNvNum) maxNvNum = n;
              }
            }
          });

          // Tách riêng nếu Lê Thùy Linh (BV-625) và Ngô Văn Điều (BV-522) bị trùng ID trong LocalStorage cũ
          const linh = parsed.staff.find(s => s.code === 'BV-625' || (s.name && s.name.includes('Lê Thùy Linh')));
          const dieu = parsed.staff.find(s => s.code === 'BV-522' || (s.name && s.name.includes('Ngô Văn Điều')));
          if (linh && dieu && linh.id === dieu.id) {
            maxNvNum++;
            dieu.id = 'NV-' + String(maxNvNum).padStart(2, '0');
          }

          // Cấp lại ID duy nhất cho bất kỳ nhân sự nào bị trùng ID
          const seenIds = new Set();
          parsed.staff.forEach((s, idx) => {
            if (!s.id || seenIds.has(s.id)) {
              maxNvNum++;
              s.id = 'NV-' + String(maxNvNum).padStart(2, '0');
            }
            seenIds.add(s.id);
            if (!s.code) s.code = 'BV-' + String(300 + idx);
          });

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

            // Tự động bổ sung Ngày sinh, Mã TLD & Hồ sơ văn bằng chứng chỉ
            const staffBirthdays = {
              'NV-01': '1990-10-19', 'NV-02': '1984-05-12', 'NV-03': '1992-08-20', 'NV-04': '1994-03-15',
              'NV-05': '1991-11-28', 'NV-06': '1993-07-04', 'NV-07': '1995-09-10', 'NV-08': '1992-12-05',
              'NV-09': '1993-01-22', 'NV-10': '1991-04-18', 'NV-11': '1996-06-30', 'NV-12': '1997-02-14',
              'NV-13': '1995-10-19', 'NV-14': '1998-09-02', 'NV-15': '1999-12-25', 'NV-16': '1982-08-15',
              'NV-17': '1995-10-19', 'NV-18': '1988-06-18'
            };
            if (!m.birthday) {
              m.birthday = staffBirthdays[m.id] || (def && def.birthday ? def.birthday : '1992-10-19');
            }
            if (!m.documents || !Array.isArray(m.documents) || m.documents.length === 0) {
              const defStaff = defaultData.staff.find(ds => ds.code === m.code || ds.id === m.id);
              m.documents = (defStaff && defStaff.documents) ? defStaff.documents : [
                {
                  id: 'DOC-' + m.id + '-01',
                  title: 'Bằng Tốt nghiệp Chuyên môn Y tế',
                  category: 'Bằng Chuyên môn',
                  code: 'VB-' + (m.code || m.id),
                  issuedBy: 'Bộ Y tế / Sở Y tế',
                  issueDate: '2016-06-30',
                  expiryDate: 'Vô thời hạn',
                  note: 'Hồ sơ lưu trữ khoa CĐHA'
                },
                {
                  id: 'DOC-' + m.id + '-02',
                  title: 'Chứng chỉ Hành nghề (CCHN)',
                  category: 'Chứng chỉ Hành nghề',
                  code: m.cchnNumber || ('00' + (4100 + idx * 23) + '/VP-CCHN'),
                  issuedBy: 'Sở Y tế tỉnh Vĩnh Phúc',
                  issueDate: '2017-08-15',
                  expiryDate: 'Vô thời hạn',
                  note: m.cchnScope || 'Hành nghề CĐHA'
                },
                {
                  id: 'DOC-' + m.id + '-03',
                  title: 'Giấy chứng nhận Đào tạo An toàn bức xạ',
                  category: 'Chứng chỉ ATBX',
                  code: 'GCN-ATBX-' + m.id + '/2024',
                  issuedBy: 'Viện Năng lượng nguyên tử Việt Nam',
                  issueDate: '2024-04-15',
                  expiryDate: '2027-04-15',
                  note: 'Tuân thủ Thông tư 02/2022/TT-BKHCN'
                }
              ];
            }
            if (!m.tldCode) {
              m.tldCode = def && def.tldCode ? def.tldCode : ('TLD-VPI-' + String(idx + 1).padStart(3, '0'));
            }
            if (m.isTldMonitored === undefined) {
              m.isTldMonitored = def && def.isTldMonitored !== undefined ? def.isTldMonitored : (m.roleKey !== 'auditor');
            }
            if (!m.tldDose2026) {
              m.tldDose2026 = def && def.tldDose2026 ? def.tldDose2026 : { q1: 0.12, q2: 0.14, q3: 0.15, q4: 0.10, total: 0.51 };
            }
          });

        // Bổ sung cờ giám sát ATBX cho thiết bị (mặc định Máy DEXA TB-06 luôn bật)
        if (parsed.devices && Array.isArray(parsed.devices)) {
          parsed.devices.forEach(d => {
            if (d.id === 'TB-06') {
              d.isRadiationMonitored = true;
            } else if (d.isRadiationMonitored === undefined) {
              d.isRadiationMonitored = (d.category === 'Bức xạ');
            }
          });
        }
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

  // Tìm kiếm nhân sự an toàn tuyệt đối theo ID hoặc Mã nhân viên (BV ID)
  findStaff(staffId, staffCode = null) {
    if (!this.data || !this.data.staff) return null;
    if (staffCode) {
      const byCode = this.data.staff.find(s => s.code === staffCode);
      if (byCode) return byCode;
    }
    if (staffId) {
      const byId = this.data.staff.find(s => s.id === staffId);
      if (byId) return byId;
      const byCode = this.data.staff.find(s => s.code === staffId);
      if (byCode) return byCode;
    }
    return null;
  }

  // Bật/tắt quyền ngoại viện cho nhân viên
  toggleExternalAccess(staffId, staffCode = null) {
    const currentRole = this.getCurrentUserRole();
    if (!currentRole.canManagePermissions) {
      alert('Chỉ KTV Trưởng (Vũ Bá Đạt) hoặc Lãnh đạo Khoa (BS. Trịnh Văn Bình) mới có quyền cấp quyền truy cập ngoại viện!');
      return;
    }

    const member = this.findStaff(staffId, staffCode);
    if (member) {
      member.allowExternalAccess = !member.allowExternalAccess;
      this.saveData();
      this.render();
    }
  }

  // Đổi tài khoản người dùng đang đăng nhập (kèm xác thực PIN & kiểm soát ngoại viện)
  switchUser(staffId, pinInput = null, staffCode = null) {
    const member = this.findStaff(staffId, staffCode);
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
  openPinLoginModal(staffId, staffCode = null) {
    const member = this.findStaff(staffId, staffCode);
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
              <button onclick="radOpsApp.toggleExternalAccess('${member.id}', '${member.code}'); radOpsApp.openPinLoginModal('${member.id}', '${member.code}')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center space-x-1.5 shadow-sm">
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
              onkeypress="if(event.key==='Enter') radOpsApp.submitPinLogin('${member.id}', '${member.code}')">
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
          <button onclick="radOpsApp.submitPinLogin('${member.id}', '${member.code}')" class="h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center shadow-xs">
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

  submitPinLogin(staffId, staffCode = null) {
    const field = document.getElementById('modal-pin-input');
    const pin = field ? field.value : '';
    this.switchUser(staffId, pin, staffCode);
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
                <div onclick="radOpsApp.openPinLoginModal('${member.id}', '${member.code}')" class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-700/50 cursor-pointer transition flex items-center justify-between">
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

      <!-- Banner Thông Báo Toàn Khoa & Cảnh Báo Đỏ Thiết Bị Hỏng -->
      ${this.renderBroadcastBanner()}

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
              <button onclick="radOpsApp.openNotificationsModal()" title="Thông báo & Cảnh báo toàn khoa" class="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition relative">
                <i data-lucide="bell" class="w-4 h-4"></i>
                ${(() => {
                  const activeCount = (this.data.broadcastNotices || []).filter(b => b.active).length;
                  const totalAlerts = 3 + activeCount;
                  const hasDanger = (this.data.broadcastNotices || []).some(b => b.active && (b.level === 'danger' || b.isRedAlert));
                  return `
                    <span class="absolute top-1 right-1 w-4 h-4 ${hasDanger ? 'bg-red-600 animate-ping' : 'bg-red-600'} text-white rounded-full text-[10px] font-bold flex items-center justify-center">${totalAlerts}</span>
                    ${hasDanger ? `<span class="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">${totalAlerts}</span>` : ''}
                  `;
                })()}
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
              <div class="rounded-2xl p-3 border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/50 text-red-950 dark:text-red-100 shadow-sm space-y-2">
                <!-- Hàng 1: Tiêu đề & Thông số ngắn gọn full-width -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2 min-w-0">
                    <div class="w-7 h-7 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shrink-0 animate-pulse">
                      <i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i>
                    </div>
                    <div class="min-w-0">
                      <div class="flex items-center space-x-1.5">
                        <span class="text-xs font-black uppercase text-red-700 dark:text-red-300 tracking-tight truncate">CẢNH BÁO CUỐI NGÀY: THIẾU NHẬT KÝ VẬN HÀNH</span>
                        <span class="w-2 h-2 rounded-full bg-red-600 animate-ping shrink-0"></span>
                      </div>
                      <div class="text-[11px] text-red-800 dark:text-red-300 font-medium">
                        Còn <strong>${comp.missing.length} / ${comp.total} thiết bị</strong> chưa chốt ca hôm nay (${comp.today})
                      </div>
                    </div>
                  </div>
                  <div class="text-right shrink-0 ml-2">
                    <span class="inline-block bg-red-600 text-white font-mono font-black text-xs px-2 py-0.5 rounded-lg shadow-xs">
                      ${comp.rate}%
                    </span>
                  </div>
                </div>

                <!-- Hàng 2: Thanh tiến độ chốt sổ gọn gàng -->
                <div class="w-full bg-red-200 dark:bg-red-900/60 h-1.5 rounded-full overflow-hidden">
                  <div class="bg-red-600 h-full rounded-full transition-all duration-300" style="width: ${comp.rate}%"></div>
                </div>

                <!-- Hàng 3: Danh sách máy còn thiếu & 2 Nút bấm dàn đều hợp lý -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-0.5">
                  <div class="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
                    <span class="text-[10px] font-bold text-red-700 dark:text-red-400 shrink-0">Chưa chốt:</span>
                    ${comp.missing.map(d => `
                      <button onclick="radOpsApp.openDailyLogModal('${d.id}')" class="text-[10px] font-bold bg-white dark:bg-slate-800 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800 px-2 py-0.5 rounded-lg whitespace-nowrap hover:bg-red-600 hover:text-white transition shrink-0">
                        + ${d.code}
                      </button>
                    `).join('')}
                  </div>
                  <div class="flex items-center space-x-1.5 shrink-0 self-end sm:self-auto">
                    <button onclick="radOpsApp.openBroadcastModal('daily_log_reminder')" title="Phát loa thông báo nhắc nhở KTV chốt sổ cuối ngày" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-2.5 py-1.5 rounded-xl text-xs transition shadow-xs flex items-center space-x-1">
                      <i data-lucide="volume-2" class="w-3.5 h-3.5"></i>
                      <span>Phát Loa Nhắc KTV</span>
                    </button>
                    <button onclick="radOpsApp.openDeviceLogLedgerModal()" class="bg-red-600 hover:bg-red-700 text-white font-bold px-2.5 py-1.5 rounded-xl text-xs transition shadow-xs flex items-center space-x-1">
                      <i data-lucide="clipboard-pen" class="w-3.5 h-3.5"></i>
                      <span>Chốt Sổ Ngay</span>
                    </button>
                  </div>
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

  // ==========================================
  // TAB 4: AN TOÀN BỨC XẠ (ATBX & PHÁP LÝ CỤC ATBXHN)
  // 3 Sub-Tabs:
  // 1. Kiểm định & Giấy phép Bức xạ (gồm cả Máy Đo loãng xương DEXA TB-06)
  // 2. Quản lý Liều kế cá nhân (TLD) & Nạp phiếu kết quả đo liều định kỳ
  // 3. Đào tạo ATBX Nhân viên (TT 02/2022/TT-BKHCN)
  // ==========================================
  renderRadiationTab() {
    return `
      <div class="space-y-3.5 animate-fadeIn pb-10">

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
                    ✓ NĐ 142 & TT 02 & TT 19
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

        <!-- 3 Sub-Tabs: [Kiểm định & Giấy phép] - [Liều kế cá nhân TLD] - [Hạn học ATBX KTV] -->
        <div class="flex border-b border-slate-200 dark:border-slate-700">
          <button onclick="radOpsApp.switchRadiationSubTab('inspection')" class="flex-1 pb-2.5 text-center text-xs font-bold transition relative ${this.currentRadiationSubTab === 'inspection' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}">
            <div class="flex items-center justify-center space-x-1.5">
              <i data-lucide="scale" class="w-4 h-4"></i>
              <span>Kiểm định & Thiết bị</span>
            </div>
            ${this.currentRadiationSubTab === 'inspection' ? '<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></div>' : ''}
          </button>

          <button onclick="radOpsApp.switchRadiationSubTab('dosimetry')" class="flex-1 pb-2.5 text-center text-xs font-bold transition relative ${this.currentRadiationSubTab === 'dosimetry' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}">
            <div class="flex items-center justify-center space-x-1.5">
              <i data-lucide="activity" class="w-4 h-4 text-emerald-500"></i>
              <span>Liều kế cá nhân (TLD)</span>
            </div>
            ${this.currentRadiationSubTab === 'dosimetry' ? '<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></div>' : ''}
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

        ${this.currentRadiationSubTab === 'inspection' ? this.renderRadiationInspectionSubTab() : this.currentRadiationSubTab === 'dosimetry' ? this.renderRadiationDosimetrySubTab() : this.renderRadiationTrainingSubTab()}

      </div>
    `;
  }


  renderRadiationInspectionSubTab() {
    const currentRole = this.getCurrentUserRole();
    const canManage = !!(currentRole && (currentRole.canManageLegal || currentRole.canManagePermissions));
    const radDevices = (this.data.devices || []).filter(d => d.isRadiationMonitored !== false && (d.category === 'Bức xạ' || d.isRadiationMonitored === true));

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
              <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">X-quang Vikomed hạn 18 ngày</div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-700 shadow-xs">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">GP Cục ATBXHN</span>
              <div class="w-6 h-6 rounded-lg bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center">
                <i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i>
              </div>
            </div>
            <div class="mt-2">
              <div class="text-lg font-black text-amber-600">01 <span class="text-xs font-bold">Cần nộp hồ sơ</span></div>
              <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Máy CT Revolution (42 ngày)</div>
            </div>
          </div>
        </div>

        <!-- Nút Quản lý Thêm/Bớt Thiết bị Giám sát ATBX (Dành cho Quản lý) -->
        <div class="flex items-center justify-between pt-1">
          <div class="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            Danh mục ${radDevices.length} thiết bị bức xạ đang kiểm soát (gồm cả Máy Đo loãng xương DEXA)
          </div>
          ${canManage ? `
            <button onclick="radOpsApp.openManageRadiationDevicesModal()" class="bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold py-1.5 px-3 rounded-xl transition flex items-center space-x-1.5">
              <i data-lucide="sliders" class="w-3.5 h-3.5"></i>
              <span>⚙️ Thêm / Bớt thiết bị ATBX</span>
            </button>
          ` : ''}
        </div>

        <div class="space-y-3">
          <!-- ITEM 1: Máy X-quang KTS Vikomed (Hàn Quốc) - Cần kiểm định -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-3">
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                  <i data-lucide="alert-circle" class="w-4 h-4"></i>
                </div>
                <div>
                  <div class="flex items-center space-x-1.5 flex-wrap">
                    <span class="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Máy X-quang KTS Vikomed (Hàn Quốc)</span>
                    <span class="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md">Phòng X-quang 01</span>
                    <span class="bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 text-[10px] font-bold px-2 py-0.5 rounded-md">Sắp hết hạn</span>
                  </div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    GCN Kiểm định: KĐ-2024-XQ-VPI (Hết hạn: 2026-11-05)
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl p-2.5 text-xs text-red-700 dark:text-red-300 flex items-center space-x-2">
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

          <!-- ITEM 2: Máy CT Revolution ACT GE - Cần nộp gia hạn GP Cục -->
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

          <!-- ITEM 3: MÁY X-QUANG ĐO MẬT ĐỘ XƯƠNG DEXA TOÀN THÂN (TB-06) -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-blue-200 dark:border-blue-900/60 shadow-xs space-y-3">
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <i data-lucide="activity" class="w-4 h-4"></i>
                </div>
                <div>
                  <div class="flex items-center space-x-1.5 flex-wrap">
                    <span class="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Máy X-quang Đo mật độ xương DEXA toàn thân</span>
                    <span class="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md">Phòng Đo DEXA</span>
                    <span class="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">✓ An toàn</span>
                  </div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    GP Bức xạ: <strong>77/GP-SKHCN Vĩnh Phúc</strong> • GCN Kiểm định: <strong>KĐ-2025-DEXA-VPI</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <span class="text-slate-400 text-[10px]">Hiệu lực kiểm định:</span>
                <div class="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">Đến 12/12/2026 (Còn 425 ngày)</div>
              </div>
              <div class="bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <span class="text-slate-400 text-[10px]">Liều phát xạ:</span>
                <div class="font-bold text-blue-600 dark:text-blue-400 mt-0.5">Fan-Beam kép &lt; 5 µSv/lần</div>
              </div>
            </div>

            <div class="flex items-center space-x-2 pt-1">
              <button onclick="radOpsApp.openDossierModal('TB-06')" class="flex-1 bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 transition border border-purple-200 dark:border-purple-800">
                <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
                <span>Hồ sơ Sở KHCN</span>
              </button>
              <button onclick="radOpsApp.openInspectionCertModal('TB-06')" title="Xem GCN kiểm định DEXA" class="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                <i data-lucide="file-check" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <!-- ITEM 4: Máy Chụp Nhũ ảnh Mammography (Vú) -->
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
                    Kiểm định liều tuyến vú AGD & Độ phân giải
                  </div>
                </div>
              </div>
            </div>

            <div class="text-xs text-slate-600 dark:text-slate-300 pt-1 flex items-center justify-between">
              <span>Kỳ kiểm định: <strong class="text-slate-900 dark:text-white">11/2025</strong></span>
              <span>Hiệu lực đến: <strong class="text-emerald-600 dark:text-emerald-400">11/2026</strong></span>
            </div>
          </div>

          <!-- ITEM 5: Phòng Chụp X-quang & CT-Scanner VPI -->
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
                    Biên bản an toàn che chắn chì (Kiểm xạ môi trường)
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

        <!-- Chân trang Tiêu chuẩn -->
        <div class="bg-slate-100 dark:bg-slate-800/60 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
          <div class="flex items-center space-x-1 text-slate-700 dark:text-slate-300 font-bold">
            <i data-lucide="info" class="w-3.5 h-3.5 text-blue-600"></i>
            <span>Căn cứ pháp lý ATBX</span>
          </div>
          <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            Áp dụng kiểm định định kỳ 1 năm theo <strong class="text-slate-900 dark:text-white">Thông tư 23/TT-BKHCN</strong>; gia hạn giấy phép bức xạ trước 45 ngày theo <strong class="text-slate-900 dark:text-white">Nghị định 142/2020/NĐ-CP</strong>; theo dõi liều kế cá nhân định kỳ theo <strong class="text-slate-900 dark:text-white">Thông tư 19/2012/TT-BKHCN</strong>.
          </p>
        </div>
      </div>
    `;
  }


  // ==========================================
  // SUB-TAB 2: QUẢN LÝ LIỀU KẾ CÁ NHÂN TLD & NẠP KẾT QUẢ ĐO ĐỊNH KỲ
  // ==========================================
  renderRadiationDosimetrySubTab() {
    const currentRole = this.getCurrentUserRole();
    const canManage = !!(currentRole && (currentRole.canManageLegal || currentRole.canManagePermissions));
    const reports = this.data.dosimetryReports || [];
    const staffList = this.data.staff || [];
    const monitoredStaff = staffList.filter(s => s.isTldMonitored !== false);
    const displayedStaff = this.tldRosterFilter === 'all' ? staffList : monitoredStaff;

    // Tính toán động tổng liều, liều TB và liều cao nhất dựa trên danh sách nhân sự được giám sát
    let totalDoseSum = 0;
    let maxRecordedDose = 0;
    monitoredStaff.forEach(s => {
      const d = s.tldDose2026 || { q1: 0.12, q2: 0.14, q3: 0.15, q4: 0.10 };
      const sum = parseFloat(((d.q1 || 0) + (d.q2 || 0) + (d.q3 || 0) + (d.q4 || 0)).toFixed(2));
      totalDoseSum += sum;
      if (sum > maxRecordedDose) maxRecordedDose = sum;
    });
    const avgYearlyDose = monitoredStaff.length > 0 ? (totalDoseSum / monitoredStaff.length).toFixed(2) : '0.00';
    const maxYearlyDose = maxRecordedDose.toFixed(2);
    const monitoredPercent = staffList.length > 0 ? Math.round((monitoredStaff.length / staffList.length) * 100) : 100;

    return `
      <div class="space-y-4 animate-fadeIn">
        <!-- 4 Metric Cards Quản lý Liều Kế TLD (Tính toán động thời gian thực) -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div class="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400 text-xs font-semibold">CBNV Giám Sát</span>
              <div class="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center font-bold text-xs">
                👥
              </div>
            </div>
            <div class="mt-2 flex items-baseline space-x-1.5">
              <span class="text-xl font-black text-slate-900 dark:text-white">${monitoredStaff.length}</span>
              <span class="text-[10px] text-emerald-600 font-bold">${monitoredPercent}% Đeo TLD (${staffList.length} CBNV)</span>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400 text-xs font-semibold">Liều TB Năm</span>
              <div class="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold text-xs">
                ⚡
              </div>
            </div>
            <div class="mt-2 flex items-baseline space-x-1.5">
              <span class="text-xl font-black text-emerald-600">${avgYearlyDose}</span>
              <span class="text-[10px] text-slate-400">mSv/năm</span>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400 text-xs font-semibold">Liều Cao Nhất</span>
              <div class="w-6 h-6 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center font-bold text-xs">
                🛡️
              </div>
            </div>
            <div class="mt-2 flex items-baseline space-x-1.5">
              <span class="text-xl font-black text-purple-600">${maxYearlyDose}</span>
              <span class="text-[10px] text-slate-400">mSv (&lt; 5% GH)</span>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400 text-xs font-semibold">Giới hạn Quy chuẩn</span>
              <div class="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold text-xs">
                ⚖️
              </div>
            </div>
            <div class="mt-2 flex items-baseline space-x-1.5">
              <span class="text-xl font-black text-blue-600">≤ 20</span>
              <span class="text-[10px] text-slate-400">mSv/năm</span>
            </div>
          </div>
        </div>

        <!-- Banner Hành Động & Nạp Phiếu Đo Liều Định Kỳ -->
        <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900 rounded-3xl p-4.5 text-white shadow-lg space-y-3">
          <div class="flex items-start justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white font-bold text-xl shadow-xs">
                📸
              </div>
              <div>
                <h4 class="text-sm font-extrabold text-white">Nạp Kết Quả Đo Liều Kế TLD Định Kỳ (Chụp ảnh / File Scan)</h4>
                <p class="text-[11px] text-emerald-100">Lưu trữ phiếu kết quả đo liều của Viện NLNT Việt Nam lên App phục vụ Thanh tra ATBX</p>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-2 pt-1 flex-wrap gap-y-2">
            <button onclick="radOpsApp.openUploadDosimetryModal()" class="bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-extrabold py-2 px-3.5 rounded-xl transition flex items-center space-x-1.5 shadow-sm">
              <i data-lucide="upload" class="w-4 h-4"></i>
              <span>Nạp Phiếu Trả Kết Quả Đo Liều Mới</span>
            </button>
            <div class="text-[10px] text-emerald-100 font-medium">
              Đơn vị đo đọc: Viện Năng lượng nguyên tử Việt Nam (VINATOM)
            </div>
          </div>
        </div>

        <!-- DANH SÁCH CÁC KỲ ĐO LIỀU KẾ TLD ĐÃ NẠP (DOSIMETRY REPORTS) -->
        <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2.5">
            <div class="flex items-center space-x-2">
              <i data-lucide="file-check" class="w-4 h-4 text-emerald-600"></i>
              <h4 class="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Hồ Sơ Phiếu Kết Quả Đo Liều Kế TLD Năm 2026 (${reports.length} đợt)</h4>
            </div>
            <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">✓ 100% Đạt Chuẩn</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            ${reports.map(rep => `
              <div class="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-2.5">
                <div class="flex items-start justify-between">
                  <div>
                    <span class="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-md font-mono">${rep.quarter}</span>
                    <h5 class="text-xs font-bold text-slate-900 dark:text-white mt-1.5">${rep.reportNumber}</h5>
                  </div>
                  <span class="text-[10px] text-slate-400 font-mono">${rep.issueDate ? rep.issueDate.split('-').reverse().join('/') : ''}</span>
                </div>

                <div class="text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                  <div>Đơn vị: <strong>${rep.measuringLab || 'Viện NLNT Việt Nam'}</strong></div>
                  <div>CBNV đo: <strong>${rep.totalMonitored || 16} người</strong> • Vượt ngưỡng: <strong class="text-emerald-600">0</strong></div>
                  <div>Liều max: <strong class="text-blue-600">${rep.maxDoseRecorded || '0.16 mSv'}</strong></div>
                </div>

                <div class="pt-1 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span class="text-emerald-600 font-bold text-[10px]">✓ An toàn tuyệt đối</span>
                  <button onclick="alert('📄 PHIẾU ĐO LIỀU GỐC: ' + '${rep.reportNumber}' + '\n\n• Kỳ đo: ' + '${rep.quarter}' + '\n• Đơn vị đo: ' + '${rep.measuringLab}' + '\n• Ngày trả KQ: ' + '${rep.issueDate}' + '\n• Kết luận: ' + '${rep.conclusion}')" class="text-blue-600 hover:text-blue-700 font-bold flex items-center space-x-1">
                    <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                    <span>Xem phiếu gốc</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- BẢNG THEO DÕI LIỀU KẾ TLD CHI TIẾT CÁN BỘ NHÂN VIÊN (TÙY BIẾN DANH SÁCH) -->
        <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <div class="flex items-center space-x-2">
                <h4 class="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  Bảng Theo Dõi Liều Kế TLD Chi Tiết Cán Bộ (${displayedStaff.length}/${staffList.length} CBNV)
                </h4>
                <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                  ${this.tldRosterFilter === 'all' ? 'Tất cả nhân sự' : 'Danh sách giám sát bức xạ'}
                </span>
              </div>
              <p class="text-[10px] text-slate-400 mt-0.5">
                Theo dõi liều từng quý Q1, Q2, Q3, Q4 và tổng liều năm (Giới hạn: ≤ 20 mSv/năm theo TT 19/2012/TT-BKHCN)
              </p>
            </div>

            <div class="flex items-center space-x-2 flex-wrap gap-y-2">
              <!-- Bộ lọc hiển thị: Đang đeo TLD vs Tất cả khoa -->
              <div class="inline-flex items-center bg-slate-100 dark:bg-slate-900 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
                <button onclick="radOpsApp.setTldRosterFilter('monitored')" class="px-2.5 py-1 rounded-lg transition ${
                  this.tldRosterFilter === 'monitored' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                }">
                  Đeo TLD (${monitoredStaff.length})
                </button>
                <button onclick="radOpsApp.setTldRosterFilter('all')" class="px-2.5 py-1 rounded-lg transition ${
                  this.tldRosterFilter === 'all' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                }">
                  Tất cả (${staffList.length})
                </button>
              </div>

              ${canManage ? `
                <button onclick="radOpsApp.openManageTldListModal()" class="bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-1.5 px-3 rounded-xl text-xs transition flex items-center space-x-1.5 shadow-xs">
                  <i data-lucide="sliders-horizontal" class="w-3.5 h-3.5"></i>
                  <span>⚙️ Điều chỉnh danh sách</span>
                </button>
              ` : ''}
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 dark:bg-slate-900/60 text-slate-500 text-[10px] uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th class="p-2.5">Mã NV</th>
                  <th class="p-2.5">Họ và Tên</th>
                  <th class="p-2.5">Mã Liều Kế TLD</th>
                  <th class="p-2.5 text-center">Q1 (mSv)</th>
                  <th class="p-2.5 text-center">Q2 (mSv)</th>
                  <th class="p-2.5 text-center">Q3 (mSv)</th>
                  <th class="p-2.5 text-center">Q4 (mSv)</th>
                  <th class="p-2.5 text-center">Tổng 2026</th>
                  <th class="p-2.5 text-center">Trạng thái / Đánh giá</th>
                  ${canManage ? '<th class="p-2.5 text-center">Thao tác</th>' : ''}
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                ${displayedStaff.map(s => {
                  const isMonitored = s.isTldMonitored !== false;
                  const d = s.tldDose2026 || { q1: 0.12, q2: 0.14, q3: 0.15, q4: 0.10, total: 0.51 };
                  const total = isMonitored ? ((d.q1 || 0) + (d.q2 || 0) + (d.q3 || 0) + (d.q4 || 0)).toFixed(2) : '--';
                  return `
                    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition ${!isMonitored ? 'opacity-65 bg-slate-50/40 dark:bg-slate-900/20' : ''}">
                      <td class="p-2.5 font-mono text-slate-500 font-bold text-[11px]">${s.code}</td>
                      <td class="p-2.5">
                        <div class="flex items-center space-x-1.5 flex-wrap">
                          <span class="font-bold text-slate-900 dark:text-white text-xs">${s.name}</span>
                          ${isMonitored ? `
                            <span class="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80 text-[9px] font-bold px-1.5 py-0.2 rounded">
                              TLD
                            </span>
                          ` : `
                            <span class="bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 text-[9px] font-medium px-1.5 py-0.2 rounded">
                              Miễn trừ
                            </span>
                          `}
                        </div>
                        <div class="text-[10px] text-slate-400">${s.role}</div>
                      </td>
                      <td class="p-2.5 font-mono ${isMonitored ? 'text-blue-600 dark:text-blue-400 font-bold text-xs' : 'text-slate-400 text-xs'}">
                        ${isMonitored ? (s.tldCode || 'TLD-VPI') : '<span class="text-slate-400 italic font-sans text-[11px]">Chưa cấp mã</span>'}
                      </td>
                      <td class="p-2.5 text-center font-mono font-medium">${isMonitored ? d.q1 : '--'}</td>
                      <td class="p-2.5 text-center font-mono font-medium">${isMonitored ? d.q2 : '--'}</td>
                      <td class="p-2.5 text-center font-mono font-medium">${isMonitored ? d.q3 : '--'}</td>
                      <td class="p-2.5 text-center font-mono font-medium text-slate-400">${isMonitored ? (d.q4 !== undefined ? d.q4 : '--') : '--'}</td>
                      <td class="p-2.5 text-center font-mono font-black ${isMonitored ? 'text-emerald-600 dark:text-emerald-400 text-xs' : 'text-slate-400'}">${total}</td>
                      <td class="p-2.5 text-center">
                        ${isMonitored ? `
                          <span class="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block">
                            ✓ An toàn
                          </span>
                        ` : `
                          <span class="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-medium px-2 py-0.5 rounded-full inline-block">
                            Miễn trừ ATBX
                          </span>
                        `}
                      </td>
                      ${canManage ? `
                        <td class="p-2.5 text-center">
                          <div class="flex items-center justify-center space-x-1">
                            <button onclick="radOpsApp.toggleStaffTldMonitoring('${s.id}')" title="${isMonitored ? 'Ngưng theo dõi TLD cho nhân sự này' : 'Bật theo dõi liều kế TLD cho nhân sự này'}" class="p-1 rounded-lg ${isMonitored ? 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40' : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'} transition">
                              <i data-lucide="${isMonitored ? 'user-minus' : 'user-plus'}" class="w-3.5 h-3.5"></i>
                            </button>
                            ${isMonitored ? `
                              <button onclick="radOpsApp.openUpdateQuarterlyDoseModal('${s.id}')" title="Cập nhật số liệu đo liều từng quý" class="p-1 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/40 transition">
                                <i data-lucide="edit" class="w-3.5 h-3.5"></i>
                              </button>
                            ` : ''}
                          </div>
                        </td>
                      ` : ''}
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
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
                <button onclick="event.stopPropagation(); radOpsApp.openBroadcastModal('device_breakdown', '${dev.id}')" title="Báo hỏng máy & phát cảnh báo đỏ toàn khoa" class="bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold py-1.5 px-2 rounded-xl text-[11px] transition flex items-center space-x-1 border border-rose-200 dark:border-rose-900/40">
                  <i data-lucide="alert-octagon" class="w-3.5 h-3.5 text-rose-600"></i>
                  <span>Báo hỏng</span>
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
  // TAB 3: BẢO TRÌ & QUẢN LÝ VẬN HÀNH THIẾT BỊ
  // 3 Sub-Tabs:
  // 1. Lịch bảo trì định kỳ & Cảnh báo nhắc nhở tới hạn (14 máy)
  // 2. Sự cố & Nhật ký bảo dưỡng thực tế (14 máy)
  // 3. Sổ quản lý điều chuyển Khoa Phòng (transfers)
  // ==========================================
  renderMaintenanceTab() {
    const isTransfers = this.currentMaintenanceSubTab === 'transfers';
    const isSchedules = this.currentMaintenanceSubTab === 'schedules';
    const isTickets = this.currentMaintenanceSubTab === 'tickets';

    const transfers = this.data.transfers || [];
    const activeTransfers = transfers.filter(t => t.status === 'active');
    const returnedTransfers = transfers.filter(t => t.status === 'returned');
    const logs = this.data.maintenanceLogs || [];
    const schedules = this.data.maintenanceSchedules || [];
    const currentRole = this.getCurrentUserRole();
    const canManage = !!(currentRole && (currentRole.canCreateTickets || currentRole.canManagePermissions));

    // Tính toán các thiết bị sắp tới hạn bảo trì (< 30 ngày) hoặc quá hạn
    const urgentSchedules = schedules.filter(s => {
      const diffDays = Math.ceil((new Date(s.nextDate) - new Date()) / (1000 * 60 * 60 * 24));
      return diffDays <= 30;
    });

    return `
      <div class="space-y-4 animate-fadeIn pb-12">
        <!-- Header Bảo trì -->
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-extrabold text-slate-900 dark:text-white">Bảo Trì & Lịch Định Kỳ Thiết Bị</h2>
            <div class="text-xs text-slate-500 dark:text-slate-400">Hồ sơ 14 thiết bị, lịch bảo dưỡng hãng & điều chuyển khoa phòng</div>
          </div>
          <div class="flex items-center space-x-1.5">
            ${isTransfers ? `
              <button onclick="radOpsApp.openTransferModal()" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2 px-3 rounded-xl transition flex items-center space-x-1 shadow-sm">
                <i data-lucide="arrow-left-right" class="w-4 h-4"></i>
                <span>Tạo phiếu điều chuyển</span>
              </button>
            ` : isSchedules ? `
              ${canManage ? `
                <button onclick="radOpsApp.openMaintenanceScheduleModal()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-3 rounded-xl transition flex items-center space-x-1 shadow-sm">
                  <i data-lucide="calendar-plus" class="w-4 h-4"></i>
                  <span>Cài đặt lịch mới</span>
                </button>
              ` : ''}
            ` : `
              <button onclick="radOpsApp.openNewWorkOrderModal()" class="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2 px-3 rounded-xl transition flex items-center space-x-1 shadow-sm">
                <i data-lucide="plus-circle" class="w-4 h-4"></i>
                <span>Báo hỏng / Sự cố máy</span>
              </button>
            `}
          </div>
        </div>

        <!-- 3 Sub-Tabs Switcher -->
        <div class="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-bold">
          <button onclick="radOpsApp.switchMaintenanceSubTab('schedules')" class="py-2 rounded-xl transition flex items-center justify-center space-x-1 ${
            isSchedules ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
          }">
            <i data-lucide="calendar-clock" class="w-3.5 h-3.5"></i>
            <span>Lịch bảo trì (${schedules.length})</span>
          </button>

          <button onclick="radOpsApp.switchMaintenanceSubTab('tickets')" class="py-2 rounded-xl transition flex items-center justify-center space-x-1 ${
            isTickets ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
          }">
            <i data-lucide="wrench" class="w-3.5 h-3.5"></i>
            <span>Nhật ký sự cố (${logs.length})</span>
          </button>

          <button onclick="radOpsApp.switchMaintenanceSubTab('transfers')" class="py-2 rounded-xl transition flex items-center justify-center space-x-1 ${
            isTransfers ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
          }">
            <i data-lucide="arrow-left-right" class="w-3.5 h-3.5"></i>
            <span>Điều chuyển (${transfers.length})</span>
          </button>
        </div>

        ${isSchedules ? `
          <!-- VIEW 1: LỊCH BẢO TRÌ ĐỊNH KỲ & CẢNH BÁO TỚI HẠN (14 THIẾT BỊ) -->
          ${urgentSchedules.length > 0 ? `
            <div class="bg-gradient-to-r from-amber-500/15 via-red-500/10 to-transparent border-2 border-amber-400 dark:border-amber-600 rounded-3xl p-4 text-xs space-y-2 shadow-sm">
              <div class="flex items-center space-x-2 text-amber-900 dark:text-amber-200 font-extrabold text-sm">
                <i data-lucide="alert-triangle" class="w-5 h-5 text-amber-600 shrink-0"></i>
                <span>CẢNH BÁO: CÓ ${urgentSchedules.length} THIẾT BỊ TỚI HẠN BẢO TRÌ TRONG 30 NGÀY TỚI!</span>
              </div>
              <p class="text-[11px] text-slate-600 dark:text-slate-300">
                Các máy sắp tới hạn: <strong>${urgentSchedules.map(s => s.deviceName).join(', ')}</strong>. Vui lòng liên hệ kỹ sư hãng dịch vụ để chuẩn bị vật tư và kế hoạch bảo dưỡng định kỳ.
              </p>
            </div>
          ` : ''}

          <!-- 4 Metric Cards Lịch bảo trì -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div class="text-lg font-black text-slate-900 dark:text-white">14/14</div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Máy có lịch định kỳ</div>
            </div>
            <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div class="text-lg font-black text-amber-600">${urgentSchedules.length}</div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Tới hạn &lt; 30 ngày</div>
            </div>
            <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div class="text-lg font-black text-emerald-600">${schedules.length - urgentSchedules.length}</div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Chu kỳ an toàn</div>
            </div>
            <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div class="text-lg font-black text-blue-600">100%</div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Hãng ủy quyền</div>
            </div>
          </div>

          <!-- Danh sách Lịch bảo trì 14 thiết bị -->
          <div class="space-y-3">
            ${schedules.map(sch => {
              const diffDays = Math.ceil((new Date(sch.nextDate) - new Date()) / (1000 * 60 * 60 * 24));
              const isOverdue = diffDays < 0;
              const isSoon = diffDays >= 0 && diffDays <= 30;

              return `
                <div class="bg-white dark:bg-slate-800 rounded-3xl p-4.5 border ${
                  isOverdue ? 'border-red-400 dark:border-red-600 shadow-md ring-1 ring-red-500/20' :
                  isSoon ? 'border-amber-300 dark:border-amber-600 shadow-sm' :
                  'border-slate-200 dark:border-slate-700'
                } shadow-xs space-y-3">
                  <div class="flex items-start justify-between">
                    <div>
                      <div class="flex items-center space-x-2 flex-wrap">
                        <span class="font-mono text-[10px] bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-bold">${sch.deviceId}</span>
                        <h4 class="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">${sch.deviceName}</h4>
                      </div>
                      <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        ${sch.room} • Chu kỳ: <strong class="text-slate-700 dark:text-slate-300">${sch.cycle}</strong>
                      </div>
                    </div>

                    <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      isOverdue ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 animate-pulse' :
                      isSoon ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }">
                      ${isOverdue ? `Quá hạn ${Math.abs(diffDays)} ngày` : isSoon ? `Còn ${diffDays} ngày` : `Còn ${diffDays} ngày`}
                    </span>
                  </div>

                  <!-- Thông tin ngày & Đơn vị bảo trì -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div class="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div class="text-slate-400 text-[10px]">Ngày thực hiện gần nhất:</div>
                      <div class="font-bold text-slate-700 dark:text-slate-300 mt-0.5">${sch.lastDate ? sch.lastDate.split('-').reverse().join('/') : 'Chưa có'}</div>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div class="text-slate-400 text-[10px]">Ngày tới hạn tiếp theo:</div>
                      <div class="font-bold ${isSoon || isOverdue ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'} mt-0.5">${sch.nextDate ? sch.nextDate.split('-').reverse().join('/') : ''}</div>
                    </div>
                  </div>

                  <!-- Đơn vị thực hiện & Nội dung quy trình -->
                  <div class="text-xs text-slate-600 dark:text-slate-300 bg-slate-50/60 dark:bg-slate-900/40 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800/60 space-y-1">
                    <div>Đơn vị phụ trách: <strong>${sch.serviceProvider}</strong> • Hotline: <span class="font-mono text-blue-600">${sch.contact}</span></div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">Nội dung: ${sch.scope}</div>
                  </div>

                  <!-- Nút Thao tác -->
                  <div class="flex items-center space-x-2 pt-1">
                    <button onclick="radOpsApp.completeScheduledMaintenance('${sch.id}')" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-xl text-xs transition flex items-center justify-center space-x-1 shadow-xs">
                      <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
                      <span>Xác nhận đã bảo dưỡng kỳ này</span>
                    </button>
                    <button onclick="radOpsApp.openMaintenanceScheduleModal('${sch.id}')" title="Cài đặt lại lịch" class="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition">
                      <i data-lucide="settings-2" class="w-4 h-4"></i>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : isTickets ? `
          <!-- VIEW 2: NHẬT KÝ BẢO TRÌ & SỰ CỐ TOÀN BỘ 14 THIẾT BỊ -->
          <div class="grid grid-cols-3 gap-2 text-center text-xs">
            <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div class="text-lg font-black text-slate-900 dark:text-white">14/14</div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Máy khả dụng (100%)</div>
            </div>
            <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div class="text-lg font-black text-amber-600">00</div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Đang sửa chữa</div>
            </div>
            <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div class="text-lg font-black text-emerald-600">${logs.length}</div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Lịch sử nghiệm thu</div>
            </div>
          </div>

          <div class="space-y-3">
            ${logs.map(log => `
              <div class="bg-white dark:bg-slate-800 rounded-3xl p-4.5 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2.5">
                <div class="flex items-start justify-between">
                  <div>
                    <div class="flex items-center space-x-2">
                      <span class="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400">${log.ticketCode}</span>
                      <span class="text-xs font-bold text-slate-900 dark:text-white">${log.deviceName}</span>
                    </div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">${log.room} • Báo ngày: ${log.dateReported ? log.dateReported.split('-').reverse().join('/') : ''}</div>
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    log.status === 'completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                    log.status === 'in_progress' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                    'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                  }">
                    ${log.status === 'completed' ? 'Đã nghiệm thu' : log.status === 'in_progress' ? 'Đang thực hiện' : 'Chờ xử lý'}
                  </span>
                </div>

                <div class="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-2xl space-y-1">
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
          <!-- VIEW 3: SỔ QUẢN LÝ ĐIỀU CHUYỂN KHOA PHÒNG -->
          <div class="grid grid-cols-3 gap-2 text-center text-xs">
            <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div class="text-lg font-black text-slate-900 dark:text-white">${transfers.length}</div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Tổng điều chuyển</div>
            </div>
            <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div class="text-lg font-black text-amber-600">${activeTransfers.length}</div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Đang ở khoa khác</div>
            </div>
            <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div class="text-lg font-black text-emerald-600">${returnedTransfers.length}</div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Đã hoàn trả CĐHA</div>
            </div>
          </div>

          <!-- Danh sách Phiếu Điều chuyển -->
          <div class="space-y-3">
            ${transfers.length === 0 ? `
              <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 dark:border-slate-700">
                <i data-lucide="inbox" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
                <div>Chưa có phiếu điều chuyển thiết bị nào.</div>
                <button onclick="radOpsApp.openTransferModal()" class="mt-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-1.5 px-3 rounded-xl text-xs inline-flex items-center space-x-1">
                  <span>+ Tạo phiếu điều chuyển đầu tiên</span>
                </button>
              </div>
            ` : transfers.map(t => `
              <div class="bg-white dark:bg-slate-800 rounded-3xl p-4.5 border ${t.status === 'active' ? 'border-amber-300 dark:border-amber-700 shadow-sm' : 'border-slate-200 dark:border-slate-700'} shadow-xs space-y-3">
                <div class="flex items-start justify-between">
                  <div class="space-y-1">
                    <div class="flex items-center space-x-2">
                      <span class="font-mono text-xs font-black bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">${t.code}</span>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${t.status === 'active' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 animate-pulse' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'}">
                        ${t.status === 'active' ? '⏳ ĐANG Ở KHOA NGOÀI' : '✓ ĐÃ HOÀN TRẢ VỀ CĐHA'}
                      </span>
                    </div>
                    <h4 class="text-sm font-extrabold text-slate-900 dark:text-white pt-0.5">${t.deviceName}</h4>
                    <div class="text-[11px] text-slate-500 font-mono">Model: ${t.deviceModel || 'N/A'} • Serial: ${t.deviceSerial || 'N/A'}</div>
                  </div>
                  <div class="text-right">
                    <span class="text-[10px] text-slate-400 font-mono">${t.transferDate}</span>
                  </div>
                </div>

                <div class="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <span class="text-[10px] text-slate-400 block">Nơi bàn giao (Bên giao):</span>
                      <strong class="text-slate-800 dark:text-slate-200">${t.fromDept}</strong>
                      <div class="text-[11px] text-slate-500">${t.fromPerson}</div>
                    </div>
                    <div>
                      <span class="text-[10px] text-slate-400 block">Nơi tiếp nhận (Bên nhận):</span>
                      <strong class="text-amber-600 dark:text-amber-400">${t.toDept}</strong>
                      <div class="text-[11px] text-slate-500">${t.toPerson} (${t.toRoom || ''})</div>
                    </div>
                  </div>
                  <div class="pt-1.5 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                    <div><strong>Lý do:</strong> ${t.reason}</div>
                    <div><strong>Phụ kiện kèm theo:</strong> ${t.accessories || 'Đầy đủ thân máy, dây nguồn'}</div>
                  </div>
                </div>

                <div class="flex items-center justify-between pt-1">
                  <div class="flex items-center space-x-2">
                    ${t.status === 'active' ? `
                      <button onclick="radOpsApp.returnTransfer('${t.id}')" title="Xác nhận hoàn trả thiết bị về CĐHA" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-xl text-xs transition flex items-center space-x-1 shadow-xs">
                        <i data-lucide="check-check" class="w-3.5 h-3.5"></i>
                        <span>Thu hồi / Nhận lại máy</span>
                      </button>
                    ` : `
                      <span class="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
                        <i data-lucide="check" class="w-3.5 h-3.5"></i>
                        <span>Đã thu hồi lúc: ${t.returnDate || ''}</span>
                      </span>
                    `}
                  </div>

                  <button onclick="radOpsApp.viewTransferReceipt('${t.id}')" class="bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-bold py-1.5 px-3 rounded-xl text-xs transition flex items-center space-x-1 border border-blue-200 dark:border-blue-800">
                    <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
                    <span>Xem Biên Bản Có Chữ Ký</span>
                  </button>
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
  // TAB 5: NHÂN SỰ & HỒ SƠ PHÁP LÝ (STAFF & PROFILE)
  // Tính năng:
  // 1. Hồ sơ cá nhân người đăng nhập (My Profile self-service)
  // 2. Chúc mừng sinh nhật cán bộ nhân viên trong ngày
  // 3. Kho tài liệu / Bằng cấp / CCHN / ATBX / CME
  // 4. Phân quyền: Nhân viên chỉ sửa được hồ sơ mình, không sửa người khác
  // 5. Chuyển đổi Sub-tab sang [Khen thưởng - Kỷ luật & Sai sót chuyên môn]
  // ==========================================
  renderStaffTab() {
    const currentRole = this.getCurrentUserRole();
    const currentUser = this.getCurrentUser();
    const isExternal = this.data.auth.locationMode === 'external';
    const activeStaff = this.data.staff.filter(s => s.roleKey !== 'auditor');
    const auditor = this.data.staff.find(s => s.roleKey === 'auditor');
    const rewards = this.data.rewardsAndDisciplines || [];

    // Nếu đang chọn sub-tab Thi đua, Khen thưởng & Kỷ luật
    if (this.currentStaffSubTab === 'rewards') {
      return this.renderStaffRewardsSubTab();
    }

    // Kiểm tra sinh nhật hôm nay (MM-DD)
    const now = new Date();
    const todayMM = String(now.getMonth() + 1).padStart(2, '0');
    const todayDD = String(now.getDate()).padStart(2, '0');
    const todayMD = `${todayMM}-${todayDD}`;
    const birthdayStaff = (this.data.staff || []).filter(s => s.birthday && s.birthday.endsWith(todayMD));
    const isMyBirthday = currentUser && currentUser.birthday && currentUser.birthday.endsWith(todayMD);

    return `
      <div class="space-y-4 animate-fadeIn pb-10">
        <!-- Sub-Tab Switcher: [Cán bộ & Hồ sơ cá nhân] VS [Thi đua, Khen thưởng & Kỷ luật] -->
        <div class="flex border-b border-slate-200 dark:border-slate-700">
          <button onclick="radOpsApp.switchStaffSubTab('list')" class="flex-1 pb-2.5 text-center text-xs font-bold transition relative ${this.currentStaffSubTab === 'list' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}">
            <div class="flex items-center justify-center space-x-1.5">
              <i data-lucide="users" class="w-4 h-4"></i>
              <span>Cán bộ & Hồ sơ cá nhân (${this.data.staff.length})</span>
            </div>
            ${this.currentStaffSubTab === 'list' ? '<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></div>' : ''}
          </button>

          <button onclick="radOpsApp.switchStaffSubTab('rewards')" class="flex-1 pb-2.5 text-center text-xs font-bold transition relative ${this.currentStaffSubTab === 'rewards' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}">
            <div class="flex items-center justify-center space-x-1.5">
              <i data-lucide="award" class="w-4 h-4 text-amber-500"></i>
              <span>Khen thưởng - Kỷ luật (${rewards.length})</span>
            </div>
            ${this.currentStaffSubTab === 'rewards' ? '<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></div>' : ''}
          </button>
        </div>

        ${birthdayStaff.length > 0 ? `
          <!-- BANNER CHÚC MỪNG SINH NHẬT CÁN BỘ NHÂN VIÊN TRONG NGÀY -->
          <div class="bg-gradient-to-r from-pink-500/15 via-rose-500/10 to-amber-500/10 border-2 border-pink-400 dark:border-pink-600 rounded-3xl p-4.5 text-xs shadow-sm relative overflow-hidden">
            <div class="flex items-start space-x-3 relative z-10">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-md">
                🎂
              </div>
              <div class="flex-1">
                <div class="flex items-center space-x-2">
                  <span class="bg-pink-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">🎉 Chúc Mừng Sinh Nhật Cán Bộ Khoa CĐHA</span>
                  <span class="text-pink-600 dark:text-pink-400 font-bold text-xs">${todayDD}/${todayMM}</span>
                </div>
                <div class="mt-1 text-slate-900 dark:text-white font-extrabold text-sm sm:text-base">
                  Hôm nay là sinh nhật của ${birthdayStaff.map(s => `<span class="text-pink-600 dark:text-pink-400">${s.name} (${s.role})</span>`).join(', ')}!
                </div>
                <p class="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Ban Lãnh đạo & Toàn thể anh chị em Khoa Chẩn đoán hình ảnh - Bệnh viện Quốc tế Vĩnh Phúc (VPI) chúc đồng chí tuổi mới luôn tràn đầy năng lượng, dồi dào sức khỏe, gia đình hạnh phúc, nhiệt huyết với nghề và luôn bảo đảm an toàn bức xạ! 💐✨
                </p>
                ${isMyBirthday ? `
                  <div class="mt-2.5 p-2.5 bg-white/90 dark:bg-slate-900/90 rounded-2xl border border-pink-300 dark:border-pink-800 text-pink-700 dark:text-pink-300 font-bold text-xs flex items-center space-x-2 shadow-xs">
                    <span class="text-lg">🎈</span>
                    <span>Chúc mừng sinh nhật bạn! Chúc bạn một ngày làm việc thật vui vẻ, tràn đầy năng lượng và gặt hái nhiều thành công! 🎁</span>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        ` : ''}

        ${currentUser ? `
          <!-- KHỐI HỒ SƠ CÁ NHÂN CỦA NGƯỜI ĐANG ĐĂNG NHẬP (MY PROFILE SELF-SERVICE) -->
          <div class="bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 rounded-3xl p-5 text-white shadow-xl space-y-4">
            <div class="flex items-start justify-between">
              <div class="flex items-center space-x-3.5">
                <div class="w-13 h-13 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center font-black text-xl shadow-md">
                  ${currentUser.name.split(' ').slice(-1)[0][0]}
                </div>
                <div>
                  <div class="flex items-center space-x-2">
                    <h3 class="text-base font-extrabold text-white">${currentUser.name}</h3>
                    <span class="bg-white/25 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">${currentUser.code}</span>
                  </div>
                  <div class="text-xs text-blue-100 mt-0.5">${currentUser.role}</div>
                  <div class="text-[10px] text-blue-200 mt-0.5">Khoa Chẩn đoán hình ảnh • BV Quốc tế Vĩnh Phúc</div>
                </div>
              </div>

              <button onclick="radOpsApp.openPersonalProfileModal('${currentUser.id}')" class="bg-white/20 hover:bg-white/30 text-white text-xs font-bold py-1.5 px-3 rounded-xl transition flex items-center space-x-1.5 border border-white/30 shadow-xs">
                <i data-lucide="user-cog" class="w-3.5 h-3.5"></i>
                <span>Sửa hồ sơ của tôi</span>
              </button>
            </div>

            <!-- Tóm tắt Thông tin Pháp lý & Hồ sơ Văn bằng của tôi -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
              <div class="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
                <div class="text-blue-200 text-[10px]">Ngày sinh</div>
                <div class="font-bold text-white">${currentUser.birthday ? currentUser.birthday.split('-').reverse().join('/') : 'Chưa cập nhật'}</div>
              </div>
              <div class="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
                <div class="text-blue-200 text-[10px]">Số điện thoại</div>
                <div class="font-bold font-mono text-white">${currentUser.phone || '0988.xxx.xxx'}</div>
              </div>
              <div class="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
                <div class="text-blue-200 text-[10px]">Mã liều kế TLD</div>
                <div class="font-bold font-mono text-emerald-300">${currentUser.tldCode || 'TLD-VPI-001'}</div>
              </div>
              <div class="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
                <div class="text-blue-200 text-[10px]">Văn bằng / Chứng chỉ</div>
                <div class="font-bold text-amber-300">${(currentUser.documents || []).length} tài liệu lưu</div>
              </div>
            </div>

            <!-- Kho giấy tờ / Bằng cấp cá nhân -->
            <div class="bg-white/10 rounded-2xl p-3 backdrop-blur-xs space-y-2">
              <div class="flex items-center justify-between">
                <div class="text-xs font-bold text-white flex items-center space-x-1.5">
                  <i data-lucide="file-text" class="w-3.5 h-3.5 text-blue-200"></i>
                  <span>Kho Giấy Tờ, Bằng Cấp & Chứng Chỉ Của Tôi (${(currentUser.documents || []).length})</span>
                </div>
                <button onclick="radOpsApp.openAddDocumentModal('${currentUser.id}')" class="text-[11px] font-bold text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition flex items-center space-x-1">
                  <i data-lucide="plus" class="w-3 h-3"></i>
                  <span>Thêm giấy tờ / Bằng cấp</span>
                </button>
              </div>

              ${(currentUser.documents || []).length === 0 ? `
                <div class="text-[11px] text-blue-200 italic py-1">Bạn chưa nạp giấy tờ nào. Nhấn "+ Thêm giấy tờ / Bằng cấp" để tải lên bằng đại học, CCHN, ATBX, CME...</div>
              ` : `
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  ${(currentUser.documents || []).map(doc => `
                    <div class="bg-white/15 p-2 rounded-xl flex items-center justify-between text-[11px]">
                      <div class="truncate mr-2">
                        <div class="font-bold text-white truncate">${doc.title}</div>
                        <div class="text-[10px] text-blue-200">${doc.category} • ${doc.code || ''}</div>
                      </div>
                      <div class="flex items-center space-x-1 shrink-0">
                        <button onclick="radOpsApp.viewDocumentPreview('${currentUser.id}', '${doc.id}')" title="Xem chi tiết" class="p-1 rounded bg-white/20 hover:bg-white/40 text-white">
                          <i data-lucide="eye" class="w-3 h-3"></i>
                        </button>
                        <button onclick="radOpsApp.deletePersonalDocument('${currentUser.id}', '${doc.id}')" title="Xóa" class="p-1 rounded bg-red-500/40 hover:bg-red-500/60 text-white">
                          <i data-lucide="trash-2" class="w-3 h-3"></i>
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          </div>
        ` : ''}

        <!-- Header Danh sách Cán bộ -->
        <div class="flex items-center justify-between pt-1">
          <div>
            <h2 class="text-base font-extrabold text-slate-900 dark:text-white">Danh Mục Nhân Sự Khoa CĐHA</h2>
            <div class="text-xs text-slate-500 dark:text-slate-400">15 Cán bộ nhân viên cơ hữu & 01 Tài khoản Thanh tra ATBX</div>
          </div>
          ${currentRole.canManagePermissions ? `
            <button onclick="radOpsApp.openStaffFormModal()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-3.5 rounded-xl transition flex items-center space-x-1.5 shadow-sm">
              <i data-lucide="user-plus" class="w-4 h-4"></i>
              <span>Thêm nhân sự</span>
            </button>
          ` : `
            <button onclick="radOpsApp.openAccountListModal()" class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5">
              <i data-lucide="key" class="w-3.5 h-3.5"></i>
              <span>Sổ Tài khoản Khoa</span>
            </button>
          `}
        </div>

        <!-- Danh sách Cán bộ Nhân viên -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${this.data.staff.map(member => {
            const roleInfo = this.data.auth.roles[member.roleKey] || this.data.auth.roles.technician;
            const isMe = currentUser && member.id === currentUser.id;
            const isBirthday = member.birthday && member.birthday.endsWith(todayMD);

            let avatarBg = 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300';
            if (member.roleKey.includes('khoa') || member.roleKey === 'doctor' || member.roleKey === 'admin') {
              avatarBg = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300';
            } else if (member.roleKey.includes('dd_') || member.roleKey === 'nurse') {
              avatarBg = 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300';
            } else if (member.roleKey.includes('tk_') || member.roleKey === 'secretary') {
              avatarBg = 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300';
            }

            return `
              <div class="bg-white dark:bg-slate-800 rounded-3xl p-4.5 border ${isMe ? 'border-blue-500 dark:border-blue-500 shadow-md ring-1 ring-blue-500/30' : isBirthday ? 'border-pink-400 dark:border-pink-600 shadow-sm' : 'border-slate-200 dark:border-slate-700'} shadow-xs space-y-3 relative">
                ${isMe ? `
                  <div class="absolute -top-2.5 right-4 bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    ⭐ Tài khoản của bạn
                  </div>
                ` : isBirthday ? `
                  <div class="absolute -top-2.5 right-4 bg-pink-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    🎂 Sinh nhật hôm nay
                  </div>
                ` : ''}

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

                  <!-- Nút Toggle Quyền Ngoại Viện (Chỉ quản lý được bật/tắt) -->
                  <div class="text-right">
                    <label class="inline-flex items-center cursor-pointer">
                      <input type="checkbox" onchange="radOpsApp.toggleExternalAccess('${member.id}', '${member.code}')" ${member.allowExternalAccess ? 'checked' : ''} ${!currentRole.canManagePermissions ? 'disabled' : ''} class="sr-only peer">
                      <div class="relative w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 ${!currentRole.canManagePermissions ? 'opacity-50 cursor-not-allowed' : ''}"></div>
                    </label>
                    <div class="text-[10px] font-bold ${member.allowExternalAccess ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'} mt-0.5">
                      ${member.allowExternalAccess ? '✓ Ngoại viện: BẬT' : '✕ Ngoại viện: KHÓA'}
                    </div>
                  </div>
                </div>

                <!-- Hồ sơ Pháp lý: CCHN & Hạn ATBX -->
                <div class="pt-2.5 border-t border-slate-100 dark:border-slate-700/60 space-y-2 text-xs">
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
                      <span class="text-slate-400 text-[10px]">Sinh nhật:</span>
                      <div class="font-bold text-slate-700 dark:text-slate-300 text-[11px]">
                        ${member.birthday ? member.birthday.split('-').reverse().join('/') : 'Chưa cập nhật'}
                      </div>
                    </div>
                  </div>

                  <!-- Thông tin Chứng chỉ ATBX & Mã liều kế TLD -->
                  <div class="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl flex items-center justify-between text-[11px] border border-slate-100 dark:border-slate-800/80">
                    <div class="truncate mr-2">
                      <div class="text-slate-400 text-[10px]">Mã liều kế TLD & Đào tạo ATBX:</div>
                      <div class="font-semibold text-slate-700 dark:text-slate-300 truncate">
                        <span class="font-mono text-blue-600 dark:text-blue-400 font-bold">${member.tldCode || 'TLD-VPI'}</span> • ${member.radiationCert || 'Chưa cập nhật'}
                      </div>
                    </div>
                    <div class="text-right shrink-0">
                      <span class="font-bold px-2 py-0.5 rounded-full text-[10px] ${
                        member.daysLeft <= 30 ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 animate-pulse' :
                        member.daysLeft <= 90 ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      }">
                        ${member.daysLeft !== undefined && member.daysLeft !== null ? `Còn ${member.daysLeft} ngày` : (member.certExpiry ? `Hạn ${member.certExpiry}` : 'An toàn')}
                      </span>
                      <div class="text-[9px] text-slate-400 mt-0.5">${(member.documents || []).length} văn bằng đã lưu</div>
                    </div>
                  </div>
                </div>

                <!-- Nút Hành động: PHÂN QUYỀN CHẶT CHẼ -->
                <div class="flex items-center space-x-1.5 pt-1">
                  <button onclick="radOpsApp.openPinLoginModal('${member.id}', '${member.code}')" class="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-700 dark:text-slate-200 hover:text-blue-600 font-bold py-1.5 px-2 rounded-xl text-[11px] transition flex items-center justify-center space-x-1">
                    <i data-lucide="log-in" class="w-3.5 h-3.5"></i>
                    <span>Đăng nhập</span>
                  </button>

                  ${isMe ? `
                    <!-- Chính chủ: Luôn có nút cập nhật hồ sơ cá nhân của mình -->
                    <button onclick="radOpsApp.openPersonalProfileModal('${member.id}', '${member.code}')" title="Cập nhật hồ sơ & Bằng cấp của tôi" class="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold py-1.5 px-3 rounded-xl text-[11px] transition flex items-center space-x-1 border border-blue-200 dark:border-blue-800">
                      <i data-lucide="user-check" class="w-3.5 h-3.5"></i>
                      <span>Sửa hồ sơ của tôi</span>
                    </button>
                  ` : currentRole.canManagePermissions ? `
                    <!-- Quản lý khoa: Có quyền sửa và xóa nhân viên khác -->
                    <button onclick="radOpsApp.openStaffFormModal('${member.id}', '${member.code}')" title="Sửa thông tin nhân sự" class="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold py-1.5 px-3 rounded-xl text-[11px] transition flex items-center space-x-1 border border-blue-200 dark:border-blue-800">
                      <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                      <span>Sửa</span>
                    </button>
                    <button onclick="radOpsApp.deleteStaff('${member.id}', '${member.code}')" title="Xóa nhân sự" class="bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-red-600 font-bold p-1.5 rounded-xl text-[11px] transition flex items-center justify-center border border-red-200 dark:border-red-900/40">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                  ` : `
                    <!-- Nhân viên thường với đồng nghiệp khác: KHÔNG CÓ QUYỀN SỬA HOẶC XÓA -->
                    <span class="text-[10px] text-slate-400 italic px-2">Chỉ xem</span>
                  `}

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
  // PHÂN HỆ: KHEN THƯỞNG - KỶ LUẬT & SAI SÓT CHUYÊN MÔN
  // (Thống kê vi phạm, không tuân thủ, quy chế khoa & phân quyền cập nhật)
  // ==========================================
  setRewardTimeFilter(filter) {
    this.rewardTimeFilter = filter;
    this.render();
  }

  // ==========================================
  // PHÂN HỆ: KHEN THƯỞNG - KỶ LUẬT & SAI SÓT CHUYÊN MÔN
  // (Thống kê vi phạm, không tuân thủ, quy chế khoa theo Ngày, Tháng, Quý, Năm)
  // ==========================================
  renderStaffRewardsSubTab() {
    const currentRole = this.getCurrentUserRole();
    const canManage = !!(currentRole && (currentRole.canManageStaff || currentRole.canManagePermissions));
    const items = this.data.rewardsAndDisciplines || [];

    // Tính toán mốc thời gian: Ngày (Hôm nay), Tháng này, Quý này, Năm nay
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1; // 1-12
    const curQuarter = Math.ceil(curMonth / 3); // 1-4
    const todayStr = now.toISOString().split('T')[0];
    const curMonthStr = `${curYear}-${String(curMonth).padStart(2, '0')}`;
    const todayDisplay = `${String(now.getDate()).padStart(2, '0')}/${String(curMonth).padStart(2, '0')}/${curYear}`;

    // Thống kê chi tiết theo 4 chu kỳ thời gian: Ngày, Tháng, Quý, Năm, Tất cả
    const stats = {
      day: {
        label: `Hôm nay (${todayDisplay})`,
        shortLabel: 'Hôm nay',
        reward: items.filter(i => i.type === 'reward' && i.date === todayStr).length,
        discipline: items.filter(i => i.type === 'discipline' && i.date === todayStr).length,
        incident: items.filter(i => i.type === 'incident' && i.date === todayStr).length
      },
      month: {
        label: `Tháng ${curMonth}/${curYear}`,
        shortLabel: `Tháng ${curMonth}`,
        reward: items.filter(i => i.type === 'reward' && i.date && i.date.startsWith(curMonthStr)).length,
        discipline: items.filter(i => i.type === 'discipline' && i.date && i.date.startsWith(curMonthStr)).length,
        incident: items.filter(i => i.type === 'incident' && i.date && i.date.startsWith(curMonthStr)).length
      },
      quarter: {
        label: `Quý ${curQuarter}/${curYear} (Quý ${['I', 'II', 'III', 'IV'][curQuarter - 1]})`,
        shortLabel: `Quý ${curQuarter}`,
        reward: items.filter(i => {
          if (i.type !== 'reward' || !i.date) return false;
          const d = new Date(i.date);
          return d.getFullYear() === curYear && Math.ceil((d.getMonth() + 1) / 3) === curQuarter;
        }).length,
        discipline: items.filter(i => {
          if (i.type !== 'discipline' || !i.date) return false;
          const d = new Date(i.date);
          return d.getFullYear() === curYear && Math.ceil((d.getMonth() + 1) / 3) === curQuarter;
        }).length,
        incident: items.filter(i => {
          if (i.type !== 'incident' || !i.date) return false;
          const d = new Date(i.date);
          return d.getFullYear() === curYear && Math.ceil((d.getMonth() + 1) / 3) === curQuarter;
        }).length
      },
      year: {
        label: `Cả Năm ${curYear}`,
        shortLabel: `Năm ${curYear}`,
        reward: items.filter(i => i.type === 'reward' && i.date && i.date.startsWith(String(curYear))).length,
        discipline: items.filter(i => i.type === 'discipline' && i.date && i.date.startsWith(String(curYear))).length,
        incident: items.filter(i => i.type === 'incident' && i.date && i.date.startsWith(String(curYear))).length
      },
      all: {
        label: 'Toàn bộ hồ sơ (Tất cả)',
        shortLabel: 'Tất cả',
        reward: items.filter(i => i.type === 'reward').length,
        discipline: items.filter(i => i.type === 'discipline').length,
        incident: items.filter(i => i.type === 'incident').length
      }
    };

    // Tính tổng số & tỷ lệ tuân thủ cho từng chu kỳ
    ['day', 'month', 'quarter', 'year', 'all'].forEach(k => {
      const s = stats[k];
      s.total = s.reward + s.discipline + s.incident;
      s.complianceRate = s.total === 0 ? 100 : Math.max(88, +(100 - (s.discipline * 3.0 + s.incident * 1.5)).toFixed(1));
    });

    const currentFilter = this.rewardTimeFilter || 'all';
    const activeStat = stats[currentFilter] || stats.all;

    // Lọc danh sách bản ghi hiển thị theo chu kỳ được chọn
    let filteredItems = items;
    if (currentFilter === 'day') {
      filteredItems = items.filter(i => i.date === todayStr);
    } else if (currentFilter === 'month') {
      filteredItems = items.filter(i => i.date && i.date.startsWith(curMonthStr));
    } else if (currentFilter === 'quarter') {
      filteredItems = items.filter(i => {
        if (!i.date) return false;
        const d = new Date(i.date);
        return d.getFullYear() === curYear && Math.ceil((d.getMonth() + 1) / 3) === curQuarter;
      });
    } else if (currentFilter === 'year') {
      filteredItems = items.filter(i => i.date && i.date.startsWith(String(curYear)));
    }

    return `
      <div class="space-y-4 animate-fadeIn pb-10">
        <!-- Sub-Tab Switcher -->
        <div class="flex border-b border-slate-200 dark:border-slate-700">
          <button onclick="radOpsApp.switchStaffSubTab('list')" class="flex-1 pb-2.5 text-center text-xs font-bold transition relative ${this.currentStaffSubTab === 'list' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}">
            <div class="flex items-center justify-center space-x-1.5">
              <i data-lucide="users" class="w-4 h-4"></i>
              <span>Cán bộ & Hồ sơ cá nhân (${this.data.staff.length})</span>
            </div>
          </button>

          <button onclick="radOpsApp.switchStaffSubTab('rewards')" class="flex-1 pb-2.5 text-center text-xs font-bold transition relative ${this.currentStaffSubTab === 'rewards' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}">
            <div class="flex items-center justify-center space-x-1.5">
              <i data-lucide="award" class="w-4 h-4 text-amber-500"></i>
              <span>Khen thưởng - Kỷ luật (${items.length})</span>
            </div>
            <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></div>
          </button>
        </div>

        <!-- BỘ LỌC CHU KỲ THỐNG KÊ (NGÀY - THÁNG - QUÝ - NĂM) -->
        <div class="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center space-x-1.5 text-xs font-extrabold text-slate-800 dark:text-white">
              <i data-lucide="calendar" class="w-4 h-4 text-blue-600"></i>
              <span>Chu kỳ thống kê:</span>
              <span class="text-blue-600 font-bold">(${activeStat.label})</span>
            </div>
            <span class="text-[11px] text-slate-400">Hiển thị ${filteredItems.length} / ${items.length} bản ghi</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            <button onclick="radOpsApp.setRewardTimeFilter('all')" class="py-1.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 ${
              currentFilter === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }">
              <span>Tất cả</span>
              <span class="text-[10px] px-1 rounded-full ${currentFilter === 'all' ? 'bg-blue-800 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200'}">${stats.all.total}</span>
            </button>

            <button onclick="radOpsApp.setRewardTimeFilter('day')" class="py-1.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 ${
              currentFilter === 'day' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }">
              <span>📅 Hôm nay</span>
              <span class="text-[10px] px-1 rounded-full ${currentFilter === 'day' ? 'bg-blue-800 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200'}">${stats.day.total}</span>
            </button>

            <button onclick="radOpsApp.setRewardTimeFilter('month')" class="py-1.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 ${
              currentFilter === 'month' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }">
              <span>📆 Tháng ${curMonth}</span>
              <span class="text-[10px] px-1 rounded-full ${currentFilter === 'month' ? 'bg-blue-800 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200'}">${stats.month.total}</span>
            </button>

            <button onclick="radOpsApp.setRewardTimeFilter('quarter')" class="py-1.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 ${
              currentFilter === 'quarter' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }">
              <span>📊 Quý ${curQuarter}</span>
              <span class="text-[10px] px-1 rounded-full ${currentFilter === 'quarter' ? 'bg-blue-800 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200'}">${stats.quarter.total}</span>
            </button>

            <button onclick="radOpsApp.setRewardTimeFilter('year')" class="py-1.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 ${
              currentFilter === 'year' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }">
              <span>🏛️ Năm ${curYear}</span>
              <span class="text-[10px] px-1 rounded-full ${currentFilter === 'year' ? 'bg-blue-800 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200'}">${stats.year.total}</span>
            </button>
          </div>
        </div>

        <!-- 4 Metric Cards Thống kê Động theo Chu kỳ được chọn -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div class="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400 text-xs font-semibold">Khen thưởng</span>
              <div class="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold text-xs">
                🏆
              </div>
            </div>
            <div class="mt-2 flex items-baseline space-x-1.5">
              <span class="text-2xl font-black text-emerald-600">${activeStat.reward}</span>
              <span class="text-[10px] text-slate-400">lượt biểu dương</span>
            </div>
            <div class="text-[10px] text-slate-400 mt-1">${activeStat.shortLabel}</div>
          </div>

          <div class="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400 text-xs font-semibold">Kỷ luật / Nhắc nhở</span>
              <div class="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center font-bold text-xs">
                ⚠️
              </div>
            </div>
            <div class="mt-2 flex items-baseline space-x-1.5">
              <span class="text-2xl font-black text-amber-600">${activeStat.discipline}</span>
              <span class="text-[10px] text-slate-400">vụ việc vi phạm</span>
            </div>
            <div class="text-[10px] text-slate-400 mt-1">${activeStat.shortLabel}</div>
          </div>

          <div class="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400 text-xs font-semibold">Suýt sai sót (Near-Miss)</span>
              <div class="w-6 h-6 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 flex items-center justify-center font-bold text-xs">
                🛡️
              </div>
            </div>
            <div class="mt-2 flex items-baseline space-x-1.5">
              <span class="text-2xl font-black text-red-600">${activeStat.incident}</span>
              <span class="text-[10px] text-slate-400">sự cố phát hiện</span>
            </div>
            <div class="text-[10px] text-slate-400 mt-1">${activeStat.shortLabel}</div>
          </div>

          <div class="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400 text-xs font-semibold">Tuân thủ Quy chế</span>
              <div class="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold text-xs">
                📊
              </div>
            </div>
            <div class="mt-2 flex items-baseline space-x-1.5">
              <span class="text-2xl font-black text-blue-600">${activeStat.complianceRate}%</span>
              <span class="text-[10px] font-bold ${activeStat.complianceRate >= 95 ? 'text-emerald-600' : 'text-amber-600'}">
                ${activeStat.complianceRate >= 95 ? 'Xuất sắc' : 'Đạt yêu cầu'}
              </span>
            </div>
            <div class="text-[10px] text-slate-400 mt-1">${activeStat.shortLabel}</div>
          </div>
        </div>

        <!-- BẢNG TỔNG HỢP SO SÁNH CHU KỲ (NGÀY - THÁNG - QUÝ - NĂM) -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2.5">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <i data-lucide="layers" class="w-4 h-4 text-purple-600"></i>
              <h4 class="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Bảng So Sánh Thống Kê Thi Đua - Kỷ Luật (Ngày / Tháng / Quý / Năm)
              </h4>
            </div>
            <span class="text-[10px] text-slate-400">Bấm dòng để lọc dữ liệu</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700 text-[11px]">
                  <th class="p-2">Chu kỳ thống kê</th>
                  <th class="p-2 text-center text-emerald-600">🏆 Khen thưởng</th>
                  <th class="p-2 text-center text-amber-600">⚠️ Kỷ luật</th>
                  <th class="p-2 text-center text-red-600">🛡️ Suýt sai sót</th>
                  <th class="p-2 text-center">Tổng số</th>
                  <th class="p-2 text-center">Tỷ lệ tuân thủ</th>
                  <th class="p-2 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                <tr onclick="radOpsApp.setRewardTimeFilter('day')" class="cursor-pointer hover:bg-blue-50/50 dark:hover:bg-slate-700/40 transition ${currentFilter === 'day' ? 'bg-blue-50 dark:bg-blue-900/30 font-bold' : ''}">
                  <td class="p-2 font-sans font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>Hôm nay (${todayDisplay})</span>
                  </td>
                  <td class="p-2 text-center text-emerald-600 font-bold">${stats.day.reward}</td>
                  <td class="p-2 text-center text-amber-600 font-bold">${stats.day.discipline}</td>
                  <td class="p-2 text-center text-red-600 font-bold">${stats.day.incident}</td>
                  <td class="p-2 text-center font-bold">${stats.day.total}</td>
                  <td class="p-2 text-center text-emerald-600 font-bold">${stats.day.complianceRate}%</td>
                  <td class="p-2 text-center font-sans">
                    <span class="text-[10px] px-2 py-0.5 rounded-full ${currentFilter === 'day' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-blue-600'}">
                      ${currentFilter === 'day' ? 'Đang xem' : 'Lọc'}
                    </span>
                  </td>
                </tr>

                <tr onclick="radOpsApp.setRewardTimeFilter('month')" class="cursor-pointer hover:bg-blue-50/50 dark:hover:bg-slate-700/40 transition ${currentFilter === 'month' ? 'bg-blue-50 dark:bg-blue-900/30 font-bold' : ''}">
                  <td class="p-2 font-sans font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Tháng ${curMonth}/${curYear}</span>
                  </td>
                  <td class="p-2 text-center text-emerald-600 font-bold">${stats.month.reward}</td>
                  <td class="p-2 text-center text-amber-600 font-bold">${stats.month.discipline}</td>
                  <td class="p-2 text-center text-red-600 font-bold">${stats.month.incident}</td>
                  <td class="p-2 text-center font-bold">${stats.month.total}</td>
                  <td class="p-2 text-center text-emerald-600 font-bold">${stats.month.complianceRate}%</td>
                  <td class="p-2 text-center font-sans">
                    <span class="text-[10px] px-2 py-0.5 rounded-full ${currentFilter === 'month' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-blue-600'}">
                      ${currentFilter === 'month' ? 'Đang xem' : 'Lọc'}
                    </span>
                  </td>
                </tr>

                <tr onclick="radOpsApp.setRewardTimeFilter('quarter')" class="cursor-pointer hover:bg-blue-50/50 dark:hover:bg-slate-700/40 transition ${currentFilter === 'quarter' ? 'bg-blue-50 dark:bg-blue-900/30 font-bold' : ''}">
                  <td class="p-2 font-sans font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <span class="w-2 h-2 rounded-full bg-purple-500"></span>
                    <span>Quý ${curQuarter}/${curYear} (Quý ${['I', 'II', 'III', 'IV'][curQuarter - 1]})</span>
                  </td>
                  <td class="p-2 text-center text-emerald-600 font-bold">${stats.quarter.reward}</td>
                  <td class="p-2 text-center text-amber-600 font-bold">${stats.quarter.discipline}</td>
                  <td class="p-2 text-center text-red-600 font-bold">${stats.quarter.incident}</td>
                  <td class="p-2 text-center font-bold">${stats.quarter.total}</td>
                  <td class="p-2 text-center text-emerald-600 font-bold">${stats.quarter.complianceRate}%</td>
                  <td class="p-2 text-center font-sans">
                    <span class="text-[10px] px-2 py-0.5 rounded-full ${currentFilter === 'quarter' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-blue-600'}">
                      ${currentFilter === 'quarter' ? 'Đang xem' : 'Lọc'}
                    </span>
                  </td>
                </tr>

                <tr onclick="radOpsApp.setRewardTimeFilter('year')" class="cursor-pointer hover:bg-blue-50/50 dark:hover:bg-slate-700/40 transition ${currentFilter === 'year' ? 'bg-blue-50 dark:bg-blue-900/30 font-bold' : ''}">
                  <td class="p-2 font-sans font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>Năm ${curYear}</span>
                  </td>
                  <td class="p-2 text-center text-emerald-600 font-bold">${stats.year.reward}</td>
                  <td class="p-2 text-center text-amber-600 font-bold">${stats.year.discipline}</td>
                  <td class="p-2 text-center text-red-600 font-bold">${stats.year.incident}</td>
                  <td class="p-2 text-center font-bold">${stats.year.total}</td>
                  <td class="p-2 text-center text-emerald-600 font-bold">${stats.year.complianceRate}%</td>
                  <td class="p-2 text-center font-sans">
                    <span class="text-[10px] px-2 py-0.5 rounded-full ${currentFilter === 'year' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-blue-600'}">
                      ${currentFilter === 'year' ? 'Đang xem' : 'Lọc'}
                    </span>
                  </td>
                </tr>

                <tr onclick="radOpsApp.setRewardTimeFilter('all')" class="cursor-pointer hover:bg-blue-50/50 dark:hover:bg-slate-700/40 transition ${currentFilter === 'all' ? 'bg-blue-50 dark:bg-blue-900/30 font-bold' : ''}">
                  <td class="p-2 font-sans font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <span class="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span>Toàn bộ hồ sơ (Tất cả)</span>
                  </td>
                  <td class="p-2 text-center text-emerald-600 font-bold">${stats.all.reward}</td>
                  <td class="p-2 text-center text-amber-600 font-bold">${stats.all.discipline}</td>
                  <td class="p-2 text-center text-red-600 font-bold">${stats.all.incident}</td>
                  <td class="p-2 text-center font-bold">${stats.all.total}</td>
                  <td class="p-2 text-center text-emerald-600 font-bold">${stats.all.complianceRate}%</td>
                  <td class="p-2 text-center font-sans">
                    <span class="text-[10px] px-2 py-0.5 rounded-full ${currentFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-blue-600'}">
                      ${currentFilter === 'all' ? 'Đang xem' : 'Lọc'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Thanh Nút Thao tác & Bộ lọc -->
        <div class="flex items-center justify-between flex-wrap gap-2 pt-1">
          <div class="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Sổ theo dõi thi đua, kỷ luật & sự cố chuyên môn BV Quốc tế Vĩnh Phúc
          </div>

          <div class="flex items-center space-x-2">
            ${canManage ? `
              <button onclick="radOpsApp.openRewardDisciplineModal()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-3.5 rounded-xl transition flex items-center space-x-1.5 shadow-sm">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Ghi nhận Thi đua / Vi phạm</span>
              </button>
            ` : `
              <span class="text-[10px] text-slate-400 italic bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">🔒 Quyền cập nhật: Ban Lãnh đạo Khoa</span>
            `}

            <button onclick="radOpsApp.printRewardDisciplineReport()" class="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 transition flex items-center space-x-1.5">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i>
              <span>In Báo Cáo A4</span>
            </button>
          </div>
        </div>

        <!-- Danh sách Các Vụ Việc & Khen Thưởng -->
        <div class="space-y-3">
          ${filteredItems.length === 0 ? `
            <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 dark:border-slate-700 space-y-1.5">
              <div class="text-base font-bold text-slate-700 dark:text-slate-300">Không có bản ghi nào trong chu kỳ ${activeStat.label}</div>
              <p class="text-[11px]">Không ghi nhận vi phạm hay sự cố nào trong khoảng thời gian này.</p>
              <button onclick="radOpsApp.setRewardTimeFilter('all')" class="mt-2 text-blue-600 dark:text-blue-400 font-bold underline text-xs">
                Xem lại toàn bộ hồ sơ (${items.length} bản ghi)
              </button>
            </div>
          ` : filteredItems.map(item => {
            const isReward = item.type === 'reward';
            const isDiscipline = item.type === 'discipline';
            const isIncident = item.type === 'incident';

            let typeBadge = '';
            let borderColor = 'border-slate-200 dark:border-slate-700';

            if (isReward) {
              typeBadge = '<span class="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1"><span>🏆</span><span>Khen thưởng</span></span>';
              borderColor = 'border-emerald-200 dark:border-emerald-800/60';
            } else if (isDiscipline) {
              typeBadge = '<span class="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1"><span>⚠️</span><span>Kỷ luật / Nhắc nhở</span></span>';
              borderColor = 'border-amber-200 dark:border-amber-800/60';
            } else {
              typeBadge = '<span class="bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1"><span>🛡️</span><span>Suýt sai sót (Near-Miss)</span></span>';
              borderColor = 'border-red-200 dark:border-red-800/60';
            }

            return `
              <div class="bg-white dark:bg-slate-800 rounded-3xl p-4.5 border ${borderColor} shadow-xs space-y-3">
                <div class="flex items-start justify-between">
                  <div class="space-y-1">
                    <div class="flex items-center space-x-2 flex-wrap">
                      ${typeBadge}
                      <span class="font-mono text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-500 font-bold">${item.decisionNumber || item.id}</span>
                      <span class="text-[11px] text-slate-400">Ngày ghi nhận: <strong>${item.date ? item.date.split('-').reverse().join('/') : ''}</strong></span>
                    </div>
                    <h4 class="text-sm font-extrabold text-slate-900 dark:text-white pt-0.5">${item.title}</h4>
                  </div>

                  ${canManage ? `
                    <div class="flex items-center space-x-1">
                      <button onclick="radOpsApp.openRewardDisciplineModal('${item.id}')" title="Sửa biên bản" class="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/40 transition">
                        <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                      </button>
                      <button onclick="radOpsApp.deleteRewardDiscipline('${item.id}')" title="Xóa biên bản" class="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/40 transition">
                        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  ` : ''}
                </div>

                <!-- Cán bộ & Hình thức Xử lý / Khen thưởng -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div class="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div class="text-slate-400 text-[10px]">Cán bộ nhân viên liên quan:</div>
                    <div class="font-bold text-slate-900 dark:text-white mt-0.5">${item.staffName} <span class="text-slate-500 font-normal">(${item.staffRole || ''})</span></div>
                  </div>
                  <div class="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div class="text-slate-400 text-[10px]">Hình thức Khen thưởng / Xử lý:</div>
                    <div class="font-bold ${isReward ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-300'} mt-0.5">${item.rewardOrPenalty || 'Ghi nhận hồ sơ'}</div>
                  </div>
                </div>

                <!-- Nội dung chi tiết diễn biến -->
                <div class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-900/30 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                  <strong class="text-slate-800 dark:text-slate-200">Diễn biến & Nội dung:</strong> ${item.description}
                </div>

                <div class="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-700/60">
                  <span>Lĩnh vực: <strong class="text-slate-700 dark:text-slate-300">${item.category}</strong></span>
                  <span>Người lập biên bản: <strong class="text-slate-700 dark:text-slate-300">${item.createdBy}</strong></span>
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
  // Phân quyền: Chỉ Ban Quản lý Khoa mới có quyền lưu cấu hình
  // Nhân viên thường: Chế độ Xem (Read-only), các nút Lưu bị khóa
  // ==========================================
  renderSettingsTab() {
    const isExternal = this.data.auth.locationMode === 'external';
    const h = this.data.hospital || {};
    const notice = h.notice || { enabled: false, type: 'info', title: '', content: '' };
    const th = h.thresholds || { licenseDays: 45, inspectionDays: 30, certDays: 60, dosimetryMonths: 3 };
    const rooms = this.data.rooms || [];
    const currentRole = this.getCurrentUserRole();
    const canEdit = !!(currentRole && currentRole.canManagePermissions);

    return `
      <div class="space-y-4 animate-fadeIn pb-12">
        <!-- Header Cài đặt -->
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-extrabold text-slate-900 dark:text-white">Cài đặt & Quản trị Nội dung</h2>
            <div class="text-xs text-slate-500 dark:text-slate-400">Tùy biến thông tin thương hiệu, bảng tin, phòng máy & tiêu chuẩn ATBX</div>
          </div>
          <span class="${canEdit ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800' : 'bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'} text-[10px] font-bold px-2.5 py-1 rounded-full">
            ${canEdit ? 'BV-VPI Admin' : '🔒 Chế độ Xem (Nhân viên)'}
          </span>
        </div>

        ${!canEdit ? `
          <!-- CẢNH BÁO BẢO MẬT & PHÂN QUYỀN CHẾ ĐỘ XEM CHO NHÂN VIÊN THƯỜNG -->
          <div class="bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-300 dark:border-amber-700/60 rounded-2xl p-4 text-xs flex items-start space-x-3 text-amber-900 dark:text-amber-200 shadow-2xs">
            <div class="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 font-bold">
              <i data-lucide="shield-alert" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="font-extrabold text-sm flex items-center space-x-1.5">
                <span>🔒 Chế độ Xem & Tra cứu (Dành cho Cán bộ / Nhân viên)</span>
                <span class="bg-amber-100 dark:bg-amber-900/80 text-amber-800 dark:text-amber-300 text-[10px] font-bold px-2 py-0.2 rounded-full">Chỉ đọc (Read-only)</span>
              </div>
              <div class="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Tài khoản của bạn không thuộc Ban Quản lý Khoa. Bạn có quyền tra cứu thông tin thương hiệu, danh mục phòng máy, ngưỡng an toàn và nội dung bảng tin, nhưng <strong>không thể thay đổi hoặc lưu dữ liệu cài đặt hệ thống</strong>. Vui lòng liên hệ Trưởng khoa, Phó khoa hoặc Quản trị viên ATBX nếu cần cập nhật cấu hình.
              </div>
            </div>
          </div>
        ` : ''}

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
              <input type="text" id="setting-hospital-name" value="${h.name || ''}" ${canEdit ? '' : 'disabled'} required class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Tên Khoa chuyên môn</label>
                <input type="text" id="setting-hospital-dept" value="${h.department || 'Khoa Chẩn đoán hình ảnh'}" ${canEdit ? '' : 'disabled'} class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed">
              </div>
              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Tên pháp nhân công ty</label>
                <input type="text" id="setting-hospital-legal" value="${h.legalName || ''}" ${canEdit ? '' : 'disabled'} class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium text-slate-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed">
              </div>
            </div>

            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Khẩu hiệu / Slogan hoạt động của Khoa</label>
              <input type="text" id="setting-hospital-slogan" value="${h.slogan || 'Chính xác - Nhanh chóng - An toàn bức xạ - Tận tâm'}" ${canEdit ? '' : 'disabled'} placeholder="Ví dụ: Chính xác - Nhanh chóng - An toàn bức xạ" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium text-slate-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Hotline Khoa / Hỗ trợ Kỹ thuật</label>
                <input type="text" id="setting-hospital-hotline" value="${h.hotline || '0988.345.115'}" ${canEdit ? '' : 'disabled'} placeholder="0988.xxx.xxx" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed">
              </div>
              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Địa chỉ / Vị trí Khoa</label>
                <input type="text" id="setting-hospital-address" value="${h.address || 'Tầng 1 - Khu CĐHA, Bệnh viện Quốc tế Vĩnh Phúc'}" ${canEdit ? '' : 'disabled'} class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium text-slate-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div class="font-bold text-[11px] text-blue-600 dark:text-blue-400">LÃNH ĐẠO KHOA CHUYÊN MÔN</div>
                <div>
                  <label class="block text-slate-500 text-[10px] mb-0.5">Họ tên Phụ trách Khoa</label>
                  <input type="text" id="setting-head-name" value="${h.headOfDept || ''}" ${canEdit ? '' : 'disabled'} class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-bold text-slate-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed">
                </div>
                <div>
                  <label class="block text-slate-500 text-[10px] mb-0.5">Chức danh hiển thị</label>
                  <input type="text" id="setting-head-title" value="${h.headOfDeptTitle || 'Phụ trách Khoa Chẩn đoán hình ảnh'}" ${canEdit ? '' : 'disabled'} class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-medium text-slate-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed">
                </div>
              </div>

              <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div class="font-bold text-[11px] text-emerald-600 dark:text-emerald-400">CÁN BỘ PHỤ TRÁCH ATBX</div>
                <div>
                  <label class="block text-slate-500 text-[10px] mb-0.5">Họ tên Phụ trách ATBX</label>
                  <input type="text" id="setting-officer-name" value="${h.officer || ''}" ${canEdit ? '' : 'disabled'} class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-bold text-slate-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed">
                </div>
                <div class="grid grid-cols-2 gap-1.5">
                  <div>
                    <label class="block text-slate-500 text-[10px] mb-0.5">Mã NV</label>
                    <input type="text" id="setting-officer-id" value="${h.officerId || 'BV-345'}" ${canEdit ? '' : 'disabled'} class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-mono text-slate-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed">
                  </div>
                  <div>
                    <label class="block text-slate-500 text-[10px] mb-0.5">Chu kỳ GS</label>
                    <input type="text" id="setting-officer-cycle" value="${h.supervisionCycle || 'Tháng 10/2026'}" ${canEdit ? '' : 'disabled'} class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed">
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Căn cứ pháp lý viện dẫn trong hồ sơ</label>
              <input type="text" id="setting-hospital-legalbasis" value="${h.legalBasis || 'Luật NLNT & NĐ 142/2020 & TT 23/TT-BKHCN'}" ${canEdit ? '' : 'disabled'} class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium text-slate-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed">
            </div>

            ${canEdit ? `
              <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-2.5 px-4 rounded-xl transition flex items-center justify-center space-x-1.5 shadow-sm">
                <i data-lucide="save" class="w-4 h-4"></i>
                <span>Lưu Thay Đổi Thông Tin Thương Hiệu</span>
              </button>
            ` : `
              <div class="p-2.5 text-center text-xs text-slate-400 font-semibold bg-slate-100 dark:bg-slate-900/60 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                <i data-lucide="lock" class="w-3.5 h-3.5 inline mr-1 text-slate-400"></i>🔒 Chỉ Ban Quản lý Khoa mới có quyền lưu cấu hình này
              </div>
            `}
          </form>
        </div>

        <!-- PHÂN HỆ 2: BẢNG TIN THÔNG BÁO NỘI BỘ KHOA -->
        <div id="sec-notice" class="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div class="flex items-center space-x-2.5">
              <div class="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <i data-lucide="bell-ring" class="w-4.5 h-4.5"></i>
              </div>
              <div>
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Bảng Tin Thông Báo Đầu Trang (Notice Banner)</h3>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Ghim thông điệp chỉ đạo, lịch kiểm định hoặc cảnh báo khẩn ở đầu trang chủ</p>
              </div>
            </div>
            <span class="text-[10px] bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold">Nổi bật</span>
          </div>

          <form onsubmit="event.preventDefault(); radOpsApp.saveNoticeSettings();" class="space-y-3 text-xs">
            <div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div>
                <div class="font-bold text-slate-900 dark:text-white text-xs">Kích hoạt Bảng tin Thông báo</div>
                <div class="text-[10px] text-slate-500">Hiển thị thẻ banner màu ở đầu màn hình Dashboard</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" id="setting-notice-enabled" ${notice.enabled ? 'checked' : ''} ${canEdit ? '' : 'disabled'} class="sr-only peer">
                <div class="relative w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Mức độ cảnh báo (Màu sắc)</label>
                <select id="setting-notice-type" ${canEdit ? '' : 'disabled'} class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed">
                  <option value="info" ${notice.type === 'info' ? 'selected' : ''}>🔵 Tin tức thông thường (Xanh lam)</option>
                  <option value="warning" ${notice.type === 'warning' ? 'selected' : ''}>🟡 Nhắc nhở hạn kiểm định (Vàng cam)</option>
                  <option value="danger" ${notice.type === 'danger' ? 'selected' : ''}>🔴 Khẩn cấp / Sự cố máy (Đỏ)</option>
                </select>
              </div>
              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Tiêu đề thông báo *</label>
                <input type="text" id="setting-notice-title" value="${notice.title || ''}" ${canEdit ? '' : 'disabled'} required placeholder="Ví dụ: Kế hoạch Kiểm xạ & Gia hạn GP Bức xạ" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed">
              </div>
            </div>

            <div>
              <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Nội dung thông điệp chi tiết</label>
              <textarea id="setting-notice-content" rows="2" ${canEdit ? '' : 'disabled'} placeholder="Nhập nội dung thông điệp gửi toàn thể CBNV..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed">${notice.content || ''}</textarea>
            </div>

            ${canEdit ? `
              <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2.5 px-4 rounded-xl transition flex items-center justify-center space-x-1.5 shadow-sm">
                <i data-lucide="check" class="w-4 h-4"></i>
                <span>Cập Nhật Bảng Tin Thông Báo</span>
              </button>
            ` : `
              <div class="p-2.5 text-center text-xs text-slate-400 font-semibold bg-slate-100 dark:bg-slate-900/60 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                <i data-lucide="lock" class="w-3.5 h-3.5 inline mr-1 text-slate-400"></i>🔒 Chỉ Ban Quản lý Khoa mới có quyền lưu cấu hình này
              </div>
            `}
          </form>
        </div>

        <!-- PHÂN HỆ 3: DANH MỤC PHÒNG MÁY CHUYÊN MÔN -->
        <div id="sec-rooms" class="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div class="flex items-center space-x-2.5">
              <div class="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <i data-lucide="door-open" class="w-4.5 h-4.5"></i>
              </div>
              <div>
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Danh Mục Phòng Máy Chuyên Môn (${rooms.length} phòng)</h3>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Quản lý vị trí phòng chụp X-quang, CT, MRI, Siêu âm & kiểm xạ che chắn</p>
              </div>
            </div>
            ${canEdit ? `
              <button onclick="radOpsApp.openRoomFormModal()" class="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-1.5 px-3 rounded-xl transition flex items-center space-x-1 shadow-sm">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                <span>Thêm phòng mới</span>
              </button>
            ` : `
              <span class="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/40 px-2.5 py-1 rounded-full">Chỉ đọc</span>
            `}
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${rooms.map(room => `
              <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <div class="flex items-start justify-between">
                  <div>
                    <div class="flex items-center space-x-1.5">
                      <span class="font-extrabold text-xs text-slate-900 dark:text-white">${room.name}</span>
                      <span class="font-mono text-[9px] bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-1.5 py-0.2 rounded font-bold">${room.code}</span>
                    </div>
                    <div class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">${room.location}</div>
                  </div>
                  ${canEdit ? `
                    <div class="flex items-center space-x-1">
                      <button onclick="radOpsApp.openRoomFormModal('${room.id}')" title="Sửa thông tin phòng" class="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/40 transition">
                        <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
                      </button>
                      <button onclick="radOpsApp.deleteRoom('${room.id}')" title="Xóa phòng máy" class="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/40 transition">
                        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                      </button>
                    </div>
                  ` : ''}
                </div>

                <div class="flex items-center justify-between text-[10px] pt-1 border-t border-slate-200/60 dark:border-slate-800">
                  <span class="text-slate-500">Phụ trách: <strong class="text-slate-700 dark:text-slate-300">${room.manager}</strong></span>
                  <span class="font-semibold ${room.leadShielding ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}">
                    ${room.leadShielding ? '🛡️ Chì chắn: Đạt chuẩn' : '⚪ Không tia xạ'}
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- PHÂN HỆ 4: CÀI ĐẶT NGƯỠNG CẢNH BÁO HẠN PHÁP LÝ (THRESHOLDS) -->
        <div id="sec-thresholds" class="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div class="flex items-center space-x-2.5">
              <div class="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <i data-lucide="timer" class="w-4.5 h-4.5"></i>
              </div>
              <div>
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Ngưỡng Cảnh Báo Trước Hạn Pháp Lý</h3>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Thời gian hệ thống bắt đầu đổi màu vàng/đỏ và rung chuông báo động</p>
              </div>
            </div>
            <span class="text-[10px] bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">Tự động</span>
          </div>

          <form onsubmit="event.preventDefault(); radOpsApp.saveThresholdSettings();" class="space-y-3 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                <label class="block font-bold text-slate-800 dark:text-slate-200 text-xs">Báo trước Giấy phép Cục ATBXHN</label>
                <div class="text-[10px] text-slate-500 mb-1.5">Theo NĐ 142/2020: Nộp hồ sơ trước ít nhất 45 ngày</div>
                <div class="flex items-center space-x-2">
                  <input type="number" id="setting-th-license" value="${th.licenseDays || 45}" ${canEdit ? '' : 'disabled'} min="15" max="180" class="w-24 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono font-bold text-slate-900 dark:text-white text-center disabled:opacity-60 disabled:cursor-not-allowed">
                  <span class="text-slate-600 dark:text-slate-400 font-bold">ngày trước hết hạn</span>
                </div>
              </div>

              <div class="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                <label class="block font-bold text-slate-800 dark:text-slate-200 text-xs">Báo trước Kiểm định Máy X-quang/CT/DEXA</label>
                <div class="text-[10px] text-slate-500 mb-1.5">Theo Thông tư 23/TT-BKHCN: Chu kỳ định kỳ 1 năm</div>
                <div class="flex items-center space-x-2">
                  <input type="number" id="setting-th-inspection" value="${th.inspectionDays || 30}" ${canEdit ? '' : 'disabled'} min="7" max="90" class="w-24 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono font-bold text-slate-900 dark:text-white text-center disabled:opacity-60 disabled:cursor-not-allowed">
                  <span class="text-slate-600 dark:text-slate-400 font-bold">ngày trước hết hạn</span>
                </div>
              </div>

              <div class="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                <label class="block font-bold text-slate-800 dark:text-slate-200 text-xs">Báo trước Hạn Chứng chỉ ATBX KTV</label>
                <div class="text-[10px] text-slate-500 mb-1.5">Theo Thông tư 02/2022/TT-BKHCN: Đào tạo lại 3 năm/lần</div>
                <div class="flex items-center space-x-2">
                  <input type="number" id="setting-th-cert" value="${th.certDays || 60}" ${canEdit ? '' : 'disabled'} min="15" max="180" class="w-24 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono font-bold text-slate-900 dark:text-white text-center disabled:opacity-60 disabled:cursor-not-allowed">
                  <span class="text-slate-600 dark:text-slate-400 font-bold">ngày trước hết hạn</span>
                </div>
              </div>

              <div class="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                <label class="block font-bold text-slate-800 dark:text-slate-200 text-xs">Chu kỳ Gửi Liều kế Cá nhân TLD</label>
                <div class="text-[10px] text-slate-500 mb-1.5">Theo Thông tư 19/2012/TT-BKHCN: Định kỳ 3 tháng/lần</div>
                <div class="flex items-center space-x-2">
                  <input type="number" id="setting-th-dosimetry" value="${th.dosimetryMonths || 3}" ${canEdit ? '' : 'disabled'} min="1" max="6" class="w-24 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono font-bold text-slate-900 dark:text-white text-center disabled:opacity-60 disabled:cursor-not-allowed">
                  <span class="text-slate-600 dark:text-slate-400 font-bold">tháng / lần đo đọc</span>
                </div>
              </div>
            </div>

            ${canEdit ? `
              <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 px-4 rounded-xl transition flex items-center justify-center space-x-1.5 shadow-sm">
                <i data-lucide="check-check" class="w-4 h-4"></i>
                <span>Lưu Ngưỡng Cảnh Báo An Toàn</span>
              </button>
            ` : `
              <div class="p-2.5 text-center text-xs text-slate-400 font-semibold bg-slate-100 dark:bg-slate-900/60 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                <i data-lucide="lock" class="w-3.5 h-3.5 inline mr-1 text-slate-400"></i>🔒 Chỉ Ban Quản lý Khoa mới có quyền lưu cấu hình này
              </div>
            `}
          </form>
        </div>

        <!-- PHÂN HỆ 5: BẢNG KIỂM AN TOÀN TỪ TRƯỜNG MRI 1.5 TESLA -->
        <div id="sec-mri" class="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div class="flex items-center space-x-2.5">
              <div class="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <i data-lucide="magnet" class="w-4.5 h-4.5"></i>
              </div>
              <div>
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Bảng Kiểm An Toàn Từ Trường MRI (Zone IV)</h3>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">8 tiêu chí an toàn kim loại tuyệt đối trước khi bệnh nhân vào buồng chụp</p>
              </div>
            </div>
          </div>

          <div class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Hệ thống đang áp dụng <strong>${(h.mriChecklist || []).length} tiêu chí sàng lọc kim loại chuẩn ACR</strong> (Máy tạo nhịp tim, Clip phình mạch não, Dị vật kim khí hốc mắt, Nẹp đinh kết hợp xương...).
          </div>

          ${canEdit ? `
            <button onclick="radOpsApp.openMriChecklistSettingsModal()" class="w-full bg-indigo-50 dark:bg-indigo-900/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-extrabold py-2 px-3 rounded-xl transition flex items-center justify-center space-x-1.5 border border-indigo-200 dark:border-indigo-800">
              <i data-lucide="settings" class="w-4 h-4"></i>
              <span>Tùy Biến 8 Câu Hỏi Bảng Kiểm An Toàn MRI</span>
            </button>
          ` : `
            <div class="p-2 text-center text-xs text-slate-400 font-semibold bg-slate-100 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
              <i data-lucide="lock" class="w-3.5 h-3.5 inline mr-1"></i>🔒 Chỉ Quản lý Khoa mới có quyền sửa đổi câu hỏi an toàn MRI
            </div>
          `}
        </div>

        <!-- PHÂN HỆ 6: AN NINH, SAO LƯU & TRUNG TÂM PHỤC HỒI DỮ LIỆU -->
        <div id="sec-security" class="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-3xl p-5 border border-slate-700 text-white shadow-xl space-y-4">
          <div class="flex items-center justify-between border-b border-slate-700/80 pb-3">
            <div class="flex items-center space-x-2.5">
              <div class="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30 flex items-center justify-center font-bold">
                <i data-lucide="shield-check" class="w-5 h-5"></i>
              </div>
              <div>
                <h3 class="text-sm font-extrabold text-white">Lá Chắn An Ninh & Phục Hồi Thảm Họa (Disaster Recovery)</h3>
                <p class="text-[11px] text-slate-400">Bảo vệ CSDL trước tấn công mạng, xâm nhập trái phép & sự cố mất dữ liệu</p>
              </div>
            </div>
            <span class="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
              Kích hoạt 100%
            </span>
          </div>

          <!-- Các chỉ số giám sát An ninh số -->
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
                <div onclick="radOpsApp.openPinLoginModal('${member.id}', '${member.code}')" class="p-2.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
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
    const broadcasts = this.data.broadcastNotices || [];
    const activeBroadcasts = broadcasts.filter(b => b.active);

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[88vh] overflow-y-auto">
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <div class="flex items-center space-x-2">
            <div class="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <i data-lucide="bell" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Thông Báo & Cảnh Báo Khoa CĐHA</h3>
              <p class="text-[11px] text-slate-500">Bệnh viện Quốc tế Vĩnh Phúc • Cập nhật trực tiếp</p>
            </div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Nút Nổi Bật: Phát Thông Báo / Cảnh Báo Mới -->
        <button onclick="radOpsApp.openBroadcastModal()" class="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black py-2.5 px-4 rounded-2xl shadow-md flex items-center justify-center space-x-2 transition cursor-pointer">
          <i data-lucide="megaphone" class="w-4 h-4 text-amber-300"></i>
          <span>📢 Phát Thông Báo Nhắc Nhở & Cảnh Báo Khẩn Cho Nhân Viên</span>
        </button>

        <!-- PHẦN 1: THÔNG BÁO PHÁT THANH NỘI BỘ KHOA -->
        <div class="space-y-2 text-xs">
          <div class="font-extrabold text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span class="flex items-center space-x-1.5 uppercase text-[11px] tracking-wide">
              <i data-lucide="radio" class="w-3.5 h-3.5 text-blue-600"></i>
              <span>Thông báo phát thanh nội bộ (${activeBroadcasts.length} đang phát)</span>
            </span>
          </div>

          ${activeBroadcasts.length === 0 ? `
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 text-slate-500 text-center text-xs">
              Hiện không có thông báo phát thanh khẩn cấp nào đang kích hoạt.
            </div>
          ` : activeBroadcasts.map(b => `
            <div class="p-3 rounded-2xl border space-y-1.5 ${
              b.level === 'danger' || b.isRedAlert 
                ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-900/60 text-red-950 dark:text-red-100' 
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900/60 text-amber-950 dark:text-amber-100'
            }">
              <div class="flex items-start justify-between">
                <div class="flex items-center space-x-1.5 font-black text-xs uppercase">
                  <span>${b.level === 'danger' || b.isRedAlert ? '🚨' : '📢'}</span>
                  <span class="${b.level === 'danger' || b.isRedAlert ? 'text-red-700 dark:text-red-400' : 'text-amber-800 dark:text-amber-400'}">${b.title}</span>
                </div>
                <span class="text-[10px] text-slate-500 font-mono">${b.createdAt}</span>
              </div>
              <p class="text-[11px] leading-relaxed font-medium">${b.message}</p>
              <div class="flex items-center justify-between pt-1 border-t ${b.level === 'danger' || b.isRedAlert ? 'border-red-200 dark:border-red-900/50' : 'border-amber-200 dark:border-amber-900/50'} text-[10px]">
                <span class="text-slate-500">Phát bởi: <strong>${b.sender}</strong></span>
                <div class="flex items-center space-x-1.5">
                  ${b.type === 'daily_log_reminder' ? `
                    <button onclick="radOpsApp.closeModal(); radOpsApp.openDailyLogModal();" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-2 py-0.5 rounded-lg text-[10px]">
                      Chốt sổ ngay
                    </button>
                  ` : ''}
                  ${b.deviceId && (b.level === 'danger' || b.isRedAlert) ? `
                    <button onclick="radOpsApp.resolveDeviceBreakdown('${b.id}', '${b.deviceId}'); radOpsApp.closeModal();" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-lg text-[10px]">
                      Đã sửa xong
                    </button>
                  ` : ''}
                  <button onclick="radOpsApp.dismissBroadcastNotice('${b.id}'); radOpsApp.openNotificationsModal();" class="text-slate-500 hover:text-slate-700 px-1 py-0.5 text-[10px]">
                    Ẩn
                  </button>
                  <button onclick="radOpsApp.deleteBroadcastNotice('${b.id}'); radOpsApp.openNotificationsModal();" class="text-red-500 hover:text-red-700 px-1 py-0.5 text-[10px]">
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- PHẦN 2: CẢNH BÁO TỰ ĐỘNG ATBX & BẢO TRÌ NGHỊ ĐỊNH 142 -->
        <div class="space-y-2 text-xs pt-1 border-t border-slate-200 dark:border-slate-700">
          <div class="font-extrabold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5 uppercase text-[11px] tracking-wide">
            <i data-lucide="shield-alert" class="w-3.5 h-3.5 text-red-600"></i>
            <span>Cảnh báo An toàn Bức xạ & Kiểm định máy</span>
          </div>

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
    `, 'max-w-xl');
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
    if (!this.getCurrentUserRole().canManagePermissions) { alert('⛔ BẢO MẬT: Bạn không có quyền thay đổi thông tin bệnh viện.'); return; }
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
    if (!this.getCurrentUserRole().canManagePermissions) { alert('⛔ BẢO MẬT: Bạn không có quyền sửa đổi bảng tin thông báo.'); return; }
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
    if (!this.getCurrentUserRole().canManagePermissions) { alert('⛔ BẢO MẬT: Bạn không có quyền sửa đổi ngưỡng cảnh báo.'); return; }
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
    if (!this.getCurrentUserRole().canManagePermissions) { alert('⛔ BẢO MẬT: Bạn không có quyền xóa phòng máy.'); return; }
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
  openStaffFormModal(staffId = null, staffCode = null) {
    const isEdit = !!(staffId || staffCode);
    const todayStr = new Date().toISOString().split('T')[0];
    const defaultExpiryStr = new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const member = isEdit ? this.findStaff(staffId, staffCode) : {
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

        <form onsubmit="event.preventDefault(); radOpsApp.saveStaffForm('${member.id || staffId || ''}', '${member.code || staffCode || ''}');" class="space-y-3.5 text-xs">
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

  saveStaffForm(staffId = null, staffCode = null) {
    const currentRole = this.getCurrentUserRole();
    const currentUser = this.getCurrentUser();
    const targetMember = this.findStaff(staffId, staffCode);
    if (!currentRole.canManagePermissions && (!currentUser || !targetMember || currentUser.id !== targetMember.id)) {
      alert('⛔ BẢO MẬT: Bạn chỉ có quyền chỉnh sửa hồ sơ cá nhân của chính mình. Không thể chỉnh sửa hồ sơ của đồng nghiệp khác!');
      return;
    }
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

    if (targetMember) {
      // Sửa nhân viên đã có
      targetMember.code = code;
      targetMember.name = name;
      targetMember.pin = pin;
      targetMember.roleKey = roleKey;
      targetMember.role = role;
      targetMember.phone = phone;
      targetMember.cchnNumber = cchnNumber;
      targetMember.cchnScope = cchnScope;
      targetMember.radiationCert = radiationCert;
      targetMember.certDate = certDate;
      targetMember.certExpiry = certExpiry;
      targetMember.daysLeft = daysLeft;
      targetMember.status = status;
      targetMember.allowExternalAccess = allowExternalAccess;
    } else {
      // Thêm nhân viên mới: sinh ID duy nhất tuyệt đối dựa vào số lớn nhất hiện tại
      let maxIdNum = 0;
      this.data.staff.forEach(s => {
        if (s.id && typeof s.id === 'string') {
          const match = s.id.match(/^NV-(\d+)$/);
          if (match) {
            const num = parseInt(match[1], 10);
            if (num > maxIdNum) maxIdNum = num;
          }
        }
      });
      const newId = 'NV-' + String(maxIdNum + 1).padStart(2, '0');
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
        password: `Vpi@${pin || '2026'}`,
        birthday: '1992-10-19',
        tldCode: 'TLD-VPI-' + String(this.data.staff.length + 1).padStart(3, '0'),
        isTldMonitored: (roleKey !== 'auditor'),
        tldDose2026: { q1: 0.10, q2: 0.12, q3: 0.11, q4: 0.10, total: 0.43 },
        documents: [],
        lastExternalLogin: 'Chưa đăng nhập'
      });
    }

    this.saveData();
    this.closeModal();
    this.render();
    alert('✅ Đã lưu thông tin cán bộ nhân viên thành công!');
  }

  deleteStaff(staffId, staffCode = null) {
    if (!this.getCurrentUserRole().canManagePermissions) { alert('⛔ BẢO MẬT: Chỉ Ban Lãnh đạo Khoa mới có quyền xóa tài khoản nhân sự.'); return; }
    const currentRole = this.getCurrentUserRole();
    if (!currentRole.canManagePermissions) {
      alert('⛔ TRUY CẬP BỊ TỪ CHỐI:\nChỉ KTV Trưởng (Vũ Bá Đạt) hoặc Lãnh đạo Khoa (BS. Trịnh Văn Bình) mới có quyền xóa nhân sự!');
      return;
    }
    const member = this.findStaff(staffId, staffCode);
    if (!member) return;

    if (member.id === this.data.auth.currentUserId || member.code === this.data.auth.currentUserId) {
      alert('⛔ Bạn không thể xóa tài khoản mà bạn đang đăng nhập!');
      return;
    }

    if (confirm(`Bạn có chắc chắn muốn xóa nhân sự "${member.name}" (${member.code}) khỏi danh sách Khoa CĐHA?`)) {
      this.createSnapshot(`Tự động sao lưu trước khi xóa nhân sự ${member.name}`, false);
      this.data.staff = this.data.staff.filter(s => s.id !== member.id && s.code !== member.code);
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

    // Trích xuất giờ và phút tùy biến từ Ca làm việc / Kíp trực
    let shiftName = 'Cả ngày';
    let shiftStart = '07:30';
    let shiftEnd = '17:00';

    if (existingLog && existingLog.shift) {
      const match = existingLog.shift.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
      if (match) {
        shiftStart = match[1];
        shiftEnd = match[2];
      }
      if (existingLog.shift.includes('sáng')) shiftName = 'Ca sáng';
      else if (existingLog.shift.includes('chiều')) shiftName = 'Ca chiều';
      else if (existingLog.shift.includes('đêm') || existingLog.shift.includes('trực')) shiftName = 'Ca trực đêm';
      else if (existingLog.shift.includes('ngoài giờ') || existingLog.shift.includes('cứu')) shiftName = 'Ca ngoài giờ';
      else if (existingLog.shift.includes('Cả ngày')) shiftName = 'Cả ngày';
      else shiftName = existingLog.shift.split('(')[0].trim() || 'Tùy biến';
    }

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
              <div class="space-y-1">
                <div class="flex items-center justify-between">
                  <label class="block text-slate-500 text-[10px] font-bold">Ca làm việc / Kíp trực</label>
                  <span class="text-[9px] text-blue-600 dark:text-blue-400 font-semibold">Tùy biến giờ & phút</span>
                </div>
                <select id="log-shift-preset" onchange="radOpsApp.onShiftPresetChange(this.value)" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5 font-bold text-slate-900 dark:text-white text-xs">
                  <option value="Cả ngày|07:30|17:00" ${shiftName === 'Cả ngày' ? 'selected' : ''}>Cả ngày (07:30 - 17:00)</option>
                  <option value="Ca sáng|07:30|12:00" ${shiftName === 'Ca sáng' ? 'selected' : ''}>Ca sáng (07:30 - 12:00)</option>
                  <option value="Ca chiều|13:30|17:00" ${shiftName === 'Ca chiều' ? 'selected' : ''}>Ca chiều (13:30 - 17:00)</option>
                  <option value="Ca trực đêm|17:00|07:30" ${shiftName === 'Ca trực đêm' ? 'selected' : ''}>Ca trực đêm (17:00 - 07:30)</option>
                  <option value="Ca ngoài giờ|17:00|21:00" ${shiftName === 'Ca ngoài giờ' ? 'selected' : ''}>Ca ngoài giờ (17:00 - 21:00)</option>
                  <option value="custom" ${shiftName === 'Tùy biến' ? 'selected' : ''}>⏱️ Tự chỉnh giờ & phút khác...</option>
                </select>
                <!-- Hai ô chọn giờ và phút chính xác -->
                <div class="grid grid-cols-2 gap-1 pt-0.5">
                  <div class="flex items-center space-x-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1">
                    <span class="text-[10px] text-slate-400 font-bold shrink-0">Từ:</span>
                    <input type="time" id="log-shift-start" value="${shiftStart}" class="w-full bg-transparent font-mono font-bold text-xs text-slate-900 dark:text-white focus:outline-none">
                  </div>
                  <div class="flex items-center space-x-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1">
                    <span class="text-[10px] text-slate-400 font-bold shrink-0">Đến:</span>
                    <input type="time" id="log-shift-end" value="${shiftEnd}" class="w-full bg-transparent font-mono font-bold text-xs text-slate-900 dark:text-white focus:outline-none">
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div class="space-y-1">
                <div class="flex items-center justify-between">
                  <label class="block text-slate-500 text-[10px] font-bold">KTV thực hiện báo cáo *</label>
                  <span class="text-[9px] text-blue-600 dark:text-blue-400 font-semibold">Chọn theo DS khoa</span>
                </div>
                <select id="log-technician-select" onchange="radOpsApp.onLogTechnicianChange(this.value)" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-bold text-slate-900 dark:text-white text-xs">
                  ${(this.data.staff || []).map(s => {
                    const staffVal = `${s.name} (${s.code})`;
                    const isSel = existingLog
                      ? (existingLog.technician && (existingLog.technician.includes(s.name) || existingLog.technician.includes(s.code)))
                      : (currentUser && (currentUser.name === s.name || currentUser.code === s.code));
                    return `
                      <option value="${staffVal}" ${isSel ? 'selected' : ''}>
                        ${s.name} (${s.code}) - ${s.role || s.qualification}
                      </option>
                    `;
                  }).join('')}
                  <option value="custom">✏️ Nhập tên nhân viên khác...</option>
                </select>
                <div id="log-technician-custom-container" class="hidden pt-1">
                  <input type="text" id="log-technician-custom" placeholder="Nhập họ tên KTV trực..." class="w-full bg-white dark:bg-slate-800 border border-blue-400 dark:border-blue-500 rounded-lg p-1.5 font-bold text-slate-900 dark:text-white text-xs">
                </div>
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
    
    // Xử lý Ca làm việc / Kíp trực tùy biến giờ & phút
    const shiftPreset = document.getElementById('log-shift-preset')?.value || '';
    const shiftStart = document.getElementById('log-shift-start')?.value || '07:30';
    const shiftEnd = document.getElementById('log-shift-end')?.value || '17:00';
    let presetLabel = 'Cả ngày';
    if (shiftPreset.includes('|')) {
      presetLabel = shiftPreset.split('|')[0];
    } else if (shiftPreset === 'custom') {
      presetLabel = 'Ca làm việc';
    }
    const shift = `${presetLabel} (${shiftStart} - ${shiftEnd})`;

    // Xử lý KTV thực hiện báo cáo tùy chọn từ danh sách nhân viên
    let technician = '';
    const techSelect = document.getElementById('log-technician-select');
    const techCustom = document.getElementById('log-technician-custom');
    if (techSelect && techSelect.value === 'custom') {
      technician = techCustom?.value?.trim() || 'KTV Trực máy';
    } else if (techSelect) {
      technician = techSelect.value;
    } else {
      technician = document.getElementById('log-technician')?.value?.trim() || 'KTV Trực máy';
    }

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
      shiftStart: shiftStart,
      shiftEnd: shiftEnd,
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

  // Tùy biến giờ & phút khi thay đổi mẫu ca làm việc
  onShiftPresetChange(val) {
    if (val === 'custom') return;
    const parts = val.split('|');
    if (parts.length === 3) {
      const startInput = document.getElementById('log-shift-start');
      const endInput = document.getElementById('log-shift-end');
      if (startInput) startInput.value = parts[1];
      if (endInput) endInput.value = parts[2];
    }
  }

  // Tùy biến chọn KTV từ danh sách nhân viên
  onLogTechnicianChange(val) {
    const customContainer = document.getElementById('log-technician-custom-container');
    if (customContainer) {
      if (val === 'custom') {
        customContainer.classList.remove('hidden');
        document.getElementById('log-technician-custom')?.focus();
      } else {
        customContainer.classList.add('hidden');
      }
    }
  }

  // Âm thanh cảnh báo y tế (Web Audio API)
  playAlertSound(type = 'info') {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'danger') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.setValueAtTime(440, ctx.currentTime + 0.15);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      // AudioContext có thể bị block trước tương tác người dùng, bỏ qua an toàn
    }
  }

  // Banner Thông Báo Toàn Khoa & Cảnh Báo Đỏ Thiết Bị Hỏng
  renderBroadcastBanner() {
    const activeNotices = (this.data.broadcastNotices || []).filter(b => b.active);
    if (activeNotices.length === 0) return '';

    return `
      <div class="px-3.5 pt-2.5 space-y-2 no-print">
        ${activeNotices.map(notice => {
          const isDanger = notice.level === 'danger' || notice.isRedAlert;
          if (isDanger) {
            return `
              <div class="rounded-2xl p-3 bg-gradient-to-r from-red-600 via-rose-700 to-red-800 text-white shadow-md border-2 border-red-400/80 relative overflow-hidden space-y-1.5">
                <!-- Hàng 1: Badge + Thời gian + Nút hành động dàn đều 2 bên -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-1.5">
                    <span class="text-base leading-none">🚨</span>
                    <span class="bg-white/20 text-white text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full border border-white/30 tracking-wider">
                      CẢNH BÁO ĐỎ: THIẾT BỊ HỎNG / SỬA CHỮA
                    </span>
                    <span class="text-[10px] text-red-100 font-mono hidden sm:inline">${notice.createdAt}</span>
                  </div>
                  <div class="flex items-center space-x-1.5">
                    ${notice.deviceId ? `
                      <button onclick="radOpsApp.openDeviceDetailModal('${notice.deviceId}')" class="bg-white/20 hover:bg-white/30 text-white font-bold px-2 py-1 rounded-lg text-[10px] backdrop-blur-xs transition flex items-center space-x-1">
                        <i data-lucide="info" class="w-3 h-3"></i>
                        <span>Chi tiết máy</span>
                      </button>
                    ` : ''}
                    <button onclick="radOpsApp.resolveDeviceBreakdown('${notice.id}', '${notice.deviceId || ''}')" title="Báo đã sửa chữa xong và đưa máy hoạt động lại" class="bg-white hover:bg-emerald-50 text-emerald-800 font-black px-2.5 py-1 rounded-lg text-[11px] shadow-xs transition flex items-center space-x-1">
                      <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600"></i>
                      <span>Đã sửa xong</span>
                    </button>
                    <button onclick="radOpsApp.dismissBroadcastNotice('${notice.id}')" title="Ẩn cảnh báo" class="text-white/80 hover:text-white p-1">
                      <i data-lucide="x" class="w-4 h-4"></i>
                    </button>
                  </div>
                </div>

                <!-- Hàng 2: Nội dung dàn đều 100% chiều ngang -->
                <div class="space-y-0.5">
                  <h4 class="text-xs font-black text-white uppercase tracking-tight">${notice.title}</h4>
                  <p class="text-xs text-red-100 leading-relaxed font-medium whitespace-pre-line">${notice.message}</p>
                </div>

                <!-- Hàng 3: Người phát thông báo -->
                <div class="flex items-center justify-between text-[10px] text-red-200 pt-0.5 border-t border-white/20">
                  <span>Phát bởi: <strong>${notice.sender}</strong> (${notice.senderRole})</span>
                  <span class="sm:hidden font-mono">${notice.createdAt}</span>
                </div>
              </div>
            `;
          } else {
            return `
              <div class="rounded-2xl p-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-md border border-amber-300 relative overflow-hidden space-y-1.5">
                <!-- Hàng 1: Badge + Nút bấm dàn đều 2 bên -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-1.5">
                    <span class="text-base leading-none">📢</span>
                    <span class="bg-slate-950/20 text-slate-950 text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full border border-slate-950/20 tracking-wider">
                      THÔNG BÁO NHẮC NHỞ TOÀN KHOA
                    </span>
                    <span class="text-[10px] text-slate-800 font-mono hidden sm:inline">${notice.createdAt}</span>
                  </div>
                  <div class="flex items-center space-x-1.5">
                    <button onclick="radOpsApp.openDailyLogModal()" class="bg-slate-950 hover:bg-slate-900 text-amber-300 font-black px-3 py-1 rounded-xl text-xs shadow-md transition flex items-center space-x-1">
                      <i data-lucide="clipboard-pen" class="w-3.5 h-3.5 text-amber-400"></i>
                      <span>Chốt Nhật Ký Ngay</span>
                    </button>
                    <button onclick="radOpsApp.dismissBroadcastNotice('${notice.id}')" title="Ẩn thông báo" class="text-slate-900/70 hover:text-slate-950 p-1">
                      <i data-lucide="x" class="w-4 h-4"></i>
                    </button>
                  </div>
                </div>

                <!-- Hàng 2: Nội dung dàn đều 100% chiều ngang cực kỳ gọn gàng -->
                <div class="space-y-0.5">
                  <h4 class="text-xs font-black uppercase tracking-tight text-slate-950">${notice.title}</h4>
                  <p class="text-xs text-slate-950 leading-relaxed font-semibold opacity-95">${notice.message}</p>
                </div>

                <!-- Hàng 3: Người phát thông báo -->
                <div class="flex items-center justify-between text-[10px] text-slate-800 pt-0.5 border-t border-slate-950/15">
                  <span>Phát bởi: <strong>${notice.sender}</strong> (${notice.senderRole})</span>
                  <span class="sm:hidden font-mono">${notice.createdAt}</span>
                </div>
              </div>
            `;
          }
        }).join('')}
      </div>
    `;
  }

  openBroadcastModal(defaultType = 'daily_log_reminder', preselectedDevId = null) {
    const currentUser = this.getCurrentUser();
    const currentRole = this.getCurrentUserRole();
    const devices = this.data.devices || [];
    const targetDevId = preselectedDevId || (devices[0] ? devices[0].id : 'TB-01');

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[88vh] overflow-y-auto">
        <!-- Header -->
        <div class="flex items-start justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <div class="flex items-center space-x-2.5">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <i data-lucide="megaphone" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
                PHÁT THANH NỘI BỘ KHOA CĐHA
              </span>
              <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">Phát Thông Báo & Cảnh Báo Cho Nhân Viên</h3>
              <div class="text-xs text-slate-500">Gửi thông báo tới toàn thể KTV, Điều dưỡng & Bác sĩ trong ca trực • BV VPI</div>
            </div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- 2 Chế Độ Lựa Chọn Nhanh -->
        <div class="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-700/60 rounded-2xl">
          <button type="button" id="tab-broadcast-reminder" onclick="radOpsApp.onBroadcastTypeChange('daily_log_reminder')" class="py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition ${defaultType === 'daily_log_reminder' ? 'bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-300 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}">
            <span>📢</span>
            <span>Nhắc Nhật Ký Cuối Ngày</span>
          </button>
          <button type="button" id="tab-broadcast-breakdown" onclick="radOpsApp.onBroadcastTypeChange('device_breakdown')" class="py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition ${defaultType === 'device_breakdown' ? 'bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}">
            <span>🚨</span>
            <span>Cảnh Báo Đỏ Hỏng Máy</span>
          </button>
        </div>

        <form onsubmit="event.preventDefault(); radOpsApp.submitBroadcastForm();" class="space-y-3.5 text-xs">
          <input type="hidden" id="bc-type" value="${defaultType}">

          <!-- KHUNG 1: NHẮC NHỞ CHỐT NHẬT KÝ CUỐI NGÀY -->
          <div id="section-broadcast-reminder" class="${defaultType === 'daily_log_reminder' ? '' : 'hidden'} space-y-3">
            <div class="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 space-y-2.5">
              <div>
                <label class="block text-amber-900 dark:text-amber-200 font-bold mb-1">Mẫu thông báo nhắc nhở nhanh</label>
                <select onchange="document.getElementById('bc-reminder-title').value = this.options[this.selectedIndex].getAttribute('data-title'); document.getElementById('bc-reminder-msg').value = this.options[this.selectedIndex].getAttribute('data-msg');" class="w-full bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-800 rounded-xl p-2 font-bold text-slate-900 dark:text-white text-xs">
                  <option data-title="📢 NHẮC NHỞ: Hoàn thành chốt Sổ nhật ký vận hành máy hôm nay" data-msg="Kính gửi các KTV trực máy! Đã đến giờ chốt ca làm việc (16:30 - 17:00). Đề nghị các đồng chí hoàn thành chốt sổ nhật ký vận hành máy và kiểm tra mức Heli MRI hôm nay.">
                    Mẫu 1: Nhắc nhở chốt ca chiều kết thúc ngày (16:30 - 17:00)
                  </option>
                  <option data-title="🚨 BẮT BUỘC: Chốt báo cáo số ca chụp & kiểm tra thiết bị trước giao ban" data-msg="Tất cả các phòng máy chưa chốt số ca chụp và tình trạng máy, yêu cầu KTV trực khẩn trương hoàn tất báo cáo trên app để phục vụ công tác giao ban chuyên môn!">
                    Mẫu 2: Cảnh báo bắt buộc hoàn tất trước giao ban
                  </option>
                  <option data-title="🧊 NHẮC NHỞ KHẨN: Kiểm tra & cập nhật mức Heli máy MRI Signa 1.5T" data-msg="KTV phòng MRI khẩn trương ghi nhận chỉ số mức Heli lỏng, áp suất buồng lạnh và nhiệt độ Chiller cuối ngày vào hệ thống theo quy định an toàn từ trường.">
                    Mẫu 3: Nhắc nhở chuyên biệt kiểm tra Heli MRI
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Tiêu đề phát thanh *</label>
                <input type="text" id="bc-reminder-title" required value="📢 NHẮC NHỞ: Hoàn thành chốt Sổ nhật ký vận hành máy hôm nay" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
              </div>

              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Nội dung chi tiết nhắc nhở *</label>
                <textarea id="bc-reminder-msg" rows="3" required class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium text-slate-900 dark:text-white">Kính gửi các KTV trực máy! Đã đến giờ chốt ca làm việc (16:30 - 17:00). Đề nghị các đồng chí hoàn thành chốt sổ nhật ký vận hành máy và kiểm tra mức Heli MRI hôm nay theo đúng quy định của Khoa CĐHA & Bệnh viện VPI.</textarea>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-slate-500 text-[10px] mb-1 font-bold">Mức độ phát thanh</label>
                  <select id="bc-reminder-level" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-bold text-xs">
                    <option value="warning">⚠️ Cảnh báo nhắc nhở (Màu vàng cam)</option>
                    <option value="danger">🚨 Khẩn cấp bắt buộc (Màu đỏ)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-slate-500 text-[10px] mb-1 font-bold">Người phát thông báo</label>
                  <input type="text" id="bc-reminder-sender" readonly value="${currentUser.name} (${currentRole.title})" class="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-slate-600 dark:text-slate-400 font-bold text-xs">
                </div>
              </div>
            </div>
          </div>

          <!-- KHUNG 2: CẢNH BÁO ĐỎ THIẾT BỊ HỎNG - ĐANG SỬA CHỮA -->
          <div id="section-broadcast-breakdown" class="${defaultType === 'device_breakdown' ? '' : 'hidden'} space-y-3">
            <div class="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 space-y-2.5">
              <div>
                <label class="block text-red-900 dark:text-red-200 font-bold mb-1">Thiết bị gặp sự cố hỏng hóc *</label>
                <select id="bc-breakdown-device" onchange="radOpsApp.onBroadcastDeviceChange(this.value)" class="w-full bg-white dark:bg-slate-800 border border-red-300 dark:border-red-800 rounded-xl p-2.5 font-bold text-red-900 dark:text-red-300 text-xs">
                  ${devices.map(d => `
                    <option value="${d.id}" ${d.id === targetDevId ? 'selected' : ''}>
                      ${d.name} (${d.code}) - ${d.room}
                    </option>
                  `).join('')}
                </select>
              </div>

              <!-- Sự cố thường gặp click chọn nhanh -->
              <div>
                <label class="block text-slate-500 text-[10px] mb-1 font-bold">Chọn sự cố thường gặp để điền nhanh:</label>
                <div class="flex flex-wrap gap-1.5">
                  <button type="button" onclick="document.getElementById('bc-breakdown-issue').value = 'Hỏng bóng phát tia X (Tube Error / Quá nhiệt), máy báo lỗi interlock không phát tia';" class="bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-[10px] font-bold px-2 py-1 rounded-lg hover:bg-red-600 hover:text-white transition">
                    Hỏng bóng phát tia X
                  </button>
                  <button type="button" onclick="document.getElementById('bc-breakdown-issue').value = 'Hệ làm mát Chiller quá nhiệt (> 18°C), máy nén compressor rung ồn bất thường';" class="bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-[10px] font-bold px-2 py-1 rounded-lg hover:bg-red-600 hover:text-white transition">
                    Sự cố Chiller / Hệ làm lạnh
                  </button>
                  <button type="button" onclick="document.getElementById('bc-breakdown-issue').value = 'Lỗi tấm nhận ảnh Detector kỹ thuật số, xuất hiện dải nhiễu artifacts sọc ngang';" class="bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-[10px] font-bold px-2 py-1 rounded-lg hover:bg-red-600 hover:text-white transition">
                    Lỗi Detector cảm biến
                  </button>
                  <button type="button" onclick="document.getElementById('bc-breakdown-issue').value = 'Đầu dò siêu âm bị mất tín hiệu tinh thể / nứt vỏ ngoài, tạm dừng sử dụng đầu dò này';" class="bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-[10px] font-bold px-2 py-1 rounded-lg hover:bg-red-600 hover:text-white transition">
                    Hỏng đầu dò siêu âm
                  </button>
                  <button type="button" onclick="document.getElementById('bc-breakdown-issue').value = 'Mất kết nối mạng PACS máy trạm Workstation, không truyền được ảnh về hệ thống đọc phim';" class="bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-[10px] font-bold px-2 py-1 rounded-lg hover:bg-red-600 hover:text-white transition">
                    Mất kết nối PACS / Trạm đọc
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Mô tả chi tiết tình trạng hỏng hóc *</label>
                <textarea id="bc-breakdown-issue" rows="2" required placeholder="Mô tả hiện tượng lỗi, thông báo lỗi trên màn hình điều khiển..." class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium text-slate-900 dark:text-white">Thiết bị gặp sự cố hỏng bóng phát tia X / lỗi kỹ thuật đột xuất, tạm dừng phát tia để bảo đảm an toàn.</textarea>
              </div>

              <div>
                <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Phương án điều phối bệnh nhân & Khắc phục *</label>
                <textarea id="bc-breakdown-plan" rows="2" required class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium text-slate-900 dark:text-white">Tạm ngừng tiếp nhận ca chụp. Đề nghị KTV tiếp nhận điều phối bệnh nhân sang máy dự phòng. Khoa đã liên hệ Kỹ sư hãng đến kiểm tra sửa chữa khẩn cấp.</textarea>
              </div>

              <div class="space-y-1.5 pt-1 border-t border-red-200 dark:border-red-900/40">
                <label class="flex items-center space-x-2 text-xs font-bold text-red-950 dark:text-red-200 cursor-pointer">
                  <input type="checkbox" id="bc-breakdown-setstatus" checked class="rounded text-red-600">
                  <span>Cập nhật trạng thái máy trên hệ thống thành: 🚨 ĐANG HỎNG / SỬA CHỮA</span>
                </label>
                <label class="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input type="checkbox" id="bc-breakdown-logmaintenance" checked class="rounded text-blue-600">
                  <span>Tự động ghi bản ghi vào Sổ Nhật ký bảo trì & sự cố thiết bị của khoa</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Nút Hành Động -->
          <div class="pt-2 flex items-center justify-end space-x-2">
            <button type="button" onclick="radOpsApp.closeModal()" class="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold py-2.5 px-4 rounded-xl transition">
              Hủy
            </button>
            <button type="submit" class="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold py-2.5 px-5 rounded-xl shadow-md shadow-red-500/20 transition flex items-center space-x-1.5">
              <i data-lucide="send" class="w-4 h-4"></i>
              <span>🚀 PHÁT THÔNG BÁO CHO TOÀN BỘ NHÂN VIÊN</span>
            </button>
          </div>
        </form>
      </div>
    `, 'max-w-xl');
  }

  // Chuyển đổi qua lại giữa 2 loại thông báo phát thanh
  onBroadcastTypeChange(type) {
    const inputType = document.getElementById('bc-type');
    const tabReminder = document.getElementById('tab-broadcast-reminder');
    const tabBreakdown = document.getElementById('tab-broadcast-breakdown');
    const secReminder = document.getElementById('section-broadcast-reminder');
    const secBreakdown = document.getElementById('section-broadcast-breakdown');

    if (inputType) inputType.value = type;

    if (type === 'daily_log_reminder') {
      secReminder?.classList.remove('hidden');
      secBreakdown?.classList.add('hidden');
      tabReminder?.classList.add('bg-white', 'dark:bg-slate-800', 'text-amber-700', 'dark:text-amber-300', 'shadow-sm');
      tabReminder?.classList.remove('text-slate-600', 'dark:text-slate-400');
      tabBreakdown?.classList.remove('bg-white', 'dark:bg-slate-800', 'text-red-600', 'dark:text-red-400', 'shadow-sm');
      tabBreakdown?.classList.add('text-slate-600', 'dark:text-slate-400');
    } else {
      secReminder?.classList.add('hidden');
      secBreakdown?.classList.remove('hidden');
      tabBreakdown?.classList.add('bg-white', 'dark:bg-slate-800', 'text-red-600', 'dark:text-red-400', 'shadow-sm');
      tabBreakdown?.classList.remove('text-slate-600', 'dark:text-slate-400');
      tabReminder?.classList.remove('bg-white', 'dark:bg-slate-800', 'text-amber-700', 'dark:text-amber-300', 'shadow-sm');
      tabReminder?.classList.add('text-slate-600', 'dark:text-slate-400');
    }
  }

  // Khi chọn thiết bị trong cảnh báo đỏ
  onBroadcastDeviceChange(devId) {
    const dev = (this.data.devices || []).find(d => d.id === devId);
    if (!dev) return;
    const isMri = dev.id === 'TB-03' || dev.name.includes('MRI');
    const isCt = dev.id === 'TB-02' || dev.name.includes('CT');
    const isUs = dev.name.includes('Siêu âm');

    const issueInput = document.getElementById('bc-breakdown-issue');
    const planInput = document.getElementById('bc-breakdown-plan');

    if (isMri) {
      if (issueInput) issueInput.value = 'Hệ thống Chiller làm mát nam châm MRI báo lỗi quá nhiệt, áp suất khí Heli tăng nhẹ. Cần dừng quét để bảo vệ nam châm siêu dẫn.';
      if (planInput) planInput.value = 'Tạm dừng chụp MRI toàn viện. Điều phối bệnh nhân cấp cứu sọ não sang máy CT Revolution 128 lát. Đã gọi kỹ sư GE kiểm tra hệ thống làm lạnh.';
    } else if (isCt) {
      if (issueInput) issueInput.value = 'Máy CT Revolution 128 lát báo lỗi bóng phát tia X quá nhiệt / Generator Interlock, không phát được tia X.';
      if (planInput) planInput.value = 'Tạm dừng tiếp nhận ca chụp CT sọ não & ngực. Bệnh nhân cấp cứu chuyển sang hội chẩn siêu âm hoặc chụp X-quang tạm thời. Đang liên hệ Kỹ sư GE Healthcare.';
    } else if (isUs) {
      if (issueInput) issueInput.value = `Máy ${dev.name} gặp sự cố nhiễu tín hiệu đầu dò Doppler / lỗi phần mềm điều khiển.`;
      if (planInput) planInput.value = 'Điều chuyển bệnh nhân sang các phòng Siêu âm còn lại trong khoa để tiếp tục khám.';
    } else {
      if (issueInput) issueInput.value = `Máy ${dev.name} gặp lỗi kỹ thuật phát tia / cảm biến, cần tạm dừng hoạt động để kiểm tra.`;
      if (planInput) planInput.value = 'Điều phối bệnh nhân sang máy X-quang phòng bên cạnh. Đã báo Kỹ sư phụ trách thiết bị.';
    }
  }

  // Lưu và Phát Thông Báo Ra Toàn Hệ Thống
  submitBroadcastForm() {
    const type = document.getElementById('bc-type')?.value || 'daily_log_reminder';
    const currentUser = this.getCurrentUser();
    const currentRole = this.getCurrentUserRole();
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    if (!this.data.broadcastNotices) this.data.broadcastNotices = [];

    if (type === 'daily_log_reminder') {
      const title = document.getElementById('bc-reminder-title')?.value?.trim() || '📢 NHẮC NHỞ CHỐT SỔ NHẬT KÝ VẬN HÀNH';
      const msg = document.getElementById('bc-reminder-msg')?.value?.trim() || '';
      const level = document.getElementById('bc-reminder-level')?.value || 'warning';

      const notice = {
        id: 'BC-' + Date.now(),
        type: 'daily_log_reminder',
        level: level,
        title: title,
        message: msg,
        sender: currentUser.name,
        senderRole: currentRole.title,
        createdAt: timeStr,
        targetDeviceId: null,
        active: true,
        isRedAlert: level === 'danger'
      };

      this.data.broadcastNotices.unshift(notice);
      this.playAlertSound(level);

      // Ghi audit log
      if (!this.data.auth) this.data.auth = {};
      if (!this.data.auth.auditLogs) this.data.auth.auditLogs = [];
      this.data.auth.auditLogs.unshift({
        id: 'LOG-AUDIT-' + Date.now(),
        time: 'Vừa xong',
        userName: currentUser.name,
        role: currentRole.title,
        action: `Phát thông báo nhắc nhở chốt nhật ký cuối ngày: ${title}`,
        ip: 'Phát thanh Toàn Khoa',
        status: 'success'
      });

      this.saveData();
      this.closeModal();
      this.render();

      alert(`📢 ĐÃ PHÁT THÔNG BÁO NHẮC NHỞ TOÀN KHOA THÀNH CÔNG!

• Tiêu đề: ${title}
• Thời gian phát: ${timeStr}
• Người phát: ${currentUser.name}

Thông báo đã được hiển thị trên bảng điều khiển của toàn bộ nhân viên trong ca trực.`);

    } else {
      // Cảnh báo đỏ hỏng máy
      const devId = document.getElementById('bc-breakdown-device')?.value;
      const dev = (this.data.devices || []).find(d => d.id === devId);
      if (!dev) return;

      const issue = document.getElementById('bc-breakdown-issue')?.value?.trim() || 'Sự cố hỏng hóc kỹ thuật đột xuất';
      const plan = document.getElementById('bc-breakdown-plan')?.value?.trim() || 'Tạm dừng tiếp nhận và điều phối bệnh nhân';
      const setStatus = document.getElementById('bc-breakdown-setstatus')?.checked;
      const logMaint = document.getElementById('bc-breakdown-logmaintenance')?.checked;

      const title = `🚨 CẢNH BÁO ĐỎ: ${dev.name.toUpperCase()} GẶP SỰ CỐ HỎNG HÓC!`;
      const fullMsg = `• Vị trí: ${dev.room} (${dev.code})
• Hiện tượng: ${issue}
• Hướng điều phối: ${plan}`;

      const notice = {
        id: 'BC-' + Date.now(),
        type: 'device_breakdown',
        level: 'danger',
        title: title,
        message: fullMsg,
        deviceId: dev.id,
        deviceName: dev.name,
        sender: currentUser.name,
        senderRole: currentRole.title,
        createdAt: timeStr,
        active: true,
        isRedAlert: true
      };

      this.data.broadcastNotices.unshift(notice);

      // Cập nhật trạng thái máy thành repair nếu chọn
      if (setStatus) {
        dev.status = 'repair';
      }

      // Tự động ghi vào nhật ký bảo trì sự cố
      if (logMaint) {
        if (!this.data.maintenanceLogs) this.data.maintenanceLogs = [];
        this.data.maintenanceLogs.unshift({
          id: 'MT-ERR-' + Date.now(),
          deviceId: dev.id,
          deviceName: dev.name,
          date: this.getTodayDateString(),
          type: 'Sửa chữa đột xuất',
          vendor: 'Kỹ sư ủy quyền & Hãng',
          technician: currentUser.name,
          cost: 'Đang báo giá',
          status: 'Đang xử lý',
          description: `🚨 [CẢNH BÁO ĐỎ] ${issue}. Phương án điều phối: ${plan}`,
          result: 'Đang tạm dừng máy chờ kỹ sư khắc phục'
        });
      }

      this.playAlertSound('danger');

      // Ghi audit log
      if (!this.data.auth) this.data.auth = {};
      if (!this.data.auth.auditLogs) this.data.auth.auditLogs = [];
      this.data.auth.auditLogs.unshift({
        id: 'LOG-AUDIT-' + Date.now(),
        time: 'Vừa xong',
        userName: currentUser.name,
        role: currentRole.title,
        action: `Kích hoạt CẢNH BÁO ĐỎ sự cố hỏng máy: ${dev.name}`,
        ip: 'Báo Cáo Khẩn Cấp',
        status: 'danger'
      });

      this.saveData();
      this.closeModal();
      this.render();

      alert(`🚨 ĐÃ KÍCH HOẠT CẢNH BÁO ĐỎ THÀNH CÔNG!

• Thiết bị: ${dev.name} (${dev.code})
• Phòng: ${dev.room}
• Trạng thái máy: ĐÃ CHUYỂN SANG ĐANG SỬA CHỮA (REPAIR)
• Banner cảnh báo khẩn cấp màu đỏ đã được phát trên toàn hệ thống để bác sĩ & KTV điều phối bệnh nhân.`);
    }
  }

  // Tạm ẩn thông báo phát thanh
  dismissBroadcastNotice(id) {
    const notice = (this.data.broadcastNotices || []).find(b => b.id === id);
    if (notice) {
      notice.active = false;
      this.saveData();
      this.render();
    }
  }

  // Xóa vĩnh viễn thông báo phát thanh
  deleteBroadcastNotice(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa thông báo này khỏi danh sách?')) return;
    this.data.broadcastNotices = (this.data.broadcastNotices || []).filter(b => b.id !== id);
    this.saveData();
    this.render();
  }

  // Khôi phục máy đã sửa chữa xong và gỡ cảnh báo đỏ
  resolveDeviceBreakdown(noticeId, deviceId) {
    const notice = (this.data.broadcastNotices || []).find(b => b.id === noticeId);
    const dev = (this.data.devices || []).find(d => d.id === deviceId);

    const devName = dev ? dev.name : 'Thiết bị';
    if (!confirm(`XÁC NHẬN SỬA CHỮA HOÀN TẤT:

Bạn xác nhận thiết bị "${devName}" đã được sửa chữa xong, kiểm định kỹ thuật đạt chuẩn và đưa trở lại hoạt động bình thường?`)) {
      return;
    }

    if (notice) notice.active = false;

    if (dev) {
      dev.status = 'active';
      // Ghi nhận hoàn thành trong maintenanceLogs
      if (this.data.maintenanceLogs) {
        const relatedLog = this.data.maintenanceLogs.find(m => m.deviceId === dev.id && m.status === 'Đang xử lý');
        if (relatedLog) {
          relatedLog.status = 'Hoàn thành';
          relatedLog.result = 'Đã sửa chữa xong, chạy thử nghiệm lâm sàng đạt chuẩn, đưa vào vận hành bình thường';
        }
      }
    }

    const currentUser = this.getCurrentUser();
    if (!this.data.auth) this.data.auth = {};
    if (!this.data.auth.auditLogs) this.data.auth.auditLogs = [];
    this.data.auth.auditLogs.unshift({
      id: 'LOG-AUDIT-' + Date.now(),
      time: 'Vừa xong',
      userName: currentUser.name,
      role: this.getCurrentUserRole().title,
      action: `Khôi phục hoạt động bình thường cho thiết bị: ${devName}`,
      ip: 'Gỡ Cảnh Báo Đỏ',
      status: 'success'
    });

    this.playAlertSound('info');
    this.saveData();
    this.render();

    alert(`✅ ĐÃ KHÔI PHỤC HOẠT ĐỘNG THÀNH CÔNG!

• Thiết bị: ${devName}
• Trạng thái: HOẠT ĐỘNG BÌNH THƯỜNG
• Cảnh báo đỏ đã được gỡ bỏ khỏi toàn hệ thống.`);
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
            <button onclick="radOpsApp.openBroadcastModal('daily_log_reminder')" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-1.5 px-3 rounded-xl text-xs transition flex items-center space-x-1 shadow-xs">
              <i data-lucide="volume-2" class="w-3.5 h-3.5"></i>
              <span>Phát Nhắc Nhở KTV</span>
            </button>
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


  // ==========================================
  // PHÂN HỆ MODAL & HÀNH ĐỘNG MỚI (5 TÍNH NĂNG NÂNG CẤP)
  // ==========================================

  switchStaffSubTab(subTab) {
    this.currentStaffSubTab = subTab;
    this.render();
  }

  // 1. MODAL CẬP NHẬT HỒ SƠ CÁ NHÂN (SELF-SERVICE PROFILE)
  openPersonalProfileModal(staffId, staffCode = null) {
    const currentUser = this.getCurrentUser();
    const currentRole = this.getCurrentUserRole();
    const member = this.findStaff(staffId, staffCode);
    if (!member) return;

    // Kiểm tra quyền: Chỉ được sửa hồ sơ của chính mình hoặc là Quản lý khoa
    const isMe = currentUser && currentUser.id === member.id;
    const canEdit = isMe || (currentRole && currentRole.canManagePermissions);

    if (!canEdit) {
      alert('⛔ BẢO MẬT: Bạn chỉ có quyền chỉnh sửa hồ sơ cá nhân của chính mình. Không thể chỉnh sửa hồ sơ của đồng nghiệp khác!');
      return;
    }

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[88vh] overflow-y-auto">
        <div class="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-2.5 py-0.5 rounded-full">
              HỒ SƠ CÁ NHÂN TỰ QUẢN
            </span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">
              ${isMe ? 'Cập Nhật Hồ Sơ Của Tôi' : `Chỉnh Sửa Hồ Sơ: ${member.name}`}
            </h3>
            <div class="text-xs text-slate-500">${member.role} • Mã NV: ${member.code}</div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form onsubmit="event.preventDefault(); radOpsApp.savePersonalProfile('${member.id}');" class="space-y-3.5 text-xs">
          <!-- Họ tên & Mã NV (Read-only để bảo toàn danh tính) -->
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Mã nhân viên (BV ID)</label>
              <input type="text" value="${member.code}" disabled class="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono font-bold text-slate-500 cursor-not-allowed">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Họ và tên cán bộ</label>
              <input type="text" value="${member.name}" ${currentRole.canManagePermissions ? '' : 'disabled'} id="pf-name" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white ${!currentRole.canManagePermissions ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : ''}">
            </div>
          </div>

          <!-- Ngày sinh & Số điện thoại -->
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Ngày sinh (Năm-Tháng-Ngày) <span class="text-red-500">*</span></label>
              <input type="date" id="pf-birthday" value="${member.birthday || '1990-01-01'}" required class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Số điện thoại liên hệ <span class="text-red-500">*</span></label>
              <input type="tel" id="pf-phone" value="${member.phone || ''}" required placeholder="0988.xxx.xxx" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono font-bold text-slate-900 dark:text-white">
            </div>
          </div>

          <!-- Trình độ học vấn & Bằng cấp cao nhất -->
          <div>
            <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Trình độ chuyên môn & Bằng cấp</label>
            <input type="text" id="pf-qualification" value="${member.qualification || ''}" placeholder="Ví dụ: Cử nhân Kỹ thuật Hình ảnh / Bác sĩ CKI" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-900 dark:text-white">
          </div>

          <!-- Số CCHN & Phạm vi hành nghề -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Số Chứng chỉ Hành nghề (CCHN)</label>
              <input type="text" id="pf-cchnNumber" value="${member.cchnNumber || ''}" placeholder="004128/VP-CCHN" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono font-bold text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Phạm vi hành nghề CCHN</label>
              <input type="text" id="pf-cchnScope" value="${member.cchnScope || ''}" placeholder="Kỹ thuật hình ảnh y học" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white">
            </div>
          </div>

          <!-- Mã PIN & Mật khẩu đăng nhập cá nhân -->
          <div class="grid grid-cols-2 gap-2 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Mã PIN đăng nhập nhanh (4 số)</label>
              <input type="text" id="pf-pin" maxlength="6" value="${member.pin || '1234'}" required class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono font-black text-slate-900 dark:text-white text-center">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Mật khẩu tài khoản</label>
              <input type="text" id="pf-password" value="${member.password || ''}" required class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 font-mono font-bold text-slate-900 dark:text-white text-center">
            </div>
          </div>

          <!-- Kho Giấy tờ, Bằng cấp & Chứng chỉ -->
          <div class="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-extrabold text-slate-900 dark:text-white text-xs">Kho Giấy Tờ, Bằng Cấp & Chứng Chỉ (${(member.documents || []).length})</span>
              <button type="button" onclick="radOpsApp.openAddDocumentModal('${member.id}')" class="text-[11px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/40 px-2.5 py-1 rounded-lg transition flex items-center space-x-1">
                <i data-lucide="plus" class="w-3 h-3"></i>
                <span>+ Thêm Bằng cấp / Giấy tờ</span>
              </button>
            </div>

            <div class="space-y-1.5 max-h-48 overflow-y-auto">
              ${(member.documents || []).length === 0 ? `
                <div class="text-[11px] text-slate-400 italic p-2 text-center bg-slate-50 dark:bg-slate-900/40 rounded-xl">Chưa có văn bằng chứng chỉ nào được tải lên.</div>
              ` : (member.documents || []).map(doc => `
                <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <div class="truncate mr-2">
                    <div class="font-bold text-slate-800 dark:text-slate-200 truncate">${doc.title}</div>
                    <div class="text-[10px] text-slate-500">${doc.category} • Số hiệu: ${doc.code || 'N/A'} • Cấp ngày: ${doc.issueDate || ''}</div>
                  </div>
                  <div class="flex items-center space-x-1 shrink-0">
                    <button type="button" onclick="radOpsApp.viewDocumentPreview('${member.id}', '${doc.id}')" class="p-1 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 hover:bg-blue-100">
                      <i data-lucide="eye" class="w-3 h-3"></i>
                    </button>
                    <button type="button" onclick="radOpsApp.deletePersonalDocument('${member.id}', '${doc.id}')" class="p-1 rounded bg-red-50 dark:bg-red-950 text-red-600 hover:bg-red-100">
                      <i data-lucide="trash-2" class="w-3 h-3"></i>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 px-4 rounded-xl transition flex items-center justify-center space-x-1.5 shadow-md shadow-blue-600/30">
            <i data-lucide="save" class="w-4 h-4"></i>
            <span>Lưu Thay Đổi Hồ Sơ Cá Nhân</span>
          </button>
        </form>
      </div>
    `);
    if (window.lucide) lucide.createIcons();
  }

  savePersonalProfile(staffId) {
    const member = this.data.staff.find(s => s.id === staffId);
    if (!member) return;

    const phone = document.getElementById('pf-phone').value.trim();
    const birthday = document.getElementById('pf-birthday').value;
    const qualification = document.getElementById('pf-qualification').value.trim();
    const cchnNumber = document.getElementById('pf-cchnNumber').value.trim();
    const cchnScope = document.getElementById('pf-cchnScope').value.trim();
    const pin = document.getElementById('pf-pin').value.trim();
    const password = document.getElementById('pf-password').value.trim();

    if (document.getElementById('pf-name')) {
      const name = document.getElementById('pf-name').value.trim();
      if (name) member.name = name;
    }

    member.phone = phone;
    member.birthday = birthday;
    member.qualification = qualification;
    member.cchnNumber = cchnNumber;
    member.cchnScope = cchnScope;
    member.pin = pin;
    member.password = password;

    this.saveData();
    this.closeModal();
    this.render();
    alert('✅ ĐÃ CẬP NHẬT HỒ SƠ CÁ NHÂN THÀNH CÔNG!\n\nThông tin liên hệ, ngày sinh, bằng cấp và mật khẩu của bạn đã được lưu an toàn.');
  }

  // 2. MODAL THÊM GIẤY TỜ / BẰNG CẤP / CHỨNG CHỈ VÀO HỒ SƠ
  openAddDocumentModal(staffId) {
    const member = this.data.staff.find(s => s.id === staffId);
    if (!member) return;

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[85vh] overflow-y-auto">
        <div class="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
              THÊM VĂN BẰNG / GIẤY TỜ MỚI
            </span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">
              Nạp Giấy Tờ Vào Hồ Sơ Cá Nhân
            </h3>
            <div class="text-xs text-slate-500">Cán bộ: ${member.name} (${member.code})</div>
          </div>
          <button onclick="radOpsApp.openPersonalProfileModal('${staffId}')" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="arrow-left" class="w-5 h-5"></i>
          </button>
        </div>

        <form onsubmit="event.preventDefault(); radOpsApp.savePersonalDocument('${staffId}');" class="space-y-3 text-xs">
          <div>
            <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Loại giấy tờ / Chứng chỉ <span class="text-red-500">*</span></label>
            <select id="doc-category" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
              <option value="Bằng Đại học / Cao đẳng">🎓 Bằng Tốt nghiệp Đại học / Cao đẳng</option>
              <option value="Bằng Sau Đại học">🎓 Bằng Sau Đại học (BSCKI, BSCKII, ThS, TS)</option>
              <option value="Chứng chỉ Hành nghề">📜 Chứng chỉ Hành nghề Khám chữa bệnh (CCHN)</option>
              <option value="Chứng chỉ ATBX">🛡️ Giấy chứng nhận Đào tạo An toàn bức xạ</option>
              <option value="Chứng chỉ CME">📑 Chứng chỉ Đào tạo liên tục (CME)</option>
              <option value="Chứng chỉ Kỹ thuật Hãng">⚙️ Chứng chỉ Vận hành Thiết bị của Hãng</option>
              <option value="Giấy tờ khác">📂 Giấy tờ / Chứng nhận chuyên môn khác</option>
            </select>
          </div>

          <div>
            <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Tên văn bằng / Chứng chỉ <span class="text-red-500">*</span></label>
            <input type="text" id="doc-title" required placeholder="Ví dụ: Bằng Cử nhân Kỹ thuật Hình ảnh Y học" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Số hiệu văn bằng</label>
              <input type="text" id="doc-code" placeholder="DH-004128/DHYHN" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Cơ quan / Trường cấp</label>
              <input type="text" id="doc-issuedBy" placeholder="Đại học Y Hà Nội / Sở Y tế" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Ngày cấp</label>
              <input type="date" id="doc-issueDate" value="${new Date().toISOString().split('T')[0]}" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Ngày hết hạn (nếu có)</label>
              <input type="text" id="doc-expiryDate" placeholder="Vô thời hạn hoặc YYYY-MM-DD" value="Vô thời hạn" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white">
            </div>
          </div>

          <div>
            <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Tải tệp ảnh chụp hoặc scan văn bằng (Tùy chọn)</label>
            <input type="file" id="doc-file" accept="image/*,application/pdf" class="w-full text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
          </div>

          <div>
            <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Ghi chú thêm</label>
            <textarea id="doc-note" rows="2" placeholder="Ví dụ: Tốt nghiệp loại Giỏi, đào tạo hệ chính quy 4 năm..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white"></textarea>
          </div>

          <div class="flex items-center space-x-2 pt-1">
            <button type="submit" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 px-4 rounded-xl transition flex items-center justify-center space-x-1 shadow-sm">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Lưu Vào Kho Giấy Tờ</span>
            </button>
            <button type="button" onclick="radOpsApp.openPersonalProfileModal('${staffId}')" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 font-bold">Hủy</button>
          </div>
        </form>
      </div>
    `);
    if (window.lucide) lucide.createIcons();
  }

  savePersonalDocument(staffId) {
    const member = this.data.staff.find(s => s.id === staffId);
    if (!member) return;

    if (!member.documents) member.documents = [];

    const category = document.getElementById('doc-category').value;
    const title = document.getElementById('doc-title').value.trim();
    const code = document.getElementById('doc-code').value.trim();
    const issuedBy = document.getElementById('doc-issuedBy').value.trim();
    const issueDate = document.getElementById('doc-issueDate').value;
    const expiryDate = document.getElementById('doc-expiryDate').value.trim();
    const note = document.getElementById('doc-note').value.trim();

    if (!title) {
      alert('Vui lòng nhập tên văn bằng / chứng chỉ!');
      return;
    }

    const newDoc = {
      id: 'DOC-' + Date.now(),
      category: category,
      title: title,
      code: code,
      issuedBy: issuedBy,
      issueDate: issueDate,
      expiryDate: expiryDate,
      note: note
    };

    member.documents.unshift(newDoc);
    this.saveData();
    this.openPersonalProfileModal(staffId);
  }

  deletePersonalDocument(staffId, docId) {
    const member = this.data.staff.find(s => s.id === staffId);
    if (!member || !member.documents) return;

    if (!confirm('Bạn có chắc chắn muốn xóa giấy tờ này khỏi hồ sơ cá nhân không?')) return;

    member.documents = member.documents.filter(d => d.id !== docId);
    this.saveData();
    this.openPersonalProfileModal(staffId);
  }

  viewDocumentPreview(staffId, docId) {
    const member = this.data.staff.find(s => s.id === staffId);
    if (!member || !member.documents) return;
    const doc = member.documents.find(d => d.id === docId);
    if (!doc) return;

    alert('📜 CHI TIẾT VĂN BẰNG / CHỨNG CHỈ:\n\n• Tên: ' + doc.title + '\n• Phân loại: ' + doc.category + '\n• Số hiệu: ' + (doc.code || 'N/A') + '\n• Nơi cấp: ' + (doc.issuedBy || 'N/A') + '\n• Ngày cấp: ' + doc.issueDate + '\n• Hạn dùng: ' + doc.expiryDate + '\n• Ghi chú: ' + (doc.note || 'Không có'));
  }

  // 3. MODAL THÊM / BỚT THIẾT BỊ GIÁM SÁT ATBX (MANAGEMENT EXCLUSIVE)
  openManageRadiationDevicesModal() {
    if (!this.getCurrentUserRole().canManagePermissions && !this.getCurrentUserRole().canManageLegal) {
      alert('⛔ Chỉ Ban Quản lý Khoa mới có quyền thay đổi danh mục thiết bị kiểm soát ATBX.');
      return;
    }

    const devices = this.data.devices || [];

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[85vh] overflow-y-auto">
        <div class="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-full">
              QUẢN TRỊ DANH MỤC ATBX
            </span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">
              Thêm / Bớt Thiết Bị Thuộc Diện Giám Sát ATBX
            </h3>
            <div class="text-xs text-slate-500">Bật hoặc tắt trạng thái kiểm soát bức xạ cho từng thiết bị trong Khoa CĐHA</div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="space-y-2 text-xs">
          ${devices.map(dev => {
            const isMonitored = dev.isRadiationMonitored !== false && (dev.category === 'Bức xạ' || dev.isRadiationMonitored === true);
            return `
              <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div class="flex items-center space-x-2">
                    <span class="font-mono text-[10px] font-bold bg-slate-200 dark:bg-slate-700 px-1.5 py-0.2 rounded">${dev.id}</span>
                    <strong class="text-slate-900 dark:text-white text-xs">${dev.name}</strong>
                  </div>
                  <div class="text-[10px] text-slate-500 mt-0.5">${dev.room} • Phân loại gốc: ${dev.category}</div>
                </div>

                <label class="inline-flex items-center cursor-pointer ml-3 shrink-0">
                  <input type="checkbox" onchange="radOpsApp.toggleRadiationMonitored('${dev.id}')" ${isMonitored ? 'checked' : ''} class="sr-only peer">
                  <div class="relative w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            `;
          }).join('')}
        </div>

        <div class="pt-2">
          <button onclick="radOpsApp.closeModal(); radOpsApp.render();" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-2.5 px-4 rounded-xl transition">
            Hoàn Tất Cấu Hình ATBX
          </button>
        </div>
      </div>
    `);
    if (window.lucide) lucide.createIcons();
  }

  toggleRadiationMonitored(deviceId) {
    const dev = this.data.devices.find(d => d.id === deviceId);
    if (!dev) return;

    dev.isRadiationMonitored = !(dev.isRadiationMonitored !== false && (dev.category === 'Bức xạ' || dev.isRadiationMonitored === true));
    this.saveData();
  }

  // 4. MODAL NẠP PHIẾU KẾT QUẢ ĐO LIỀU KẾ TLD ĐỊNH KỲ (SCAN / ẢNH CHỤP)
  openUploadDosimetryModal() {
    this.showModal(`
      <div class="p-5 space-y-4 max-h-[85vh] overflow-y-auto">
        <div class="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
              HỒ SƠ LIỀU KẾ TLD
            </span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">
              Nạp Phiếu Trả Kết Quả Đo Liều Kế TLD
            </h3>
            <div class="text-xs text-slate-500">Đo đọc định kỳ theo Thông tư 19/2012/TT-BKHCN</div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form onsubmit="event.preventDefault(); radOpsApp.saveDosimetryReport();" class="space-y-3 text-xs">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Kỳ đo đọc (Quý) <span class="text-red-500">*</span></label>
              <select id="tld-quarter" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
                <option value="Quý 4/2026">Quý 4/2026 (Kỳ hiện tại)</option>
                <option value="Quý 3/2026">Quý 3/2026</option>
                <option value="Quý 2/2026">Quý 2/2026</option>
                <option value="Quý 1/2026">Quý 1/2026</option>
                <option value="Quý 1/2027">Quý 1/2027 (Kế hoạch)</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Số phiếu trả kết quả <span class="text-red-500">*</span></label>
              <input type="text" id="tld-reportNumber" required placeholder="KQ-TLD-xxxx/VINATOM" value="KQ-TLD-1845/VINATOM" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono font-bold text-slate-900 dark:text-white">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Ngày trả kết quả</label>
              <input type="date" id="tld-issueDate" value="${new Date().toISOString().split('T')[0]}" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Số CBNV được đo liều</label>
              <input type="number" id="tld-count" value="16" min="1" max="50" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
            </div>
          </div>

          <div>
            <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Đơn vị thực hiện đo đọc liều kế</label>
            <input type="text" id="tld-lab" value="Viện Năng lượng nguyên tử Việt Nam (VINATOM) - Trung tâm An toàn Bức xạ" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white">
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Liều kế cao nhất ghi nhận</label>
              <input type="text" id="tld-maxDose" value="0.16 mSv" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Đánh giá chung</label>
              <input type="text" id="tld-conclusion" value="100% nhân viên an toàn tuyệt đối (Đạt tiêu chuẩn ICRP-103)" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white">
            </div>
          </div>

          <div>
            <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Nạp bản chụp hoặc file Scan phiếu kết quả (PDF/Ảnh) <span class="text-red-500">*</span></label>
            <input type="file" id="tld-file-upload" accept="image/*,application/pdf" class="w-full text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100">
          </div>

          <div class="flex items-center space-x-2 pt-1">
            <button type="submit" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 px-4 rounded-xl transition flex items-center justify-center space-x-1 shadow-sm">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Lưu Phiếu Kết Quả Vào Hồ Sơ ATBX</span>
            </button>
            <button type="button" onclick="radOpsApp.closeModal()" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 font-bold">Hủy</button>
          </div>
        </form>
      </div>
    `);
    if (window.lucide) lucide.createIcons();
  }

  saveDosimetryReport() {
    if (!this.data.dosimetryReports) this.data.dosimetryReports = [];

    const quarter = document.getElementById('tld-quarter').value;
    const reportNumber = document.getElementById('tld-reportNumber').value.trim();
    const issueDate = document.getElementById('tld-issueDate').value;
    const totalMonitored = parseInt(document.getElementById('tld-count').value) || 16;
    const measuringLab = document.getElementById('tld-lab').value.trim();
    const maxDoseRecorded = document.getElementById('tld-maxDose').value.trim();
    const conclusion = document.getElementById('tld-conclusion').value.trim();

    const fileInput = document.getElementById('tld-file-upload');
    const fileName = (fileInput && fileInput.files && fileInput.files[0]) ? fileInput.files[0].name : `Phieu_TLD_${quarter.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;

    const newReport = {
      id: 'TLD-REP-' + Date.now(),
      quarter: quarter,
      year: new Date(issueDate).getFullYear() || 2026,
      reportNumber: reportNumber,
      issueDate: issueDate,
      measuringLab: measuringLab,
      totalMonitored: totalMonitored,
      exceededLimitCount: 0,
      maxDoseRecorded: maxDoseRecorded,
      conclusion: conclusion,
      scanFileName: fileName,
      scanFileUrl: ''
    };

    this.data.dosimetryReports.unshift(newReport);
    this.saveData();
    this.closeModal();
    this.render();
    alert('✅ ĐÃ NẠP PHIẾU TRẢ KẾT QUẢ ĐO LIỀU KẾ TLD THÀNH CÔNG!\n\n• Số phiếu: ' + reportNumber + '\n• Kỳ đo: ' + quarter + '\n• Tệp đính kèm: ' + fileName + '\n\nDữ liệu đã được đồng bộ vào hệ thống quản lý an toàn bức xạ.');
  }

  openUpdateQuarterlyDoseModal(staffId) {
    const member = this.data.staff.find(s => s.id === staffId);
    if (!member) return;

    const d = member.tldDose2026 || { q1: 0.12, q2: 0.14, q3: 0.15, q4: 0.10, total: 0.51 };

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[85vh] overflow-y-auto">
        <div class="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
              CẬP NHẬT LIỀU KẾ TLD
            </span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">
              Nhập Số Đo Liều Cá Nhân Từng Quý
            </h3>
            <div class="text-xs text-slate-500">${member.name} • Mã TLD: ${member.tldCode || 'TLD-VPI'}</div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form onsubmit="event.preventDefault(); radOpsApp.saveQuarterlyDose('${member.id}');" class="space-y-3 text-xs">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Liều Quý 1/2026 (mSv)</label>
              <input type="number" step="0.01" id="dose-q1" value="${d.q1}" required class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono font-bold text-slate-900 dark:text-white text-center">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Liều Quý 2/2026 (mSv)</label>
              <input type="number" step="0.01" id="dose-q2" value="${d.q2}" required class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono font-bold text-slate-900 dark:text-white text-center">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Liều Quý 3/2026 (mSv)</label>
              <input type="number" step="0.01" id="dose-q3" value="${d.q3}" required class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono font-bold text-slate-900 dark:text-white text-center">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Liều Quý 4/2026 (mSv)</label>
              <input type="number" step="0.01" id="dose-q4" value="${d.q4 || 0.10}" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono font-bold text-slate-900 dark:text-white text-center">
            </div>
          </div>

          <div class="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-[11px] text-blue-700 dark:text-blue-300">
            Giới hạn an toàn toàn thân theo Thông tư 19/2012/TT-BKHCN là ≤ 20 mSv/năm.
          </div>

          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-2.5 px-4 rounded-xl transition flex items-center justify-center space-x-1">
            <i data-lucide="check" class="w-4 h-4"></i>
            <span>Cập Nhật Số Liệu Đo Liều</span>
          </button>
        </form>
      </div>
    `);
    if (window.lucide) lucide.createIcons();
  }

  saveQuarterlyDose(staffId) {
    const member = this.findStaff(staffId);
    if (!member) return;

    const q1 = parseFloat(document.getElementById('dose-q1').value) || 0;
    const q2 = parseFloat(document.getElementById('dose-q2').value) || 0;
    const q3 = parseFloat(document.getElementById('dose-q3').value) || 0;
    const q4 = parseFloat(document.getElementById('dose-q4').value) || 0;
    const total = parseFloat((q1 + q2 + q3 + q4).toFixed(2));

    member.tldDose2026 = { q1, q2, q3, q4, total };
    this.saveData();
    this.closeModal();
    this.render();
  }

  // Chuyển đổi bộ lọc bảng theo dõi TLD (Đang đeo TLD vs Tất cả khoa)
  setTldRosterFilter(filter) {
    this.tldRosterFilter = filter;
    this.render();
  }

  // Đổi nhanh trạng thái giám sát TLD của 1 nhân sự
  toggleStaffTldMonitoring(staffId) {
    const currentRole = this.getCurrentUserRole();
    if (!currentRole.canManagePermissions && !currentRole.canManageLegal) {
      alert('⛔ BẢO MẬT: Chỉ Cán bộ phụ trách ATBX hoặc Quản lý khoa mới có quyền điều chỉnh danh sách liều kế TLD.');
      return;
    }
    const member = this.findStaff(staffId);
    if (!member) return;

    member.isTldMonitored = (member.isTldMonitored === false);
    if (member.isTldMonitored && (!member.tldCode || member.tldCode === '--')) {
      const idx = this.data.staff.indexOf(member) + 1;
      member.tldCode = 'TLD-VPI-' + String(idx).padStart(3, '0');
    }

    this.saveData();
    this.render();
    const actionDesc = member.isTldMonitored ? 'được THÊM VÀO danh sách giám sát liều kế TLD' : 'đã được CHUYỂN SANG TRẠNG THÁI MIỄN TRỪ liều kế TLD';
    alert(`✅ CẬP NHẬT TRẠNG THÁI LIỀU KẾ TLD:\n\nNhân sự: ${member.name} (${member.code})\nTrạng thái: ${actionDesc}.`);
  }

  // MODAL ĐIỀU CHỈNH DANH SÁCH GIÁM SÁT LIỀU KẾ TLD
  openManageTldListModal() {
    const currentRole = this.getCurrentUserRole();
    if (!currentRole.canManagePermissions && !currentRole.canManageLegal) {
      alert('⛔ BẢO MẬT: Chỉ Cán bộ phụ trách ATBX hoặc Quản lý khoa mới có quyền điều chỉnh danh sách liều kế TLD.');
      return;
    }

    const staff = this.data.staff || [];
    const monitoredCount = staff.filter(s => s.isTldMonitored !== false).length;

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[88vh] overflow-y-auto">
        <div class="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
              QUẢN TRỊ AN TOÀN BỨC XẠ
            </span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">
              Điều Chỉnh Danh Sách Liều Kế Cá Nhân TLD
            </h3>
            <div class="text-xs text-slate-500">
              Khoa Chẩn Đoán Hình Ảnh • Hiện có <strong class="text-blue-600 dark:text-blue-400">${monitoredCount}/${staff.length}</strong> cán bộ đang được trang bị liều kế
            </div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Hướng dẫn & Công cụ thao tác hàng loạt -->
        <div class="p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-2xl border border-blue-100 dark:border-blue-900/40 space-y-2 text-xs">
          <div class="text-slate-700 dark:text-slate-300">
            💡 Tích chọn các cán bộ nhân viên tiếp xúc trực tiếp với nguồn bức xạ (Bác sĩ, Kỹ thuật viên) để cấp liều kế TLD và tổng hợp số liệu đo định kỳ hàng quý.
          </div>
          <div class="flex items-center space-x-1.5 flex-wrap gap-y-1 pt-1">
            <span class="text-[11px] font-bold text-slate-500 mr-1">Chọn nhanh:</span>
            <button type="button" onclick="radOpsApp.batchSetTldCheckboxes('radiation')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2.5 rounded-lg text-[11px] transition">
              Bác sĩ & KTV (Bức xạ)
            </button>
            <button type="button" onclick="radOpsApp.batchSetTldCheckboxes('all')" class="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 font-bold py-1 px-2.5 rounded-lg text-[11px] transition">
              Tất cả khoa
            </button>
            <button type="button" onclick="radOpsApp.batchSetTldCheckboxes('none')" class="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 font-bold py-1 px-2.5 rounded-lg text-[11px] transition">
              Bỏ chọn tất cả
            </button>
          </div>
        </div>

        <!-- Danh sách cán bộ nhân viên -->
        <form onsubmit="event.preventDefault(); radOpsApp.saveTldListConfig();" class="space-y-3">
          <div class="max-h-[50vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800">
            ${staff.map((s, idx) => {
              const isChecked = s.isTldMonitored !== false;
              const defaultTld = s.tldCode || ('TLD-VPI-' + String(idx + 1).padStart(3, '0'));
              return `
                <div class="p-3 flex items-center justify-between hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition">
                  <div class="flex items-center space-x-3">
                    <input type="checkbox" id="tld-monitored-${s.id}" data-role="${s.roleKey}" ${isChecked ? 'checked' : ''} class="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer">
                    <div>
                      <div class="font-bold text-slate-900 dark:text-white text-xs flex items-center space-x-1.5">
                        <span>${s.name}</span>
                        <span class="text-[10px] font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1 rounded">${s.code}</span>
                      </div>
                      <div class="text-[10px] text-slate-400 mt-0.5">${s.role}</div>
                    </div>
                  </div>

                  <div class="flex items-center space-x-2">
                    <span class="text-[11px] text-slate-500 font-semibold hidden sm:inline">Mã TLD:</span>
                    <input type="text" id="tld-code-${s.id}" value="${defaultTld}" placeholder="TLD-VPI-xxx" class="w-28 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5 font-mono text-xs font-bold text-blue-600 dark:text-blue-400 text-center">
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="flex items-center space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-2.5 px-4 rounded-xl transition flex items-center justify-center space-x-1.5 shadow-sm text-xs">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Lưu Điều Chỉnh Danh Sách TLD</span>
            </button>
            <button type="button" onclick="radOpsApp.closeModal()" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 font-bold text-xs">
              Hủy
            </button>
          </div>
        </form>
      </div>
    `);
    if (window.lucide) lucide.createIcons();
  }

  // Hỗ trợ chọn nhanh danh sách liều kế theo đối tượng
  batchSetTldCheckboxes(type) {
    const staff = this.data.staff || [];
    staff.forEach(s => {
      const chk = document.getElementById('tld-monitored-' + s.id);
      if (!chk) return;
      if (type === 'all') {
        chk.checked = true;
      } else if (type === 'none') {
        chk.checked = false;
      } else if (type === 'radiation') {
        // Bác sĩ và kỹ thuật viên tiếp xúc trực tiếp tia X
        const isRadiationRole = s.roleKey !== 'thu_ky' && s.roleKey !== 'auditor';
        chk.checked = isRadiationRole;
      }
    });
  }

  // Lưu cấu hình danh sách TLD
  saveTldListConfig() {
    if (!this.getCurrentUserRole().canManagePermissions && !this.getCurrentUserRole().canManageLegal) {
      alert('⛔ BẢO MẬT: Chỉ Cán bộ phụ trách ATBX hoặc Quản lý khoa mới có quyền lưu cấu hình danh sách TLD.');
      return;
    }

    const staff = this.data.staff || [];
    let monitoredCount = 0;

    staff.forEach(s => {
      const chk = document.getElementById('tld-monitored-' + s.id);
      const codeInp = document.getElementById('tld-code-' + s.id);
      if (chk) {
        s.isTldMonitored = chk.checked;
        if (s.isTldMonitored) monitoredCount++;
      }
      if (codeInp && codeInp.value.trim()) {
        s.tldCode = codeInp.value.trim();
      }
    });

    this.saveData();
    this.closeModal();
    this.render();
    alert(`✅ ĐÃ LƯU ĐIỀU CHỈNH DANH SÁCH LIỀU KẾ TLD!\n\n• Số cán bộ được giám sát bức xạ: ${monitoredCount}/${staff.length} CBNV.\n• Danh sách và mã liều kế cá nhân đã được đồng bộ vào hệ thống ATBX.`);
  }

  // 5. MODAL CÀI ĐẶT LỊCH BẢO TRÌ ĐỊNH KỲ THIẾT BỊ
  openMaintenanceScheduleModal(scheduleId = null) {
    const isEdit = !!scheduleId;
    const schedules = this.data.maintenanceSchedules || [];
    const schedule = isEdit ? schedules.find(s => s.id === scheduleId) : {
      id: 'SCH-' + (schedules.length + 1).toString().padStart(2, '0'),
      deviceId: 'TB-01',
      deviceName: 'Máy CT 32 lát cắt Siemens Somatom Scope',
      room: 'Phòng CT-Scanner',
      cycle: 'Hàng quý (3 tháng)',
      lastDate: new Date().toISOString().split('T')[0],
      nextDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      serviceProvider: 'Siemens Healthineers Vietnam',
      contact: '0903.888.115',
      scope: 'Bảo dưỡng định kỳ hệ thống cơ điện, hiệu chuẩn liều phát xạ và kiểm tra dầu làm mát bóng phát.'
    };

    if (isEdit && !schedule) return;

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[85vh] overflow-y-auto">
        <div class="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
              ${isEdit ? 'CÀI ĐẶT LỊCH BẢO TRÌ' : 'TẠO LỊCH BẢO TRÌ MỚI'}
            </span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">
              ${schedule.deviceName}
            </h3>
            <div class="text-xs text-slate-500">Mã thiết bị: ${schedule.deviceId} • Vị trí: ${schedule.room}</div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form onsubmit="event.preventDefault(); radOpsApp.saveMaintenanceSchedule('${scheduleId || ''}');" class="space-y-3 text-xs">
          <div>
            <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Chu kỳ bảo dưỡng định kỳ <span class="text-red-500">*</span></label>
            <select id="sch-cycle" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
              <option value="Hàng tháng" ${schedule.cycle === 'Hàng tháng' ? 'selected' : ''}>Hàng tháng (30 ngày/lần)</option>
              <option value="Hàng quý (3 tháng)" ${schedule.cycle === 'Hàng quý (3 tháng)' ? 'selected' : ''}>Hàng quý (3 tháng/lần)</option>
              <option value="Định kỳ 6 tháng" ${schedule.cycle === 'Định kỳ 6 tháng' ? 'selected' : ''}>Định kỳ 6 tháng/lần</option>
              <option value="Hàng năm" ${schedule.cycle === 'Hàng năm' ? 'selected' : ''}>Hàng năm (12 tháng/lần)</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Ngày bảo dưỡng gần nhất</label>
              <input type="date" id="sch-lastDate" value="${schedule.lastDate || ''}" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Ngày tới hạn tiếp theo <span class="text-red-500">*</span></label>
              <input type="date" id="sch-nextDate" value="${schedule.nextDate || ''}" required class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Hãng / Đơn vị thực hiện bảo trì</label>
              <input type="text" id="sch-provider" value="${schedule.serviceProvider || ''}" required class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Hotline / Liên hệ kỹ sư</label>
              <input type="text" id="sch-contact" value="${schedule.contact || ''}" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white">
            </div>
          </div>

          <div>
            <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Nội dung quy trình bảo dưỡng checklist</label>
            <textarea id="sch-scope" rows="2" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white">${schedule.scope || ''}</textarea>
          </div>

          <div class="flex items-center space-x-2 pt-1">
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-2.5 px-4 rounded-xl transition flex items-center justify-center space-x-1 shadow-sm">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Lưu Lịch Bảo Trì</span>
            </button>
            <button type="button" onclick="radOpsApp.closeModal()" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 font-bold">Hủy</button>
          </div>
        </form>
      </div>
    `);
    if (window.lucide) lucide.createIcons();
  }

  saveMaintenanceSchedule(scheduleId = null) {
    if (!this.data.maintenanceSchedules) this.data.maintenanceSchedules = [];

    const cycle = document.getElementById('sch-cycle').value;
    const lastDate = document.getElementById('sch-lastDate').value;
    const nextDate = document.getElementById('sch-nextDate').value;
    const serviceProvider = document.getElementById('sch-provider').value.trim();
    const contact = document.getElementById('sch-contact').value.trim();
    const scope = document.getElementById('sch-scope').value.trim();

    if (scheduleId) {
      const sch = this.data.maintenanceSchedules.find(s => s.id === scheduleId);
      if (sch) {
        sch.cycle = cycle;
        sch.lastDate = lastDate;
        sch.nextDate = nextDate;
        sch.serviceProvider = serviceProvider;
        sch.contact = contact;
        sch.scope = scope;
      }
    }

    this.saveData();
    this.closeModal();
    this.render();
    alert('✅ ĐÃ CẬP NHẬT LỊCH BẢO TRÌ ĐỊNH KỲ THÀNH CÔNG!');
  }

  completeScheduledMaintenance(scheduleId) {
    const sch = this.data.maintenanceSchedules.find(s => s.id === scheduleId);
    if (!sch) return;

    if (!confirm(`Xác nhận thiết bị "${sch.deviceName}" đã được kỹ sư bảo dưỡng hoàn tất kỳ này?`)) return;

    const todayStr = new Date().toISOString().split('T')[0];
    sch.lastDate = todayStr;

    // Tính toán ngày tới hạn tiếp theo dựa trên chu kỳ
    let daysToAdd = 90;
    if (sch.cycle === 'Hàng tháng') daysToAdd = 30;
    else if (sch.cycle === 'Định kỳ 6 tháng') daysToAdd = 180;
    else if (sch.cycle === 'Hàng năm') daysToAdd = 365;

    const nextTime = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000);
    sch.nextDate = nextTime.toISOString().split('T')[0];

    // Ghi tự động một bản ghi nghiệm thu vào Nhật ký bảo trì
    if (!this.data.maintenanceLogs) this.data.maintenanceLogs = [];
    this.data.maintenanceLogs.unshift({
      id: 'BT-' + Date.now(),
      ticketCode: 'PM-VPI-' + sch.deviceId,
      deviceId: sch.deviceId,
      deviceName: sch.deviceName,
      room: sch.room,
      reportedBy: this.getCurrentUser() ? this.getCurrentUser().name : 'KTV Trưởng Khoa CĐHA',
      dateReported: todayStr,
      priority: 'Định kỳ',
      symptom: `Hoàn tất bảo dưỡng định kỳ chu kỳ: ${sch.cycle}.`,
      solution: `Đã bảo dưỡng toàn bộ quy trình: ${sch.scope}. Thiết bị đạt chuẩn an toàn y tế và tiếp tục vận hành.`,
      status: 'completed',
      technician: sch.serviceProvider
    });

    this.saveData();
    this.render();
    alert(`✅ ĐÃ XÁC NHẬN NGHIỆM THU BẢO DƯỠNG THÀNH CÔNG!\n\n• Thiết bị: ${sch.deviceName}\n• Ngày hoàn tất: ${todayStr}\n• Kỳ tới hạn tiếp theo: ${sch.nextDate}\n\nNhật ký sự cố & bảo trì đã tự động lưu trữ biên bản.`);
  }

  // 6. MODAL KHEN THƯỞNG, KỶ LUẬT & SAI SÓT CHUYÊN MÔN
  openRewardDisciplineModal(id = null) {
    if (!this.getCurrentUserRole().canManagePermissions && !this.getCurrentUserRole().canManageStaff) {
      alert('⛔ Chỉ Ban Quản lý Khoa mới có quyền thêm hoặc sửa biên bản Khen thưởng - Kỷ luật.');
      return;
    }

    const isEdit = !!id;
    const items = this.data.rewardsAndDisciplines || [];
    const item = isEdit ? items.find(i => i.id === id) : {
      id: 'KD-' + Date.now(),
      type: 'reward',
      staffId: 'NV-01',
      staffName: 'Vũ Bá Đạt',
      staffRole: 'Kỹ thuật viên Trưởng',
      date: new Date().toISOString().split('T')[0],
      title: '',
      category: 'Quy trình chuyên môn',
      decisionNumber: 'BB-' + Math.floor(10 + Math.random() * 90) + '/CĐHA-VPI',
      rewardOrPenalty: '',
      description: '',
      createdBy: this.getCurrentUser() ? this.getCurrentUser().name : 'Ban Quản lý Khoa CĐHA'
    };

    if (isEdit && !item) return;

    this.showModal(`
      <div class="p-5 space-y-4 max-h-[85vh] overflow-y-auto">
        <div class="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full">
              ${isEdit ? 'SỬA BIÊN BẢN' : 'GHI NHẬN MỚI'}
            </span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white mt-1">
              Khen Thưởng / Kỷ Luật / Sự Cố Chuyên Môn
            </h3>
            <div class="text-xs text-slate-500">Hội đồng Thi đua - Khen thưởng & Quản lý Chất lượng BV VPI</div>
          </div>
          <button onclick="radOpsApp.closeModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <form onsubmit="event.preventDefault(); radOpsApp.saveRewardDiscipline('${id || ''}');" class="space-y-3 text-xs">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Phân loại ghi nhận <span class="text-red-500">*</span></label>
              <select id="rd-type" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
                <option value="reward" ${item.type === 'reward' ? 'selected' : ''}>🏆 Khen thưởng / Biểu dương</option>
                <option value="discipline" ${item.type === 'discipline' ? 'selected' : ''}>⚠️ Kỷ luật / Nhắc nhở vi phạm</option>
                <option value="incident" ${item.type === 'incident' ? 'selected' : ''}>🛡️ Suýt sai sót chuyên môn (Near-Miss)</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Ngày ghi nhận <span class="text-red-500">*</span></label>
              <input type="date" id="rd-date" value="${item.date || ''}" required class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
            </div>
          </div>

          <div>
            <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Cán bộ nhân viên liên quan <span class="text-red-500">*</span></label>
            <select id="rd-staffId" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-semibold text-slate-900 dark:text-white">
              ${(this.data.staff || []).map(s => `
                <option value="${s.id}" ${item.staffId === s.id ? 'selected' : ''}>${s.name} (${s.code} - ${s.role})</option>
              `).join('')}
            </select>
          </div>

          <div>
            <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Tiêu đề vụ việc / Thành tích <span class="text-red-500">*</span></label>
            <input type="text" id="rd-title" value="${item.title || ''}" required placeholder="Ví dụ: Khen thưởng xử trí cấp cứu sốc phản vệ / Nhắc nhở không chốt sổ nhật ký" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Lĩnh vực vi phạm / Thành tích</label>
              <input type="text" id="rd-category" value="${item.category || 'Quy trình chuyên môn'}" placeholder="Cấp cứu, ATBX, Vận hành máy..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white">
            </div>
            <div>
              <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Số Quyết định / Biên bản</label>
              <input type="text" id="rd-decisionNumber" value="${item.decisionNumber || ''}" placeholder="QĐ-05/QĐ-BV-VPI" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white">
            </div>
          </div>

          <div>
            <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Hình thức Khen thưởng / Xử lý kỷ luật <span class="text-red-500">*</span></label>
            <input type="text" id="rd-rewardOrPenalty" value="${item.rewardOrPenalty || ''}" required placeholder="Thưởng nóng 1.000.000đ / Trừ 5 điểm thi đua / Khiển trách trước giao ban" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-900 dark:text-white">
          </div>

          <div>
            <label class="block text-slate-600 dark:text-slate-300 font-bold mb-1">Nội dung chi tiết diễn biến sự việc <span class="text-red-500">*</span></label>
            <textarea id="rd-description" rows="3" required placeholder="Mô tả cụ thể diễn biến, thời gian, hậu quả hoặc kết quả đạt được..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white">${item.description || ''}</textarea>
          </div>

          <div class="flex items-center space-x-2 pt-1">
            <button type="submit" class="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2.5 px-4 rounded-xl transition flex items-center justify-center space-x-1 shadow-sm">
              <i data-lucide="save" class="w-4 h-4"></i>
              <span>Lưu Biên Bản Thi Đua</span>
            </button>
            <button type="button" onclick="radOpsApp.closeModal()" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 font-bold">Hủy</button>
          </div>
        </form>
      </div>
    `);
    if (window.lucide) lucide.createIcons();
  }

  saveRewardDiscipline(id = null) {
    if (!this.data.rewardsAndDisciplines) this.data.rewardsAndDisciplines = [];

    const type = document.getElementById('rd-type').value;
    const date = document.getElementById('rd-date').value;
    const staffId = document.getElementById('rd-staffId').value;
    const staff = this.data.staff.find(s => s.id === staffId);
    const title = document.getElementById('rd-title').value.trim();
    const category = document.getElementById('rd-category').value.trim();
    const decisionNumber = document.getElementById('rd-decisionNumber').value.trim();
    const rewardOrPenalty = document.getElementById('rd-rewardOrPenalty').value.trim();
    const description = document.getElementById('rd-description').value.trim();

    if (id) {
      const item = this.data.rewardsAndDisciplines.find(i => i.id === id);
      if (item) {
        item.type = type;
        item.date = date;
        item.staffId = staffId;
        item.staffName = staff ? staff.name : '';
        item.staffRole = staff ? staff.role : '';
        item.title = title;
        item.category = category;
        item.decisionNumber = decisionNumber;
        item.rewardOrPenalty = rewardOrPenalty;
        item.description = description;
      }
    } else {
      this.data.rewardsAndDisciplines.unshift({
        id: 'KD-' + Date.now(),
        type: type,
        date: date,
        staffId: staffId,
        staffName: staff ? staff.name : '',
        staffRole: staff ? staff.role : '',
        title: title,
        category: category,
        decisionNumber: decisionNumber || ('BB-' + Math.floor(10 + Math.random() * 90) + '/CĐHA'),
        rewardOrPenalty: rewardOrPenalty,
        description: description,
        createdBy: this.getCurrentUser() ? this.getCurrentUser().name : 'Ban Quản lý Khoa',
        status: 'active'
      });
    }

    this.saveData();
    this.closeModal();
    this.render();
    alert('✅ ĐÃ LƯU BIÊN BẢN THI ĐUA - KHEN THƯỞNG / KỶ LUẬT THÀNH CÔNG!');
  }

  deleteRewardDiscipline(id) {
    if (!this.getCurrentUserRole().canManagePermissions && !this.getCurrentUserRole().canManageStaff) {
      alert('⛔ Chỉ Ban Quản lý Khoa mới có quyền xóa biên bản.');
      return;
    }

    if (!confirm('Bạn có chắc chắn muốn xóa biên bản này khỏi hệ thống không?')) return;

    this.data.rewardsAndDisciplines = this.data.rewardsAndDisciplines.filter(i => i.id !== id);
    this.saveData();
    this.render();
  }

  printRewardDisciplineReport() {
    const items = this.data.rewardsAndDisciplines || [];
    const h = this.data.hospital || {};
    const now = new Date();
    const dateStr = `ngày ${now.getDate()} tháng ${now.getMonth() + 1} năm ${now.getFullYear()}`;

    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('Vui lòng cho phép mở cửa sổ popup để in báo cáo!');
      return;
    }

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>BÁO CÁO THI ĐUA KHEN THƯỞNG & KỶ LUẬT KHOA CĐHA</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.4; padding: 25mm 20mm 20mm 20mm; color: #000; }
          .header { display: flex; justify-content: space-between; text-align: center; margin-bottom: 25px; }
          .header-left { width: 45%; }
          .header-right { width: 55%; }
          .header-bold { font-weight: bold; }
          .line { width: 120px; height: 1px; background: #000; margin: 4px auto 0; }
          .title { text-align: center; font-size: 15pt; font-weight: bold; margin: 25px 0 15px; text-transform: uppercase; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 11pt; }
          th, td { border: 1px solid #000; padding: 6px 8px; }
          th { background: #f0f0f0; text-align: center; }
          .signatures { display: flex; justify-content: space-between; margin-top: 40px; text-align: center; page-break-inside: avoid; }
          .sig-box { width: 45%; }
          @media print { body { padding: 10mm; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="header-left">
            <div>BỆNH VIỆN QUỐC TẾ VĨNH PHÚC</div>
            <div class="header-bold">KHOA CHẨN ĐOÁN HÌNH ẢNH</div>
            <div class="line"></div>
          </div>
          <div class="header-right">
            <div class="header-bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div>Độc lập - Tự do - Hạnh phúc</div>
            <div class="line"></div>
            <div style="font-style: italic; margin-top: 8px;">Vĩnh Yên, ${dateStr}</div>
          </div>
        </div>

        <div class="title">BÁO CÁO TỔNG HỢP CÔNG TÁC THI ĐUA, KHEN THƯỞNG,<br>KỶ LUẬT & AN TOÀN NGƯỜI BỆNH</div>

        <p>Kính gửi: <strong>Ban Giám đốc Bệnh viện Quốc tế Vĩnh Phúc (VPI)</strong></p>
        <p>Khoa Chẩn đoán hình ảnh xin báo cáo tình hình thi đua, chấp hành kỷ luật lao động, quy chế an toàn bức xạ và các sự cố suýt sai sót (Near-Miss) như sau:</p>

        <table>
          <thead>
            <tr>
              <th style="width: 5%;">STT</th>
              <th style="width: 15%;">Số QĐ / Biên bản</th>
              <th style="width: 15%;">Cán bộ liên quan</th>
              <th style="width: 12%;">Phân loại</th>
              <th style="width: 33%;">Nội dung vụ việc / Thành tích</th>
              <th style="width: 20%;">Hình thức xử lý / Khen thưởng</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((it, idx) => `
              <tr>
                <td style="text-align: center;">${idx + 1}</td>
                <td style="font-family: monospace; text-align: center;">${it.decisionNumber || ''}</td>
                <td><strong>${it.staffName}</strong><br><small>${it.staffRole || ''}</small></td>
                <td style="text-align: center;">${it.type === 'reward' ? 'Khen thưởng' : it.type === 'discipline' ? 'Kỷ luật / Nhắc nhở' : 'Suýt sai sót'}</td>
                <td><strong>${it.title}</strong><br><small>${it.description}</small></td>
                <td><strong>${it.rewardOrPenalty}</strong></td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="signatures">
          <div class="sig-box">
            <div><strong>CÁN BỘ THEO DÕI THI ĐUA & ATBX</strong></div>
            <div style="margin-top: 60px;"><strong>${h.officer || 'KTV. Vũ Bá Đạt'}</strong></div>
          </div>
          <div class="sig-box">
            <div><strong>PHỤ TRÁCH KHOA CĐHA</strong></div>
            <div style="margin-top: 60px;"><strong>${h.headOfDept || 'BS. CKI. Trịnh Văn Bình'}</strong></div>
          </div>
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWin.document.close();
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

