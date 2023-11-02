CREATE DEFINER=`root`@`localhost` PROCEDURE `create_file`(IN `p_path` varchar(255), IN `p_fileName` varchar(100))
BEGIN
INSERT INTO file(path, fileName) VALUES (p_path, p_fileName);
END