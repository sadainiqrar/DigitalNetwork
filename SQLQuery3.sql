USE [digimarket]
GO

DECLARE	@return_value Int

EXEC	@return_value = [dbo].[get_admin_articles]
		@email = N'zuraiz.com',
		@site = N'http://trumpgossiptoday.com'

SELECT	@return_value as 'Return Value'

GO
