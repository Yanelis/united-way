package gov.miamidade.content;

public class StringUtils {

	
	public static String[] splitAndTrim(String s){
		if (s == null)
		{
			return new String[]{};
		}else
		{
			String[] toTrim = s.split(",");
			for(int i = 0; i < toTrim.length; i++)
			{
				toTrim[i] = toTrim[i].trim();
			}
			return toTrim;
		}
	}
}
