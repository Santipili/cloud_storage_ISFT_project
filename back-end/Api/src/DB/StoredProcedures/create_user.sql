CREATE DEFINER=`root`@`localhost` PROCEDURE `create_user`(IN `p_name` varchar(255), IN `p_password` varchar(255), IN `p_storage` INT)
BEGIN
DECLARE id INT DEFAULT 0;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
   BEGIN
            ROLLBACK;
            RESIGNAL;
   END;
    START TRANSACTION;
        INSERT INTO users(name, password, storage) VALUES (p_name, p_password, p_storage);
        SET id = LAST_INSERT_ID();
    COMMIT;
END