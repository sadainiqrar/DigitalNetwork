USE [digimarket]
GO

/****** Object: SqlProcedure [dbo].[delete_article] Script Date: 9/28/2017 11:53:50 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[delete_article]
	-- Add the parameters for the stored procedure here
	@serial int
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	    -- Insert statements for procedure here
DELETE FROM [dbo].[Articles]
      WHERE serial_no=@serial;

END
