-- ZHAOWANNUO 数据库初始化脚本
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 创建数据库
CREATE DATABASE IF NOT EXISTS zhaowannuo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE zhaowannuo;

-- 用户表
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  openid VARCHAR(64) UNIQUE COMMENT '微信openid',
  nickname VARCHAR(64) COMMENT '昵称',
  avatar VARCHAR(255) COMMENT '头像URL',
  level INT DEFAULT 1 COMMENT '会员等级',
  level_name VARCHAR(32) DEFAULT '普通会员' COMMENT '等级名称',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 分类表
DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(64) NOT NULL COMMENT '分类名称',
  sort_order INT DEFAULT 0 COMMENT '排序',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='分类表';

-- 商品表
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(128) NOT NULL COMMENT '商品名称',
  code VARCHAR(64) COMMENT '商品编码',
  price DECIMAL(10,2) NOT NULL COMMENT '价格',
  original_price DECIMAL(10,2) DEFAULT 0 COMMENT '原价',
  image_url VARCHAR(255) COMMENT '主图URL',
  stock INT DEFAULT 0 COMMENT '库存',
  tags JSON COMMENT '标签数组',
  category_id INT COMMENT '分类ID',
  is_sold_out TINYINT DEFAULT 0 COMMENT '是否售罄',
  is_new TINYINT DEFAULT 0 COMMENT '是否新品',
  is_special TINYINT DEFAULT 0 COMMENT '是否破价',
  sales INT DEFAULT 0 COMMENT '销量',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品表';

-- 购物车表
DROP TABLE IF EXISTS cart;
CREATE TABLE cart (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL COMMENT '用户ID',
  product_id INT NOT NULL COMMENT '商品ID',
  quantity INT DEFAULT 1 COMMENT '数量',
  sku VARCHAR(64) COMMENT 'SKU规格',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='购物车表';

-- Banner表
DROP TABLE IF EXISTS banners;
CREATE TABLE banners (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_url VARCHAR(255) NOT NULL COMMENT '图片URL',
  link_type VARCHAR(32) COMMENT '跳转类型',
  link_value VARCHAR(128) COMMENT '跳转值',
  sort_order INT DEFAULT 0 COMMENT '排序',
  is_active TINYINT DEFAULT 1 COMMENT '是否启用',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Banner表';

-- 插入测试数据
INSERT INTO categories (name, sort_order) VALUES
('小程序专属', 1),
('早期特价', 2),
('外套', 3),
('内搭', 4),
('裤子', 5),
('套装', 6);

INSERT INTO products (name, code, price, original_price, image_url, stock, tags, category_id, is_sold_out, is_new, is_special, sales) VALUES
('休闲牛仔外套', 'JC001', 299.00, 599.00, '', 50, '["不退款", "不换款"]', 3, 0, 1, 1, 128),
('简约黑色T恤', 'TS001', 89.00, 199.00, '', 100, '["不退款"]', 4, 0, 1, 1, 256),
('纯棉休闲裤', 'PK001', 159.00, 399.00, '', 30, '["不退款", "只换尺码"]', 5, 1, 0, 1, 89);

INSERT INTO banners (image_url, link_type, link_value, sort_order) VALUES
('/images/banner1.jpg', 'page', 'pages/special/special', 1),
('/images/banner2.jpg', 'page', 'pages/new/new', 2);

-- 插入测试用户
INSERT INTO users (openid, nickname, level, level_name) VALUES
('test_openid_001', 'Test User', 1, 'Normal Member');

SET FOREIGN_KEY_CHECKS = 1;
