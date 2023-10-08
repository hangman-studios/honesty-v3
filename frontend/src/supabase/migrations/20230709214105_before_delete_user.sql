create or replace function delete_old_profile()
returns trigger
language 'plpgsql'
security definer
as $$
begin
  delete from public.profiles where id = old.id;
  return old;
end;
$$;

create trigger before_delete_user
  before delete on auth.users
  for each row execute function public.delete_old_profile();
