BEGIN; 

TRUNCATE 
  thoughtful_entries,
  thoughtful_folders,
  thoughtful_users
  RESTART IDENTITY CASCADE;

INSERT INTO thoughtful_users (user_name, name, pseudoynm, password)
  VALUES
    ('wonderBoy88', 'Sam Wonder', 'kid wonder', '$2a$12$mkcQQHtqa5iNRCwJNx1iUOBd58vEaf/nfUeOvtps.zFTwbneDPWtO'),
    ('travisty40', 'Travis Bickle', 'Taxi Driver', '$2a$12$vi7HDAeW3THNNs9lqLxBvuHkZkfoFr6/ug172oPGRHAvLAgYMOrf.'),
    ('DarkKnight', 'Bruce Wayne', 'Batman', '$2a$12$jRKhYey2/B51qGG0RktziuYtJdWoomePiR7YSOGv6sfieH5mkloVe'),
    ('JokerTime57', 'Joker', 'Mista J', '$2a$12$Sn0dg2jk6lq/n9s2uvSNLusKgTGWlLTbzdptyVfed5x6l5L2qWrea');

INSERT INTO thoughtful_entries (title, author_id, content)
  VALUES 
    ('My first journal entry', 1, "I don't know what to say!"),
    ('You talkin to me?'. 2, "You must be talkin to me cuz I'm the only one around.."),
    ('Where are they!', 3, "Seriously, it's hurting me to talk in this voice"),
    ('Fatman', 4, "If you're good at something, never do it for free.");

INSERT INTO thoughtful_folders (name)
  VALUES
    ('Thoughts'),
    ('Goals'),
    ('Ideas'),
    ('Personal');
