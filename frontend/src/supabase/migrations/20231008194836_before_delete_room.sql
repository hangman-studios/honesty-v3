create or replace function delete_room_members(name text)
returns record
language 'plpgsql'
security invoker
as $$
begin
  delete from public.room_members where room_id = old.id;
  return old;
end;
$$;

create or replace trigger before_delete_room
  before delete on public.rooms
  for each row execute function public.delete_room_members();