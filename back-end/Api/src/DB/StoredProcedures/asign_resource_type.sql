CREATE DEFINER=`root`@`localhost` PROCEDURE `asign_resource_type`(IN `p_type_id` int, IN `p_resource_id` int)
INSERT INTO type_of_resource (type_id, resources_id) VALUES (p_type_id, p_resource_id)