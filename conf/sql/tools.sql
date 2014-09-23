#modify
ALTER TABLE teacher_collaboration_team MODIFY COLUMN id INT auto_increment

#add primary key
 ALTER TABLE teacher_collaboration_team ADD PRIMARY KEY (id);
 
  
 #sql
# django __ me.teacher_teams.annotate(members_count=Count('members')).annotate(tasks_count=Count('assigned_tasks')).all()
 
 Query: SELECT `teacher_collaboration_team`.`id`, `teacher_collaboration_team`.`user_id`, `teacher_collaboration_team`.`name`,
 `teacher_collaboration_team`.`created_at`, COUNT(`teacher_collaboration_team_membership`.`collaborator_id`) AS `members_count`, 
 COUNT(`teacher_collaboration_team_task`.`id`) AS `tasks_count` FROM `teacher_collaboration_team` 
	LEFT OUTER JOIN `teacher_collaboration_team_membership` 
		ON  (`teacher_collaboration_team`.`id` = `teacher_collaboration_team_membership`.`team_id`) 
	LEFT OUTER JOIN `teacher_collaboration_team_task` 
		ON (`teacher_collaboration_team`.`id` = `teacher_collaboration_team_task`.`team_id`)
 WHERE `teacher_collaboration_team`.`user_id` = 76  GROUP BY `teacher_collaboration_team`.`id` ORDER BY NULL
 
 Query: SELECT `teacher_collaboration_team`.`id`, `teacher_collaboration_team`.`user_id`, `teacher_collaboration_team`.`name`, `teacher_collaboration_team`.`created_at`, COUNT(`teacher_collaboration_team_task`.`id`) AS `tasks_count`, COUNT(`teacher_collaboration_team_membership`.`collaborator_id`) AS `members_count` FROM `teacher_collaboration_team` LEFT OUTER JOIN `teacher_collaboration_team_task` ON (`teacher_collaboration_team`.`id` = `teacher_collaboration_team_task`.`team_id`) LEFT OUTER JOIN `teacher_collaboration_team_membership` ON (`teacher_collaboration_team`.`id` = `teacher_collaboration_team_membership`.`team_id`) WHERE `teacher_collaboration_team`.`user_id` = 76  GROUP BY `teacher_collaboration_team`.`id` ORDER BY NULL