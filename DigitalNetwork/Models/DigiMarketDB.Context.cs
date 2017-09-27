﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DigitalNetwork.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class digimarketEntities1 : DbContext
    {
        public digimarketEntities1()
            : base("name=digimarketEntities1")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<Article> Articles { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<Rate> Rates { get; set; }
        public virtual DbSet<Rates_History> Rates_History { get; set; }
        public virtual DbSet<Site> Sites { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<User_Marketing_Source> User_Marketing_Source { get; set; }
    
        public virtual int add_article(Nullable<int> aid, string article_url, Nullable<bool> status, string site_url)
        {
            var aidParameter = aid.HasValue ?
                new ObjectParameter("aid", aid) :
                new ObjectParameter("aid", typeof(int));
    
            var article_urlParameter = article_url != null ?
                new ObjectParameter("article_url", article_url) :
                new ObjectParameter("article_url", typeof(string));
    
            var statusParameter = status.HasValue ?
                new ObjectParameter("status", status) :
                new ObjectParameter("status", typeof(bool));
    
            var site_urlParameter = site_url != null ?
                new ObjectParameter("site_url", site_url) :
                new ObjectParameter("site_url", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("add_article", aidParameter, article_urlParameter, statusParameter, site_urlParameter);
        }
    
        public virtual int add_payment(string uid, Nullable<int> traffic, Nullable<decimal> amount, Nullable<System.DateTime> from_date, Nullable<System.DateTime> to_date, Nullable<System.DateTime> pay_date)
        {
            var uidParameter = uid != null ?
                new ObjectParameter("uid", uid) :
                new ObjectParameter("uid", typeof(string));
    
            var trafficParameter = traffic.HasValue ?
                new ObjectParameter("traffic", traffic) :
                new ObjectParameter("traffic", typeof(int));
    
            var amountParameter = amount.HasValue ?
                new ObjectParameter("amount", amount) :
                new ObjectParameter("amount", typeof(decimal));
    
            var from_dateParameter = from_date.HasValue ?
                new ObjectParameter("from_date", from_date) :
                new ObjectParameter("from_date", typeof(System.DateTime));
    
            var to_dateParameter = to_date.HasValue ?
                new ObjectParameter("to_date", to_date) :
                new ObjectParameter("to_date", typeof(System.DateTime));
    
            var pay_dateParameter = pay_date.HasValue ?
                new ObjectParameter("pay_date", pay_date) :
                new ObjectParameter("pay_date", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("add_payment", uidParameter, trafficParameter, amountParameter, from_dateParameter, to_dateParameter, pay_dateParameter);
        }
    
        public virtual int add_site(string site, string site_name, string gid, string email)
        {
            var siteParameter = site != null ?
                new ObjectParameter("site", site) :
                new ObjectParameter("site", typeof(string));
    
            var site_nameParameter = site_name != null ?
                new ObjectParameter("site_name", site_name) :
                new ObjectParameter("site_name", typeof(string));
    
            var gidParameter = gid != null ?
                new ObjectParameter("gid", gid) :
                new ObjectParameter("gid", typeof(string));
    
            var emailParameter = email != null ?
                new ObjectParameter("email", email) :
                new ObjectParameter("email", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("add_site", siteParameter, site_nameParameter, gidParameter, emailParameter);
        }
    
        public virtual int add_ums(string page_url, string des, string uid)
        {
            var page_urlParameter = page_url != null ?
                new ObjectParameter("page_url", page_url) :
                new ObjectParameter("page_url", typeof(string));
    
            var desParameter = des != null ?
                new ObjectParameter("des", des) :
                new ObjectParameter("des", typeof(string));
    
            var uidParameter = uid != null ?
                new ObjectParameter("uid", uid) :
                new ObjectParameter("uid", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("add_ums", page_urlParameter, desParameter, uidParameter);
        }
    
        public virtual ObjectResult<admin_sign_in_Result> admin_sign_in(string email, string pass)
        {
            var emailParameter = email != null ?
                new ObjectParameter("email", email) :
                new ObjectParameter("email", typeof(string));
    
            var passParameter = pass != null ?
                new ObjectParameter("pass", pass) :
                new ObjectParameter("pass", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<admin_sign_in_Result>("admin_sign_in", emailParameter, passParameter);
        }
    
        public virtual int admin_sign_up(string email, string name, string pass, string photo, string site_name, string site, string gid)
        {
            var emailParameter = email != null ?
                new ObjectParameter("email", email) :
                new ObjectParameter("email", typeof(string));
    
            var nameParameter = name != null ?
                new ObjectParameter("name", name) :
                new ObjectParameter("name", typeof(string));
    
            var passParameter = pass != null ?
                new ObjectParameter("pass", pass) :
                new ObjectParameter("pass", typeof(string));
    
            var photoParameter = photo != null ?
                new ObjectParameter("photo", photo) :
                new ObjectParameter("photo", typeof(string));
    
            var site_nameParameter = site_name != null ?
                new ObjectParameter("site_name", site_name) :
                new ObjectParameter("site_name", typeof(string));
    
            var siteParameter = site != null ?
                new ObjectParameter("site", site) :
                new ObjectParameter("site", typeof(string));
    
            var gidParameter = gid != null ?
                new ObjectParameter("gid", gid) :
                new ObjectParameter("gid", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("admin_sign_up", emailParameter, nameParameter, passParameter, photoParameter, site_nameParameter, siteParameter, gidParameter);
        }
    
        public virtual int admin_update(string email, string name, string pass, string photo)
        {
            var emailParameter = email != null ?
                new ObjectParameter("email", email) :
                new ObjectParameter("email", typeof(string));
    
            var nameParameter = name != null ?
                new ObjectParameter("name", name) :
                new ObjectParameter("name", typeof(string));
    
            var passParameter = pass != null ?
                new ObjectParameter("pass", pass) :
                new ObjectParameter("pass", typeof(string));
    
            var photoParameter = photo != null ?
                new ObjectParameter("photo", photo) :
                new ObjectParameter("photo", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("admin_update", emailParameter, nameParameter, passParameter, photoParameter);
        }
    
        public virtual ObjectResult<Nullable<int>> count_ums(string uid)
        {
            var uidParameter = uid != null ?
                new ObjectParameter("uid", uid) :
                new ObjectParameter("uid", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<int>>("count_ums", uidParameter);
        }
    
        public virtual int delete_article(Nullable<int> aid)
        {
            var aidParameter = aid.HasValue ?
                new ObjectParameter("aid", aid) :
                new ObjectParameter("aid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("delete_article", aidParameter);
        }
    
        public virtual int delete_site(string site_url, string email)
        {
            var site_urlParameter = site_url != null ?
                new ObjectParameter("site_url", site_url) :
                new ObjectParameter("site_url", typeof(string));
    
            var emailParameter = email != null ?
                new ObjectParameter("email", email) :
                new ObjectParameter("email", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("delete_site", site_urlParameter, emailParameter);
        }
    
        public virtual int delete_ums(Nullable<int> ums_id)
        {
            var ums_idParameter = ums_id.HasValue ?
                new ObjectParameter("ums_id", ums_id) :
                new ObjectParameter("ums_id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("delete_ums", ums_idParameter);
        }
    
        public virtual ObjectResult<get_admin_articles_Result> get_admin_articles(string email, string site)
        {
            var emailParameter = email != null ?
                new ObjectParameter("email", email) :
                new ObjectParameter("email", typeof(string));
    
            var siteParameter = site != null ?
                new ObjectParameter("site", site) :
                new ObjectParameter("site", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<get_admin_articles_Result>("get_admin_articles", emailParameter, siteParameter);
        }
    
        public virtual ObjectResult<get_admin_single_article_Result> get_admin_single_article(Nullable<int> aid)
        {
            var aidParameter = aid.HasValue ?
                new ObjectParameter("aid", aid) :
                new ObjectParameter("aid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<get_admin_single_article_Result>("get_admin_single_article", aidParameter);
        }
    
        public virtual ObjectResult<get_articles_Result> get_articles()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<get_articles_Result>("get_articles");
        }
    
        public virtual ObjectResult<get_payment_Result> get_payment(string uid, Nullable<int> traffic, Nullable<decimal> amount, Nullable<System.DateTime> from_date, Nullable<System.DateTime> to_date, Nullable<System.DateTime> pay_date)
        {
            var uidParameter = uid != null ?
                new ObjectParameter("uid", uid) :
                new ObjectParameter("uid", typeof(string));
    
            var trafficParameter = traffic.HasValue ?
                new ObjectParameter("traffic", traffic) :
                new ObjectParameter("traffic", typeof(int));
    
            var amountParameter = amount.HasValue ?
                new ObjectParameter("amount", amount) :
                new ObjectParameter("amount", typeof(decimal));
    
            var from_dateParameter = from_date.HasValue ?
                new ObjectParameter("from_date", from_date) :
                new ObjectParameter("from_date", typeof(System.DateTime));
    
            var to_dateParameter = to_date.HasValue ?
                new ObjectParameter("to_date", to_date) :
                new ObjectParameter("to_date", typeof(System.DateTime));
    
            var pay_dateParameter = pay_date.HasValue ?
                new ObjectParameter("pay_date", pay_date) :
                new ObjectParameter("pay_date", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<get_payment_Result>("get_payment", uidParameter, trafficParameter, amountParameter, from_dateParameter, to_dateParameter, pay_dateParameter);
        }
    
        public virtual ObjectResult<get_rate_Result> get_rate(string category)
        {
            var categoryParameter = category != null ?
                new ObjectParameter("category", category) :
                new ObjectParameter("category", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<get_rate_Result>("get_rate", categoryParameter);
        }
    
        public virtual ObjectResult<get_ums_Result> get_ums(string uid)
        {
            var uidParameter = uid != null ?
                new ObjectParameter("uid", uid) :
                new ObjectParameter("uid", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<get_ums_Result>("get_ums", uidParameter);
        }
    
        public virtual ObjectResult<get_user_single_article_Result> get_user_single_article(Nullable<int> aid)
        {
            var aidParameter = aid.HasValue ?
                new ObjectParameter("aid", aid) :
                new ObjectParameter("aid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<get_user_single_article_Result>("get_user_single_article", aidParameter);
        }
    
        public virtual int sp_alterdiagram(string diagramname, Nullable<int> owner_id, Nullable<int> version, byte[] definition)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            var versionParameter = version.HasValue ?
                new ObjectParameter("version", version) :
                new ObjectParameter("version", typeof(int));
    
            var definitionParameter = definition != null ?
                new ObjectParameter("definition", definition) :
                new ObjectParameter("definition", typeof(byte[]));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_alterdiagram", diagramnameParameter, owner_idParameter, versionParameter, definitionParameter);
        }
    
        public virtual int sp_creatediagram(string diagramname, Nullable<int> owner_id, Nullable<int> version, byte[] definition)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            var versionParameter = version.HasValue ?
                new ObjectParameter("version", version) :
                new ObjectParameter("version", typeof(int));
    
            var definitionParameter = definition != null ?
                new ObjectParameter("definition", definition) :
                new ObjectParameter("definition", typeof(byte[]));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_creatediagram", diagramnameParameter, owner_idParameter, versionParameter, definitionParameter);
        }
    
        public virtual int sp_dropdiagram(string diagramname, Nullable<int> owner_id)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_dropdiagram", diagramnameParameter, owner_idParameter);
        }
    
        public virtual ObjectResult<sp_helpdiagramdefinition_Result> sp_helpdiagramdefinition(string diagramname, Nullable<int> owner_id)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_helpdiagramdefinition_Result>("sp_helpdiagramdefinition", diagramnameParameter, owner_idParameter);
        }
    
        public virtual ObjectResult<sp_helpdiagrams_Result> sp_helpdiagrams(string diagramname, Nullable<int> owner_id)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_helpdiagrams_Result>("sp_helpdiagrams", diagramnameParameter, owner_idParameter);
        }
    
        public virtual int sp_renamediagram(string diagramname, Nullable<int> owner_id, string new_diagramname)
        {
            var diagramnameParameter = diagramname != null ?
                new ObjectParameter("diagramname", diagramname) :
                new ObjectParameter("diagramname", typeof(string));
    
            var owner_idParameter = owner_id.HasValue ?
                new ObjectParameter("owner_id", owner_id) :
                new ObjectParameter("owner_id", typeof(int));
    
            var new_diagramnameParameter = new_diagramname != null ?
                new ObjectParameter("new_diagramname", new_diagramname) :
                new ObjectParameter("new_diagramname", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_renamediagram", diagramnameParameter, owner_idParameter, new_diagramnameParameter);
        }
    
        public virtual int sp_upgraddiagrams()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_upgraddiagrams");
        }
    
        public virtual int update_articles(Nullable<bool> status, Nullable<int> aid)
        {
            var statusParameter = status.HasValue ?
                new ObjectParameter("status", status) :
                new ObjectParameter("status", typeof(bool));
    
            var aidParameter = aid.HasValue ?
                new ObjectParameter("aid", aid) :
                new ObjectParameter("aid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("update_articles", statusParameter, aidParameter);
        }
    
        public virtual int update_rates(string category, Nullable<decimal> rate, Nullable<System.DateTime> date)
        {
            var categoryParameter = category != null ?
                new ObjectParameter("category", category) :
                new ObjectParameter("category", typeof(string));
    
            var rateParameter = rate.HasValue ?
                new ObjectParameter("rate", rate) :
                new ObjectParameter("rate", typeof(decimal));
    
            var dateParameter = date.HasValue ?
                new ObjectParameter("date", date) :
                new ObjectParameter("date", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("update_rates", categoryParameter, rateParameter, dateParameter);
        }
    
        public virtual int update_site(string site_name, string site)
        {
            var site_nameParameter = site_name != null ?
                new ObjectParameter("site_name", site_name) :
                new ObjectParameter("site_name", typeof(string));
    
            var siteParameter = site != null ?
                new ObjectParameter("site", site) :
                new ObjectParameter("site", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("update_site", site_nameParameter, siteParameter);
        }
    
        public virtual int update_ums(string page_url, string des, string uid)
        {
            var page_urlParameter = page_url != null ?
                new ObjectParameter("page_url", page_url) :
                new ObjectParameter("page_url", typeof(string));
    
            var desParameter = des != null ?
                new ObjectParameter("des", des) :
                new ObjectParameter("des", typeof(string));
    
            var uidParameter = uid != null ?
                new ObjectParameter("uid", uid) :
                new ObjectParameter("uid", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("update_ums", page_urlParameter, desParameter, uidParameter);
        }
    
        public virtual ObjectResult<user_sign_in_Result> user_sign_in(string email, string pass)
        {
            var emailParameter = email != null ?
                new ObjectParameter("email", email) :
                new ObjectParameter("email", typeof(string));
    
            var passParameter = pass != null ?
                new ObjectParameter("pass", pass) :
                new ObjectParameter("pass", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<user_sign_in_Result>("user_sign_in", emailParameter, passParameter);
        }
    
        public virtual int user_sign_up(string email, string uid, string name, string pass, string photo, string url, string desc)
        {
            var emailParameter = email != null ?
                new ObjectParameter("email", email) :
                new ObjectParameter("email", typeof(string));
    
            var uidParameter = uid != null ?
                new ObjectParameter("uid", uid) :
                new ObjectParameter("uid", typeof(string));
    
            var nameParameter = name != null ?
                new ObjectParameter("name", name) :
                new ObjectParameter("name", typeof(string));
    
            var passParameter = pass != null ?
                new ObjectParameter("pass", pass) :
                new ObjectParameter("pass", typeof(string));
    
            var photoParameter = photo != null ?
                new ObjectParameter("photo", photo) :
                new ObjectParameter("photo", typeof(string));
    
            var urlParameter = url != null ?
                new ObjectParameter("url", url) :
                new ObjectParameter("url", typeof(string));
    
            var descParameter = desc != null ?
                new ObjectParameter("desc", desc) :
                new ObjectParameter("desc", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("user_sign_up", emailParameter, uidParameter, nameParameter, passParameter, photoParameter, urlParameter, descParameter);
        }
    
        public virtual int user_update(string uid, string email, string pass, string name, string photo)
        {
            var uidParameter = uid != null ?
                new ObjectParameter("uid", uid) :
                new ObjectParameter("uid", typeof(string));
    
            var emailParameter = email != null ?
                new ObjectParameter("email", email) :
                new ObjectParameter("email", typeof(string));
    
            var passParameter = pass != null ?
                new ObjectParameter("pass", pass) :
                new ObjectParameter("pass", typeof(string));
    
            var nameParameter = name != null ?
                new ObjectParameter("name", name) :
                new ObjectParameter("name", typeof(string));
    
            var photoParameter = photo != null ?
                new ObjectParameter("photo", photo) :
                new ObjectParameter("photo", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("user_update", uidParameter, emailParameter, passParameter, nameParameter, photoParameter);
        }
    }
}
