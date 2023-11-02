CREATE DEFINER=`root`@`localhost` PROCEDURE `asign_resource_to_user`(IN `p_user_id` int, IN `p_resource_id` int)
INSERT INTO user_has_resources (userId, resourceId) VALUES (p_user_id, p_resource_id)