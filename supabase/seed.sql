insert into public.missions (id, title, description, xp_reward)
values
  ('first-market-read', 'First Market Read', 'Complete your first structured chart review in Chef Read order.', 60),
  ('roadmap-complete', 'Roadmap Complete', 'Finish all 8 roadmap steps in a single practice session.', 80),
  ('journal-streak-1', 'Journal Starter', 'Save your first journal entry.', 15)
on conflict (id) do nothing;

insert into public.library_items (slug, title, category, body, premium)
values
  ('bias-kitchen-direction', 'Bias: Kitchen Direction', 'concept', 'Bias sets the kitchen direction before entry decisions.', false),
  ('liquidity-flow', 'Liquidity: Flow', 'concept', 'Liquidity zones reveal where price may hunt before delivery.', false),
  ('burn-alarm-risk', 'Burn Alarm Risk Rules', 'mindset', 'Protect the plate with defined risk and calm execution.', true)
on conflict (slug) do nothing;
