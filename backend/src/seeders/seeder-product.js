'use strict';
// up du lieu john len db

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [{

      producttype: 'Bàn học',
      describe: 'Khung sắt phun sơn tĩnh điện chống gĩ, mặt bàn gỗ cao cấp',
      price:'3200000',
      discount:'2790000',
      dimension:'X',
      // kich thuoc
      warranty:'Bảo hành 12 tháng',
      color:'Tự chọn màu',
      createdAt: new Date(),
      updatedAt: new Date(),
      
      nameproduct:'Bàn Học Đa Năng - BLV156',
      imagesdetails:'../src/images/BanHoc/BLV156.png',
    },
    {

      producttype: 'Bàn học',
      describe: 'Bàn gỗ CN thương hiệu An Cường, Mộc Phát,Mộc Hoàng Gia cao cấp',
      price:'4500000',
      discount:'2990000',
      dimension:'X',
      // kich thuoc
      warranty:'Bảo hành 12 tháng',
      color:'Tự chọn màu',
      createdAt: new Date(),
      updatedAt: new Date(),
      
      nameproduct:'Bàn Học Cho Bé Kèm Kệ Sách - BLV146',
      imagesdetails:'../src/images/BanHoc/BLV146.png',
      images: '',
    },
    {

      producttype: 'Bàn học',
      describe: 'Khung Gỗ CN phủ melamine cao cấp thương hiệu An Cường, Mộc Phát, Mộc Hoàng Gia',
      price:'5000000',
      discount:'3490000',
      dimension:'X',
      // kich thuoc
      warranty:'Bảo hành 12 tháng',
      color:'Tự chọn màu',
      createdAt: new Date(),
      updatedAt: new Date(),
      
      nameproduct:'Bàn Học Kèm Tủ Sách Cao Cấp - BLV151',
      imagesdetails:'../src/images/BanHoc/BLV151.png',
      images: '',
    },
    {

      producttype: 'Bàn làm việc',
      describe: 'Khung Gỗ CN phủ melamine cao cấp thương hiệu An Cường, Mộc Phát, Mộc Hoàng Gia',
      price:'6500000',
      discount:'4990000',
      dimension:'L',
      // kich thuoc
      warranty:'Bảo hành 12 tháng',
      color:'Tự chọn màu',
      createdAt: new Date(),
      updatedAt: new Date(),
      
      nameproduct:'Bàn làm việc liền kệ sách mẫu đa năng - BLV119',
      imagesdetails:'../src/imagesdetails/BanLamViec/BLV119.png',
      images: '',
    },
    
  
  
  
  
  
  
  ]);
  },
  

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
  //down chay luc roll back
};


