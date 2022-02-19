-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 12, 2021 at 01:35 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `Name` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Phone` int(100) DEFAULT NULL,
  `Message` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `complaints`
--

INSERT INTO `complaints` (`Name`, `Email`, `Phone`, `Message`) VALUES
('hilal', 'ajfdakj@gmail.com', 676767676, ' adssadfasf'),
('fdgd', 'ajfdakj@gmail.com', 7868560, ' safafsaasd');

-- --------------------------------------------------------

--
-- Table structure for table `logindetails`
--

CREATE TABLE `logindetails` (
  `Email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `indexz` int(11) NOT NULL,
  `Username` varchar(14) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `logindetails`
--

INSERT INTO `logindetails` (`Email`, `password`, `indexz`, `Username`) VALUES
('123qwert@gmail.com', '$2b$10$pouPuHnDuT7dlPxgrFgvbeP8onGtjAt8FUu.qz1cDdhfktYgUWVoW', 0, 'hilal'),
('ahgren@gmail.com', '$2b$10$8LoNY/4d9VAha6/vT4oQMOiwop7Dajc7/rjtbbWiuv47HieWucM9C', 0, 'lud'),
('dfs@eaf', '$2b$10$m4FXGQD94e607O13i1FSI.TRdBFN2ujBXpqvy.uMByNzGVFrnz35O', 0, 'reqq'),
('hilal@hpo', '$2b$10$ln9b8TKUQy7vGwEZ2brjjO1UNLb7ElLk/pRBnLusWBRGyOjApR/qa', 1, 'Hilal'),
('MaryAngwin@jourrapide.com', '$2b$10$SlBXFSb84ZUjQO2CgzWKCOhgsykKW/HYe5NeusLRV2VVwJacySOn2', 0, 'Mary Angwin'),
('qwerty@gmail', '$2b$10$xr1fWvFXQFfZdaZg1sVnrO8ecvmBzaouiGTNHj9Ah4yc13UCZ/otO', 0, 'qwerty'),
('rety@yahoo', '$2b$10$744mizOyFMNwlWQY.9uXweASLSuzsBr.e2N4WPGV4v7OPtxN7Tfm6', 0, 'joy');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `Username` varchar(110) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`Username`, `password`, `email`) VALUES
('Hilal', '$2b$10$dgIbCvm8vShjTm5DyTh4KeW9TauWYusNZaS8uNVOjZyJTTFJTQG0a', 'hilal@admin.com'),
('reckful', '$2b$10$o1qo/fJ8N5XVvaxOBFJ62eVVWUB6QbpwUJnt19rK0beGag3oqBflm', '123ty@jik');

-- --------------------------------------------------------

--
-- Table structure for table `staffdetails`
--

CREATE TABLE `staffdetails` (
  `id` int(11) NOT NULL,
  `empid` int(14) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `Role` varchar(100) NOT NULL,
  `Department` varchar(100) NOT NULL,
  `Salary` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `staffdetails`
--

INSERT INTO `staffdetails` (`id`, `empid`, `Name`, `email`, `Role`, `Department`, `Salary`) VALUES
(1, 1, 'Hilals', 'hilal@gmail.com', 'Receptionist', 'Front', 24000),
(2, 2, 'reckful', '123ty@jik', 'Waiter', 'Front', 16000);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` bigint(100) UNSIGNED DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `country` varchar(110) NOT NULL,
  `streetnumber` int(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `person` varchar(10) NOT NULL,
  `bedding` varchar(100) NOT NULL,
  `room` varchar(100) NOT NULL,
  `arrive` date DEFAULT NULL,
  `depart` date NOT NULL,
  `postcode` int(11) NOT NULL,
  `comments` text NOT NULL,
  `roomno` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `street`, `country`, `streetnumber`, `city`, `person`, `bedding`, `room`, `arrive`, `depart`, `postcode`, `comments`, `roomno`) VALUES
(1, 'Suhail', 'qwat@gmail.com', 2147483647, 'old bazar', 'India', 21, 'Meloore', '4', 'quad', 'deluxe', '0000-00-00', '2021-06-03', 2021, '', 1),
(2, 'Dravid', 'drafa@gmail.com', 730989874, 'alleppo', 'India', 43, 'Mumbai', '4', 'quad', 'standard', '2021-06-04', '2021-06-05', 543013, '', 2),
(3, 'Navas', 'navas3444a3@gmail.com', 2147483647, 'Hajjiyarpalli', 'India', 34, 'Malappuram', '6', 'double', 'deluxe', '2021-05-26', '2021-05-29', 676519, '', 3),
(4, 'Musa', 'musa765@gmail.com', 7, 'Alabasta', 'India', 2147483647, 'kollam', '2', 'king', 'deluxe', '2021-06-14', '2021-06-17', 688082, '', 4),
(5, 'Babu', 'ffhd@Gmail.com', 2147483647, 'Hajjiyarpalli', 'Euro', 57, 'Hosting', '5', 'double', 'standard', '2021-05-09', '2021-05-29', 675477, '', 5),
(6, 'Johnny ', 'johnkp5@gmail.com', 2147483647, 'east blue', 'India', 12, 'Kotayam', '3', 'triple', 'budget', '2021-05-29', '2021-05-30', 754321, '', 6),
(7, 'Mathew renaudo', 'mizkif112@Gmail.com', 538936252, 'Yondu', 'Russia', 87, 'Todd', '6', 'queen', 'budget', '2021-05-13', '2021-05-29', 5383753, '', 7),
(10, 'hilalsidhicsda', 'hilal@hpo', 676767676, 'jills', 'United King', 0, '', '', 'double-bed', 'deluxe', '0000-00-00', '0000-00-00', 0, '', 10),
(26, 'dasdasd', '545fdgg@fgfg', 2147483647, 'sdaasd', 'asdasdsada', 0, 'fdsfsdf', '', 'double-bed', 'Zuri-zimmer', '0000-00-00', '0000-00-00', 0, '', 13),
(32, 'errrrrrreetdgghikiki', 'drfghd', 0, '', '', 0, '', '', 'double-bed', 'deluxe', '0000-00-00', '0000-00-00', 0, '', 20),
(36, 'fdgd', 'ajfdakj@gmail.com', 7868560, 'jills', 'United King', 0, '', 'selected', 'double-bed', 'deluxe', '0000-00-00', '0000-00-00', 0, '', 12),
(57, 'redhd', 'dfsa@fsadqwefgv', 0, '', '', 0, '', '', 'double-bed', 'blank', '0000-00-00', '0000-00-00', 0, '', 18),
(59, 'Nabeel', '12nabmail@gmail.com', 730756872, 'down valley', 'india', 6, 'Alappuzha', '3', 'quad', 'deluxe', '2021-05-04', '2021-05-10', 688012, 'sanitized', 19),
(68, 'Mary Angwin', 'MaryAngwin@jourrapide.com', 78, 'Merthyr Road', 'United States of America', 65, 'austin', '3', 'quad-bed', 'Standard', '2021-06-11', '2021-06-23', 7809, '', 15),
(70, 'asde', 'ghjgj@fgfgsad', 676767676, 'jills', 'United Kingdom', 0, 'Muvattupuzha', '4', 'quad-bed', 'Deluxe', '2021-06-09', '2021-06-25', 675675, '', 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `logindetails`
--
ALTER TABLE `logindetails`
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `indexz` (`indexz`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD UNIQUE KEY `username` (`Username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `staffdetails`
--
ALTER TABLE `staffdetails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `empid` (`empid`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
