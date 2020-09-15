SELECT students.name as student, avg(assignment_submissions.duration) as average_assignment_duration
FROM students
JOIN assignment_submissions ON students.id = student_id
WHERE students.end_date IS NULL
GROUP BY students.name
-- reference for differentiation b/w WHERE and HAVING
-- HAVING avg(assignment_submissions.duration) > 100
ORDER BY average_assignment_duration DESC;