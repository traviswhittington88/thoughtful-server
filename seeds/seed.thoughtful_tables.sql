BEGIN; 

TRUNCATE 
  thoughtful_entries,
  thoughtful_journals,
  thoughtful_users
  RESTART IDENTITY CASCADE;

INSERT INTO thoughtful_journals (name)
  VALUES
    ('Sam Says'),
    ('Elmers Woes'),
    ('Work Life'),
    ('A Bugs Life'),
    ('Bat News'),
    ('Cab Thoughts'),
    ('Jokers Jokes'),
    ('Goals'),
    ('Ideas'),
    ('Personal');


INSERT INTO thoughtful_users (user_name, full_name, pseudonym, password)
  VALUES
    ('wonderBoy88', 'Sam Wonder', 'kid wonder', '$2a$12$mkcQQHtqa5iNRCwJNx1iUOBd58vEaf/nfUeOvtps.zFTwbneDPWtO'),
    ('travisty40', 'Travis Bickle', 'Taxi Driver', '$2a$12$vi7HDAeW3THNNs9lqLxBvuHkZkfoFr6/ug172oPGRHAvLAgYMOrf.'),
    ('DarkKnight', 'Bruce Wayne', 'Batman', '$2a$12$jRKhYey2/B51qGG0RktziuYtJdWoomePiR7YSOGv6sfieH5mkloVe'),
    ('JokerTime57', 'Joker', 'Mista J', '$2a$12$Sn0dg2jk6lq/n9s2uvSNLusKgTGWlLTbzdptyVfed5x6l5L2qWrea'),
    ('theBugs52', 'Bugs Bunny', 'Bugs', '$2a$10$vjtEfvmQIOnY0/aop1ESTeBVoIlEZswDL9IUd6ywxurTqM7bp5oXK'),  -- bugspassword
    ('SamSays', 'Yosemite Sam', 'Semite', 'yosemitepassword'),
    ('ohFudd', 'Elmer Fudd', 'Fudd', 'elmerfuddpassword');

INSERT INTO thoughtful_entries (title, content, pseudonym, journal_id, user_id)
  VALUES 
    ('My first journal entry', 'I don''t know what to say!','Sam wonder', 1, 5),
    ('You talkin to me?', 'You must be talkin to me cuz I''m the only one around..','Travis Bickle', 6, 2),
    ('Where are they!', 'Seriously, it''s hurting me to talk in this voice','Batman', 5, 3),
    ('Fatman', 'If you''re good at something, never do it for free.','Joker', 7, 4),
    ('Ah...what''s up doc?', 'Wow what a day! I managed to escape that dopey hunter Fudd, Yosemite GoofHead, and some other notoriously dumb antagonists! not to mention.. I got to eat several delicious carrots.','Bugs Bunny',4),
    ('Today was a bad day', 'Well where to begin? I blew myself up wit my own musket chasing dat twicky cawot eat''n, no good scwewy wabbit... guess I''ll twy again next week','Elmer Fudd', 2, 6),
    ('Toot''n Hoot''n and Son of a Shoot''n', 'I''m the meanest, roughest, toughest hombre that''s ever crossed the Rio Grande - and I ain''t o namby-bamby! I''m the hootin''est, tootin''est, shootin''est, bob-tail wildcat, in the west! I''m the fastest gun north, south, east, aaaaaaaand west of the Pecos! When I say whoa, I mean whoa!', 'Yosemite Sam', 1, 6);

COMMIT;