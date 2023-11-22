set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_claimed(email_input text)
 RETURNS boolean
 security definer
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE public.supaswagcodes
  SET claimed = true
  WHERE email = email_input
  AND claimed IS NOT true;

  IF FOUND THEN
    RETURN true;
  ELSE
    RETURN false;
  END IF;
END;
$function$
;


