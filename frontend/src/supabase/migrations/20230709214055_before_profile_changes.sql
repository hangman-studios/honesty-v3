create or replace function delete_old_avatar()
returns trigger
language 'plpgsql'
security definer
as $$
declare
  status int;
  content text;
begin
  if coalesce(old.avatar_url, '') <> ''
      and (tg_op = 'DELETE' or (old.avatar_url <> new.avatar_url)) then
    select
      into status, content
      result.status, result.content
      from public.delete_avatar(old.avatar_url) as result;
    if status <> 200 then
      raise warning 'Could not delete avatar: % %', status, content;
    end if;
  end if;
  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

create trigger before_profile_changes
  before update of avatar_url or delete on public.profiles
  for each row execute function public.delete_old_avatar();
