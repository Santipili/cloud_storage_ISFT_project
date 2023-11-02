CREATE DEFINER=`root`@`localhost` PROCEDURE `create_resource_folder`(IN `p_path`varchar (255), IN `p_name`varchar (255), IN `p_size` INT)
BEGIN
DECLARE id INT DEFAULT 0;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
   BEGIN
            ROLLBACK;
            RESIGNAL;
   END;
    START TRANSACTION;
        INSERT INTO resources(path, name, size) VALUES (p_username, p_password, p_size);
        SET id = LAST_INSERT_ID();
        CALL `asign_resource_type`(1, id);
        CALL `asign_resource_to_user`(1, id);
    COMMIT;
END