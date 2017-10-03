USE [digimarket]
GO

DECLARE	@return_value Int

EXEC	@return_value = [dbo].[add_site]
		@site = N'http://trumpgossiptoday.com',
		@site_name = N'trumpgossip',
		@gid = N'ga-123123',
		@email = N'zuraiz.com'

SELECT	@return_value as 'Return Value'

GO
