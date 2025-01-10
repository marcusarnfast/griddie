SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '5d93c0b2-37fe-46e0-95a1-b1d799195064', '{"action":"user_signedup","actor_id":"ae0f89cb-5eac-4ad3-976d-f0c7dda0f814","actor_username":"test@test.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-12-10 20:12:22.740883+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fc69ec44-0dec-4df2-9760-795db5674645', '{"action":"login","actor_id":"ae0f89cb-5eac-4ad3-976d-f0c7dda0f814","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-12-10 20:12:22.743358+00', ''),
	('00000000-0000-0000-0000-000000000000', 'be2738ba-2669-4872-a6b0-9e54413f73e1', '{"action":"user_recovery_requested","actor_id":"ae0f89cb-5eac-4ad3-976d-f0c7dda0f814","actor_username":"test@test.com","actor_via_sso":false,"log_type":"user"}', '2024-12-10 20:12:22.750261+00', ''),
	('00000000-0000-0000-0000-000000000000', '705f1fc1-eede-41ac-9a7e-49460a6a368a', '{"action":"login","actor_id":"ae0f89cb-5eac-4ad3-976d-f0c7dda0f814","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account"}', '2024-12-10 20:12:34.406871+00', ''),
	('00000000-0000-0000-0000-000000000000', '8dd37a4f-a204-47f5-a590-63049565a7a9', '{"action":"user_recovery_requested","actor_id":"ae0f89cb-5eac-4ad3-976d-f0c7dda0f814","actor_username":"test@test.com","actor_via_sso":false,"log_type":"user"}', '2024-12-10 20:12:42.21248+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bb5f5350-86be-4067-93e3-7666e1d1defa', '{"action":"user_signedup","actor_id":"0783acab-01ef-432a-9b1c-cb2687ea1a94","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-12-10 20:13:11.814082+00', ''),
	('00000000-0000-0000-0000-000000000000', '64e8cf41-447c-4b6a-9517-375cef4851d0', '{"action":"login","actor_id":"0783acab-01ef-432a-9b1c-cb2687ea1a94","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-12-10 20:13:11.815807+00', ''),
	('00000000-0000-0000-0000-000000000000', '1ae96edc-706a-4eee-90ba-be3ff83ae538', '{"action":"user_recovery_requested","actor_id":"0783acab-01ef-432a-9b1c-cb2687ea1a94","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"user"}', '2024-12-10 20:13:11.818973+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd431ce2b-9354-431c-a1b2-690608f4dd58', '{"action":"user_signedup","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-12-10 20:34:24.228474+00', ''),
	('00000000-0000-0000-0000-000000000000', '68826393-10e0-4277-a63f-9d33bf528bbb', '{"action":"login","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-12-10 20:34:24.230157+00', ''),
	('00000000-0000-0000-0000-000000000000', '477ddf97-31a0-4bf6-ac8a-4a40d7b5aa12', '{"action":"user_recovery_requested","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"user"}', '2024-12-10 20:34:24.233839+00', ''),
	('00000000-0000-0000-0000-000000000000', '80b74510-e7fd-4b7d-b827-07024208f76d', '{"action":"login","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"account"}', '2024-12-10 20:34:36.443833+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd47cc870-7d4a-4af3-82b8-8d4e00e6f021', '{"action":"user_recovery_requested","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"user"}', '2024-12-10 20:40:45.259301+00', ''),
	('00000000-0000-0000-0000-000000000000', '3aac9fb0-e57f-43c2-a38e-9480b21639ef', '{"action":"login","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"account"}', '2024-12-10 20:40:52.694824+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ed0ca402-f6ce-420d-b576-44193cf03736', '{"action":"user_recovery_requested","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"user"}', '2024-12-10 20:47:30.852619+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c4a6dda6-bfa6-4def-8705-99b4ef95620c', '{"action":"login","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"account"}', '2024-12-10 20:47:42.203801+00', ''),
	('00000000-0000-0000-0000-000000000000', '19eddb36-f479-43e9-a941-4a0de3973540', '{"action":"user_recovery_requested","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"user"}', '2024-12-10 20:49:57.833749+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a0829167-8da7-4ffd-8a32-f8b3dedb6506', '{"action":"login","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"account"}', '2024-12-10 20:50:05.207765+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cdc27bd6-1e54-4b79-9dd1-cb36fca08f74', '{"action":"user_recovery_requested","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"user"}', '2024-12-10 20:50:39.72227+00', ''),
	('00000000-0000-0000-0000-000000000000', '0a6a3b00-b4db-4e7d-b1b3-d15d268a28da', '{"action":"login","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"account"}', '2024-12-10 20:50:49.079324+00', ''),
	('00000000-0000-0000-0000-000000000000', '1751d48e-bb8a-49cc-bc52-641c7a2d41a7', '{"action":"user_recovery_requested","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"user"}', '2024-12-10 20:52:03.179937+00', ''),
	('00000000-0000-0000-0000-000000000000', '4015ab56-5af1-4246-a369-e1115c00c4bd', '{"action":"login","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"account"}', '2024-12-10 20:52:10.592751+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ab5f37ee-9ba3-465a-8c86-7250ab347593', '{"action":"user_recovery_requested","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"user"}', '2024-12-10 20:55:08.196099+00', ''),
	('00000000-0000-0000-0000-000000000000', '168ab819-95ac-45c8-a089-c7bf55a8f6fe', '{"action":"login","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"account"}', '2024-12-10 20:55:15.908966+00', ''),
	('00000000-0000-0000-0000-000000000000', '0be1a7e8-0128-4be4-939a-e3e3dc7acb32', '{"action":"user_recovery_requested","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"user"}', '2024-12-10 20:55:29.192989+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e396d162-b7cf-41fb-9b59-008b09c1950f', '{"action":"login","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"account"}', '2024-12-10 20:55:37.122253+00', ''),
	('00000000-0000-0000-0000-000000000000', 'be1f1fcb-f414-4cbe-b3fb-58235bcedbc3', '{"action":"user_recovery_requested","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"user"}', '2024-12-10 20:56:15.851783+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ac0fd978-a60b-46c9-80a9-25a26f540f23', '{"action":"login","actor_id":"5f173391-8587-4771-90a8-150cde9442b9","actor_username":"griddie@test.com","actor_via_sso":false,"log_type":"account"}', '2024-12-10 20:56:23.736296+00', ''),
	('00000000-0000-0000-0000-000000000000', '5f5ca0a9-52d7-4e05-ba0f-3727ac58d604', '{"action":"user_signedup","actor_id":"ab40abd0-4e62-4c15-a594-9fdea475be6d","actor_username":"marcus@sdsd.tsk","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-12-10 21:13:47.654482+00', ''),
	('00000000-0000-0000-0000-000000000000', '0b192324-c423-4494-8988-ba833fec2c7f', '{"action":"login","actor_id":"ab40abd0-4e62-4c15-a594-9fdea475be6d","actor_username":"marcus@sdsd.tsk","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-12-10 21:13:47.657579+00', ''),
	('00000000-0000-0000-0000-000000000000', '383bfda2-2334-4bc7-9a81-74d0a455be91', '{"action":"user_recovery_requested","actor_id":"ab40abd0-4e62-4c15-a594-9fdea475be6d","actor_username":"marcus@sdsd.tsk","actor_via_sso":false,"log_type":"user"}', '2024-12-10 21:13:47.660988+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ec621cd8-82e8-4537-8832-0251de0b7e1a', '{"action":"user_signedup","actor_id":"0d68e2a1-9b87-4640-b448-15a406dc652b","actor_username":"awdawd@ada","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-12-10 21:15:02.705506+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eee6f3ea-4e6d-4b1f-8977-1c18f552701d', '{"action":"login","actor_id":"0d68e2a1-9b87-4640-b448-15a406dc652b","actor_username":"awdawd@ada","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-12-10 21:15:02.707392+00', ''),
	('00000000-0000-0000-0000-000000000000', '1bf2e8ff-8b32-4dcf-8061-debe75bf9ff0', '{"action":"user_recovery_requested","actor_id":"0d68e2a1-9b87-4640-b448-15a406dc652b","actor_username":"awdawd@ada","actor_via_sso":false,"log_type":"user"}', '2024-12-10 21:15:02.709833+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a3cb16ee-e2df-40a3-8ddc-5d860d7b9757', '{"action":"user_recovery_requested","actor_id":"0d68e2a1-9b87-4640-b448-15a406dc652b","actor_username":"awdawd@ada","actor_via_sso":false,"log_type":"user"}', '2024-12-10 21:15:06.974882+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eff2fc86-5997-4991-959c-24e0be8eb7b8', '{"action":"user_recovery_requested","actor_id":"0d68e2a1-9b87-4640-b448-15a406dc652b","actor_username":"awdawd@ada","actor_via_sso":false,"log_type":"user"}', '2024-12-10 21:15:32.587677+00', ''),
	('00000000-0000-0000-0000-000000000000', '069cb098-c5c3-49b6-b171-c81472c64669', '{"action":"user_signedup","actor_id":"faf37ae6-779c-4ba7-8ff4-483517879ddc","actor_username":"awdawd@ada.dk","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-12-10 21:15:35.047766+00', ''),
	('00000000-0000-0000-0000-000000000000', '494f8f4f-0151-46c8-a963-4cf54e4e609f', '{"action":"login","actor_id":"faf37ae6-779c-4ba7-8ff4-483517879ddc","actor_username":"awdawd@ada.dk","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-12-10 21:15:35.048957+00', ''),
	('00000000-0000-0000-0000-000000000000', '374dd52e-4e89-42df-93b0-fe4b8c96f4d3', '{"action":"user_recovery_requested","actor_id":"faf37ae6-779c-4ba7-8ff4-483517879ddc","actor_username":"awdawd@ada.dk","actor_via_sso":false,"log_type":"user"}', '2024-12-10 21:15:35.051894+00', ''),
	('00000000-0000-0000-0000-000000000000', '527e8bc5-3648-4bed-a848-5438d684c447', '{"action":"user_recovery_requested","actor_id":"faf37ae6-779c-4ba7-8ff4-483517879ddc","actor_username":"awdawd@ada.dk","actor_via_sso":false,"log_type":"user"}', '2024-12-10 21:16:22.58976+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aabce3a3-1fe3-465e-a21f-da1a8fba6869', '{"action":"user_recovery_requested","actor_id":"faf37ae6-779c-4ba7-8ff4-483517879ddc","actor_username":"awdawd@ada.dk","actor_via_sso":false,"log_type":"user"}', '2024-12-10 21:16:53.458501+00', ''),
	('00000000-0000-0000-0000-000000000000', '3a24f7fd-da6a-49c0-a045-31cefb6a79f6', '{"action":"user_signedup","actor_id":"00712eab-739d-4c0e-b734-e1cfc3fbee01","actor_username":"marcus@adw.dk","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-12-10 21:17:22.099795+00', ''),
	('00000000-0000-0000-0000-000000000000', '88952693-be03-4100-b217-53bd34550510', '{"action":"login","actor_id":"00712eab-739d-4c0e-b734-e1cfc3fbee01","actor_username":"marcus@adw.dk","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-12-10 21:17:22.101049+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b3f45da5-5d90-4579-ab56-7078b2397fd6', '{"action":"user_recovery_requested","actor_id":"00712eab-739d-4c0e-b734-e1cfc3fbee01","actor_username":"marcus@adw.dk","actor_via_sso":false,"log_type":"user"}', '2024-12-10 21:17:22.103692+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a50ea0ee-7ca5-4eaa-9198-2fd5c19ea2c1', '{"action":"user_recovery_requested","actor_id":"00712eab-739d-4c0e-b734-e1cfc3fbee01","actor_username":"marcus@adw.dk","actor_via_sso":false,"log_type":"user"}', '2024-12-10 21:17:31.31927+00', ''),
	('00000000-0000-0000-0000-000000000000', '370612a2-948e-4bf4-a76d-be2b718c31fb', '{"action":"user_recovery_requested","actor_id":"00712eab-739d-4c0e-b734-e1cfc3fbee01","actor_username":"marcus@adw.dk","actor_via_sso":false,"log_type":"user"}', '2024-12-10 21:17:44.084591+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd20cdef9-d7ba-4e52-9d96-58b61c56b781', '{"action":"login","actor_id":"00712eab-739d-4c0e-b734-e1cfc3fbee01","actor_username":"marcus@adw.dk","actor_via_sso":false,"log_type":"account"}', '2024-12-10 21:17:58.45629+00', ''),
	('00000000-0000-0000-0000-000000000000', '1441607b-6419-4d44-b284-1e01ca796f9b', '{"action":"user_signedup","actor_id":"56196814-8651-4ab3-8d4f-3660ba0dbc34","actor_username":"gy@dk.dk","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-12-10 21:19:42.324587+00', ''),
	('00000000-0000-0000-0000-000000000000', '6a5d9b33-aae6-4a6b-9cf8-00a871a78a59', '{"action":"login","actor_id":"56196814-8651-4ab3-8d4f-3660ba0dbc34","actor_username":"gy@dk.dk","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-12-10 21:19:42.327004+00', ''),
	('00000000-0000-0000-0000-000000000000', '3ba9ef28-59a7-4424-a7ff-b990a94d51ca', '{"action":"user_recovery_requested","actor_id":"56196814-8651-4ab3-8d4f-3660ba0dbc34","actor_username":"gy@dk.dk","actor_via_sso":false,"log_type":"user"}', '2024-12-10 21:19:42.330536+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fcd8dd29-09f8-4c47-8901-3e6d3e5d04c3', '{"action":"user_signedup","actor_id":"d479aa7d-7b9c-43ca-8706-c109dcb2e961","actor_username":"awdawd@dkdkd.dk","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-12-10 21:34:10.690105+00', ''),
	('00000000-0000-0000-0000-000000000000', '8e76cc26-9a5a-490b-b8ac-f825bde530a8', '{"action":"login","actor_id":"d479aa7d-7b9c-43ca-8706-c109dcb2e961","actor_username":"awdawd@dkdkd.dk","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-12-10 21:34:10.691831+00', ''),
	('00000000-0000-0000-0000-000000000000', '37bee036-36ff-41f6-a105-babac167cb01', '{"action":"user_recovery_requested","actor_id":"d479aa7d-7b9c-43ca-8706-c109dcb2e961","actor_username":"awdawd@dkdkd.dk","actor_via_sso":false,"log_type":"user"}', '2024-12-10 21:34:10.695424+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'ab40abd0-4e62-4c15-a594-9fdea475be6d', 'authenticated', 'authenticated', 'marcus@sdsd.tsk', '$2a$10$BbgyYq0VhU7K5d4Vj4ImmOJgZO6r22LevuQos6YrPHj.QNdOsvnra', '2024-12-10 21:13:47.654846+00', NULL, '', NULL, 'b2d59111f1cb8d97f70447614966dc46d52654c2ab06c3f5b0318ab8', '2024-12-10 21:13:47.661244+00', '', '', NULL, '2024-12-10 21:13:47.657828+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "ab40abd0-4e62-4c15-a594-9fdea475be6d", "email": "marcus@sdsd.tsk", "email_verified": false, "phone_verified": false}', NULL, '2024-12-10 21:13:47.650056+00', '2024-12-10 21:13:47.663478+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'faf37ae6-779c-4ba7-8ff4-483517879ddc', 'authenticated', 'authenticated', 'awdawd@ada.dk', '$2a$10$gHSjVVfOxSMXi15SDO4Ex.dfDV4eav9CB7Ld7LSx1ZFZugITqxSxi', '2024-12-10 21:15:35.048033+00', NULL, '', NULL, 'bdd5210fef4262b21c1d46e10b209eadc2085ea5eb0c98cf3446dd03', '2024-12-10 21:16:53.458937+00', '', '', NULL, '2024-12-10 21:15:35.049469+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "faf37ae6-779c-4ba7-8ff4-483517879ddc", "email": "awdawd@ada.dk", "email_verified": false, "phone_verified": false}', NULL, '2024-12-10 21:15:35.045332+00', '2024-12-10 21:16:53.460726+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '5f173391-8587-4771-90a8-150cde9442b9', 'authenticated', 'authenticated', 'griddie@test.com', '$2a$10$AcYZSj6S6gOliKXzLmYTBeyg.JVk/47nY4Vgu/tU3u08Nq/RP2ADO', '2024-12-10 20:34:24.228807+00', NULL, '', NULL, '', '2024-12-10 20:56:15.852206+00', '', '', NULL, '2024-12-10 20:56:23.737541+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "5f173391-8587-4771-90a8-150cde9442b9", "email": "griddie@test.com", "email_verified": false, "phone_verified": false}', NULL, '2024-12-10 20:34:24.225619+00', '2024-12-10 20:56:23.742908+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '00712eab-739d-4c0e-b734-e1cfc3fbee01', 'authenticated', 'authenticated', 'marcus@adw.dk', '$2a$10$FWHZKJGf9xdsdmD4JpwnOOBMutN9huyz6E3mysoW2CXRrXb3xj6kG', '2024-12-10 21:17:22.10011+00', NULL, '', NULL, '', '2024-12-10 21:17:44.085954+00', '', '', NULL, '2024-12-10 21:17:58.457159+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "00712eab-739d-4c0e-b734-e1cfc3fbee01", "email": "marcus@adw.dk", "email_verified": false, "phone_verified": false}', NULL, '2024-12-10 21:17:22.096445+00', '2024-12-10 21:17:58.458133+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '0d68e2a1-9b87-4640-b448-15a406dc652b', 'authenticated', 'authenticated', 'awdawd@ada', '$2a$10$9M8wLlKHOjL.vASZcszdCepQQc6dNwTf69kHBFh9aJYTdPz.xkPme', '2024-12-10 21:15:02.705809+00', NULL, '', NULL, '1554f2bbe3967177d7cec50ec77de62b1716a39a303dc86f565ae654', '2024-12-10 21:15:32.588157+00', '', '', NULL, '2024-12-10 21:15:02.707627+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "0d68e2a1-9b87-4640-b448-15a406dc652b", "email": "awdawd@ada", "email_verified": false, "phone_verified": false}', NULL, '2024-12-10 21:15:02.703177+00', '2024-12-10 21:15:32.593018+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'd479aa7d-7b9c-43ca-8706-c109dcb2e961', 'authenticated', 'authenticated', 'awdawd@dkdkd.dk', '$2a$10$gYArtOMaDo/1sN6yNjlUx.lPgjcjndezkKuyokJZvXfiRzYx0ZiUi', '2024-12-10 21:34:10.690508+00', NULL, '', NULL, '9008a6639eda0a2323f134b892b95d070a91ba2de16a46cf0ae5e16f', '2024-12-10 21:34:10.695743+00', '', '', NULL, '2024-12-10 21:34:10.692129+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "d479aa7d-7b9c-43ca-8706-c109dcb2e961", "email": "awdawd@dkdkd.dk", "email_verified": false, "phone_verified": false}', NULL, '2024-12-10 21:34:10.686136+00', '2024-12-10 21:34:10.699106+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '56196814-8651-4ab3-8d4f-3660ba0dbc34', 'authenticated', 'authenticated', 'gy@dk.dk', '$2a$10$Sc3eXzh3r4YcaRdDUbcT8OtXm2lBM.ueizA8rMuAZ5gZflKPwiIAW', '2024-12-10 21:19:42.325+00', NULL, '', NULL, 'ed78970a9500e69d3ba1614a31c47ef0c2b3453b8d197f03f8958f9a', '2024-12-10 21:19:42.330745+00', '', '', NULL, '2024-12-10 21:19:42.327256+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "56196814-8651-4ab3-8d4f-3660ba0dbc34", "email": "gy@dk.dk", "email_verified": false, "phone_verified": false}', NULL, '2024-12-10 21:19:42.320594+00', '2024-12-10 21:19:42.333474+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('5f173391-8587-4771-90a8-150cde9442b9', '5f173391-8587-4771-90a8-150cde9442b9', '{"sub": "5f173391-8587-4771-90a8-150cde9442b9", "email": "griddie@test.com", "email_verified": false, "phone_verified": false}', 'email', '2024-12-10 20:34:24.227195+00', '2024-12-10 20:34:24.227218+00', '2024-12-10 20:34:24.227218+00', '53353855-d094-4a7d-962e-9c1b0e75832e'),
	('ab40abd0-4e62-4c15-a594-9fdea475be6d', 'ab40abd0-4e62-4c15-a594-9fdea475be6d', '{"sub": "ab40abd0-4e62-4c15-a594-9fdea475be6d", "email": "marcus@sdsd.tsk", "email_verified": false, "phone_verified": false}', 'email', '2024-12-10 21:13:47.652916+00', '2024-12-10 21:13:47.65295+00', '2024-12-10 21:13:47.65295+00', '0162566b-9e1c-4b4c-84c1-1897b8c5a20b'),
	('0d68e2a1-9b87-4640-b448-15a406dc652b', '0d68e2a1-9b87-4640-b448-15a406dc652b', '{"sub": "0d68e2a1-9b87-4640-b448-15a406dc652b", "email": "awdawd@ada", "email_verified": false, "phone_verified": false}', 'email', '2024-12-10 21:15:02.704576+00', '2024-12-10 21:15:02.704608+00', '2024-12-10 21:15:02.704608+00', 'e7d3baf5-81a2-4f41-9dc8-980cbd338228'),
	('faf37ae6-779c-4ba7-8ff4-483517879ddc', 'faf37ae6-779c-4ba7-8ff4-483517879ddc', '{"sub": "faf37ae6-779c-4ba7-8ff4-483517879ddc", "email": "awdawd@ada.dk", "email_verified": false, "phone_verified": false}', 'email', '2024-12-10 21:15:35.046698+00', '2024-12-10 21:15:35.046718+00', '2024-12-10 21:15:35.046718+00', '4f653701-79a5-4029-b12f-38d34383a8d8'),
	('00712eab-739d-4c0e-b734-e1cfc3fbee01', '00712eab-739d-4c0e-b734-e1cfc3fbee01', '{"sub": "00712eab-739d-4c0e-b734-e1cfc3fbee01", "email": "marcus@adw.dk", "email_verified": false, "phone_verified": false}', 'email', '2024-12-10 21:17:22.098351+00', '2024-12-10 21:17:22.098375+00', '2024-12-10 21:17:22.098375+00', '5b5ce84a-be8a-4683-a705-a7c6cc71321c'),
	('56196814-8651-4ab3-8d4f-3660ba0dbc34', '56196814-8651-4ab3-8d4f-3660ba0dbc34', '{"sub": "56196814-8651-4ab3-8d4f-3660ba0dbc34", "email": "gy@dk.dk", "email_verified": false, "phone_verified": false}', 'email', '2024-12-10 21:19:42.323098+00', '2024-12-10 21:19:42.323121+00', '2024-12-10 21:19:42.323121+00', 'd361a470-18ba-42e3-b0c3-683967209680'),
	('d479aa7d-7b9c-43ca-8706-c109dcb2e961', 'd479aa7d-7b9c-43ca-8706-c109dcb2e961', '{"sub": "d479aa7d-7b9c-43ca-8706-c109dcb2e961", "email": "awdawd@dkdkd.dk", "email_verified": false, "phone_verified": false}', 'email', '2024-12-10 21:34:10.68873+00', '2024-12-10 21:34:10.688766+00', '2024-12-10 21:34:10.688766+00', '30c9819b-282c-4b05-90db-11272639ebcb');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('fe20bc5b-7af8-486f-b784-199cec7fc6bd', '5f173391-8587-4771-90a8-150cde9442b9', '2024-12-10 20:34:24.230558+00', '2024-12-10 20:34:24.230558+00', NULL, 'aal1', NULL, NULL, 'Expo/2.32.12 CFNetwork/1568.100.1 Darwin/24.1.0', '192.168.65.1', NULL),
	('9175a597-d69e-4e37-83b0-c19fe1e89ee9', '5f173391-8587-4771-90a8-150cde9442b9', '2024-12-10 20:34:36.445094+00', '2024-12-10 20:34:36.445094+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', '192.168.65.1', NULL),
	('122362cf-d1d5-41e2-91e8-25614a3a0e8a', '5f173391-8587-4771-90a8-150cde9442b9', '2024-12-10 20:40:52.696485+00', '2024-12-10 20:40:52.696485+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', '192.168.65.1', NULL),
	('efaf9b2d-5e5e-459b-932d-aa609dcee320', '5f173391-8587-4771-90a8-150cde9442b9', '2024-12-10 20:47:42.204872+00', '2024-12-10 20:47:42.204872+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1', '192.168.65.1', NULL),
	('cc2b7229-79f5-4028-bbbd-009c9a19419a', '5f173391-8587-4771-90a8-150cde9442b9', '2024-12-10 20:50:05.209+00', '2024-12-10 20:50:05.209+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', '192.168.65.1', NULL),
	('2fe95dc3-1ddd-41a4-b4d4-6010c749e735', '5f173391-8587-4771-90a8-150cde9442b9', '2024-12-10 20:50:49.080123+00', '2024-12-10 20:50:49.080123+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1', '192.168.65.1', NULL),
	('dd4a6d49-db69-45b2-adee-a5008ee33bce', '5f173391-8587-4771-90a8-150cde9442b9', '2024-12-10 20:52:10.593758+00', '2024-12-10 20:52:10.593758+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1', '192.168.65.1', NULL),
	('aaed3212-22ed-4b08-a45b-a0b3bca0fdd1', '5f173391-8587-4771-90a8-150cde9442b9', '2024-12-10 20:55:15.910022+00', '2024-12-10 20:55:15.910022+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1', '192.168.65.1', NULL),
	('860d62d5-b6fe-4e11-993e-78f941dfc660', '5f173391-8587-4771-90a8-150cde9442b9', '2024-12-10 20:55:37.123175+00', '2024-12-10 20:55:37.123175+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1', '192.168.65.1', NULL),
	('03e16ad7-b063-4998-ba91-419729403a41', '5f173391-8587-4771-90a8-150cde9442b9', '2024-12-10 20:56:23.737572+00', '2024-12-10 20:56:23.737572+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1', '192.168.65.1', NULL),
	('cabb699d-4fd2-466a-b4e8-4c861c185aa2', 'ab40abd0-4e62-4c15-a594-9fdea475be6d', '2024-12-10 21:13:47.657861+00', '2024-12-10 21:13:47.657861+00', NULL, 'aal1', NULL, NULL, 'Expo/2.32.12 CFNetwork/1568.100.1 Darwin/24.1.0', '192.168.65.1', NULL),
	('8a40c381-d363-4411-bea6-cd4257e57902', '0d68e2a1-9b87-4640-b448-15a406dc652b', '2024-12-10 21:15:02.707659+00', '2024-12-10 21:15:02.707659+00', NULL, 'aal1', NULL, NULL, 'Expo/2.32.12 CFNetwork/1568.100.1 Darwin/24.1.0', '192.168.65.1', NULL),
	('1e9c7f47-5990-4755-b0a1-4a054c83e3f9', 'faf37ae6-779c-4ba7-8ff4-483517879ddc', '2024-12-10 21:15:35.049507+00', '2024-12-10 21:15:35.049507+00', NULL, 'aal1', NULL, NULL, 'Expo/2.32.12 CFNetwork/1568.100.1 Darwin/24.1.0', '192.168.65.1', NULL),
	('97aa0a34-1e2d-48fd-b80a-4b009383df41', '00712eab-739d-4c0e-b734-e1cfc3fbee01', '2024-12-10 21:17:22.101343+00', '2024-12-10 21:17:22.101343+00', NULL, 'aal1', NULL, NULL, 'Expo/2.32.12 CFNetwork/1568.100.1 Darwin/24.1.0', '192.168.65.1', NULL),
	('a565da0a-7f3c-46d7-82da-050c80cdaebf', '00712eab-739d-4c0e-b734-e1cfc3fbee01', '2024-12-10 21:17:58.45719+00', '2024-12-10 21:17:58.45719+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1', '192.168.65.1', NULL),
	('0d2637c8-b92d-4d5c-b73b-2cf1e486dea0', '56196814-8651-4ab3-8d4f-3660ba0dbc34', '2024-12-10 21:19:42.327297+00', '2024-12-10 21:19:42.327297+00', NULL, 'aal1', NULL, NULL, 'Expo/2.32.12 CFNetwork/1568.100.1 Darwin/24.1.0', '192.168.65.1', NULL),
	('ce5166ca-ae54-42e5-bb94-c5a1d44894d4', 'd479aa7d-7b9c-43ca-8706-c109dcb2e961', '2024-12-10 21:34:10.692185+00', '2024-12-10 21:34:10.692185+00', NULL, 'aal1', NULL, NULL, 'Expo/2.32.12 CFNetwork/1568.100.1 Darwin/24.1.0', '192.168.65.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('fe20bc5b-7af8-486f-b784-199cec7fc6bd', '2024-12-10 20:34:24.231702+00', '2024-12-10 20:34:24.231702+00', 'password', '4c6496df-1255-4ae8-b8c7-c724e8de65fa'),
	('9175a597-d69e-4e37-83b0-c19fe1e89ee9', '2024-12-10 20:34:36.445984+00', '2024-12-10 20:34:36.445984+00', 'otp', 'cf3ed36e-a4a0-4943-b873-6bc260cd164c'),
	('122362cf-d1d5-41e2-91e8-25614a3a0e8a', '2024-12-10 20:40:52.69754+00', '2024-12-10 20:40:52.69754+00', 'otp', 'b175b394-4feb-4baa-884f-30cbdbd1afbc'),
	('efaf9b2d-5e5e-459b-932d-aa609dcee320', '2024-12-10 20:47:42.206488+00', '2024-12-10 20:47:42.206488+00', 'otp', 'a79ca05a-1ef8-4695-a77f-fe337d790317'),
	('cc2b7229-79f5-4028-bbbd-009c9a19419a', '2024-12-10 20:50:05.210713+00', '2024-12-10 20:50:05.210713+00', 'otp', '7eef4a68-39fe-4998-9baf-3fc8bd637f41'),
	('2fe95dc3-1ddd-41a4-b4d4-6010c749e735', '2024-12-10 20:50:49.080973+00', '2024-12-10 20:50:49.080973+00', 'otp', '174a8425-851a-4b09-9959-e3310d517540'),
	('dd4a6d49-db69-45b2-adee-a5008ee33bce', '2024-12-10 20:52:10.594739+00', '2024-12-10 20:52:10.594739+00', 'otp', 'ec27e9ff-a2f1-4004-80fc-b8af5695ed03'),
	('aaed3212-22ed-4b08-a45b-a0b3bca0fdd1', '2024-12-10 20:55:15.911197+00', '2024-12-10 20:55:15.911197+00', 'otp', '9e0847ef-5ea7-43f9-a404-bcb045dd321e'),
	('860d62d5-b6fe-4e11-993e-78f941dfc660', '2024-12-10 20:55:37.12416+00', '2024-12-10 20:55:37.12416+00', 'otp', 'f3850679-ad4b-4663-be13-41197521b602'),
	('03e16ad7-b063-4998-ba91-419729403a41', '2024-12-10 20:56:23.74359+00', '2024-12-10 20:56:23.74359+00', 'otp', '5a826231-f414-47f9-afbd-b049b7f50b29'),
	('cabb699d-4fd2-466a-b4e8-4c861c185aa2', '2024-12-10 21:13:47.659047+00', '2024-12-10 21:13:47.659047+00', 'password', '76e0140d-4ff9-4246-ade9-4e47ab0ec0e2'),
	('8a40c381-d363-4411-bea6-cd4257e57902', '2024-12-10 21:15:02.708392+00', '2024-12-10 21:15:02.708392+00', 'password', '7848b738-cef5-4ac6-8aca-2c2a1c28e1a9'),
	('1e9c7f47-5990-4755-b0a1-4a054c83e3f9', '2024-12-10 21:15:35.050436+00', '2024-12-10 21:15:35.050436+00', 'password', 'c12b596e-235b-4851-b224-b94f715a4c14'),
	('97aa0a34-1e2d-48fd-b80a-4b009383df41', '2024-12-10 21:17:22.102196+00', '2024-12-10 21:17:22.102196+00', 'password', 'fe672692-1509-40b5-bc42-9b67f37f7d7a'),
	('a565da0a-7f3c-46d7-82da-050c80cdaebf', '2024-12-10 21:17:58.458253+00', '2024-12-10 21:17:58.458253+00', 'otp', '94cba59a-91cc-4f36-ba9b-c468b7a48a39'),
	('0d2637c8-b92d-4d5c-b73b-2cf1e486dea0', '2024-12-10 21:19:42.328482+00', '2024-12-10 21:19:42.328482+00', 'password', 'f83c16e7-28ef-4f6a-a35d-9be516110db1'),
	('ce5166ca-ae54-42e5-bb94-c5a1d44894d4', '2024-12-10 21:34:10.693504+00', '2024-12-10 21:34:10.693504+00', 'password', '3de75c56-0de2-43cd-9bd9-241c08ec7440');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") VALUES
	('33de61c1-bd9e-4c2e-bb56-993cf9dacff8', 'ab40abd0-4e62-4c15-a594-9fdea475be6d', 'recovery_token', 'b2d59111f1cb8d97f70447614966dc46d52654c2ab06c3f5b0318ab8', 'marcus@sdsd.tsk', '2024-12-10 21:13:47.663958', '2024-12-10 21:13:47.663958'),
	('ec705fbd-39d7-4d0b-bc0f-198d4a450469', '0d68e2a1-9b87-4640-b448-15a406dc652b', 'recovery_token', '1554f2bbe3967177d7cec50ec77de62b1716a39a303dc86f565ae654', 'awdawd@ada', '2024-12-10 21:15:32.594128', '2024-12-10 21:15:32.594128'),
	('e71667a5-4dac-481e-917e-e639071259f6', 'faf37ae6-779c-4ba7-8ff4-483517879ddc', 'recovery_token', 'bdd5210fef4262b21c1d46e10b209eadc2085ea5eb0c98cf3446dd03', 'awdawd@ada.dk', '2024-12-10 21:16:53.461147', '2024-12-10 21:16:53.461147'),
	('2ec02416-7549-4a38-babe-1a066a1a2aee', '56196814-8651-4ab3-8d4f-3660ba0dbc34', 'recovery_token', 'ed78970a9500e69d3ba1614a31c47ef0c2b3453b8d197f03f8958f9a', 'gy@dk.dk', '2024-12-10 21:19:42.333903', '2024-12-10 21:19:42.333903'),
	('b2d81c72-9bd2-4591-bcaf-642b2efe102e', 'd479aa7d-7b9c-43ca-8706-c109dcb2e961', 'recovery_token', '9008a6639eda0a2323f134b892b95d070a91ba2de16a46cf0ae5e16f', 'awdawd@dkdkd.dk', '2024-12-10 21:34:10.699787', '2024-12-10 21:34:10.699787');


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 4, 'hTRPIkBr4aj5V5AvirnC-g', '5f173391-8587-4771-90a8-150cde9442b9', false, '2024-12-10 20:34:24.231002+00', '2024-12-10 20:34:24.231002+00', NULL, 'fe20bc5b-7af8-486f-b784-199cec7fc6bd'),
	('00000000-0000-0000-0000-000000000000', 5, '9EkBD26yXpcVZ1f5jhL7oQ', '5f173391-8587-4771-90a8-150cde9442b9', false, '2024-12-10 20:34:36.445503+00', '2024-12-10 20:34:36.445503+00', NULL, '9175a597-d69e-4e37-83b0-c19fe1e89ee9'),
	('00000000-0000-0000-0000-000000000000', 6, 'wNj2u-jHKxp5cQpRuxz3Qw', '5f173391-8587-4771-90a8-150cde9442b9', false, '2024-12-10 20:40:52.696936+00', '2024-12-10 20:40:52.696936+00', NULL, '122362cf-d1d5-41e2-91e8-25614a3a0e8a'),
	('00000000-0000-0000-0000-000000000000', 7, 'WUBd3RE6aEq8rTx7FD0Prw', '5f173391-8587-4771-90a8-150cde9442b9', false, '2024-12-10 20:47:42.205457+00', '2024-12-10 20:47:42.205457+00', NULL, 'efaf9b2d-5e5e-459b-932d-aa609dcee320'),
	('00000000-0000-0000-0000-000000000000', 40, 'QtrS61jkGDo6pXkCm1Bj6Q', '5f173391-8587-4771-90a8-150cde9442b9', false, '2024-12-10 20:50:05.209676+00', '2024-12-10 20:50:05.209676+00', NULL, 'cc2b7229-79f5-4028-bbbd-009c9a19419a'),
	('00000000-0000-0000-0000-000000000000', 41, 'r-JOGE_4hgo7BxLEbss6EQ', '5f173391-8587-4771-90a8-150cde9442b9', false, '2024-12-10 20:50:49.080462+00', '2024-12-10 20:50:49.080462+00', NULL, '2fe95dc3-1ddd-41a4-b4d4-6010c749e735'),
	('00000000-0000-0000-0000-000000000000', 42, 'ZGfh3LK1LQChQyv_bnTOdw', '5f173391-8587-4771-90a8-150cde9442b9', false, '2024-12-10 20:52:10.594129+00', '2024-12-10 20:52:10.594129+00', NULL, 'dd4a6d49-db69-45b2-adee-a5008ee33bce'),
	('00000000-0000-0000-0000-000000000000', 43, '04UxUh6DyZvtXza1pqQX7Q', '5f173391-8587-4771-90a8-150cde9442b9', false, '2024-12-10 20:55:15.910444+00', '2024-12-10 20:55:15.910444+00', NULL, 'aaed3212-22ed-4b08-a45b-a0b3bca0fdd1'),
	('00000000-0000-0000-0000-000000000000', 44, 'QA3T37kGASjnVP12j5uCOw', '5f173391-8587-4771-90a8-150cde9442b9', false, '2024-12-10 20:55:37.123547+00', '2024-12-10 20:55:37.123547+00', NULL, '860d62d5-b6fe-4e11-993e-78f941dfc660'),
	('00000000-0000-0000-0000-000000000000', 45, '5-uqoabDyRZFVlBU2DAgEw', '5f173391-8587-4771-90a8-150cde9442b9', false, '2024-12-10 20:56:23.738092+00', '2024-12-10 20:56:23.738092+00', NULL, '03e16ad7-b063-4998-ba91-419729403a41'),
	('00000000-0000-0000-0000-000000000000', 46, 'J5HZ_UOP7NOXzU6PUPY1zw', 'ab40abd0-4e62-4c15-a594-9fdea475be6d', false, '2024-12-10 21:13:47.658328+00', '2024-12-10 21:13:47.658328+00', NULL, 'cabb699d-4fd2-466a-b4e8-4c861c185aa2'),
	('00000000-0000-0000-0000-000000000000', 47, '2wcTdZpfhxq7yc9ype4nxA', '0d68e2a1-9b87-4640-b448-15a406dc652b', false, '2024-12-10 21:15:02.707926+00', '2024-12-10 21:15:02.707926+00', NULL, '8a40c381-d363-4411-bea6-cd4257e57902'),
	('00000000-0000-0000-0000-000000000000', 48, 'LhSTOuZJrmeqgLAxXpPvNQ', 'faf37ae6-779c-4ba7-8ff4-483517879ddc', false, '2024-12-10 21:15:35.049869+00', '2024-12-10 21:15:35.049869+00', NULL, '1e9c7f47-5990-4755-b0a1-4a054c83e3f9'),
	('00000000-0000-0000-0000-000000000000', 49, 'CUvhiepJzKNXl57WfRsqGA', '00712eab-739d-4c0e-b734-e1cfc3fbee01', false, '2024-12-10 21:17:22.101686+00', '2024-12-10 21:17:22.101686+00', NULL, '97aa0a34-1e2d-48fd-b80a-4b009383df41'),
	('00000000-0000-0000-0000-000000000000', 50, 'qzRuGXT272UueKi-3_bK9w', '00712eab-739d-4c0e-b734-e1cfc3fbee01', false, '2024-12-10 21:17:58.457575+00', '2024-12-10 21:17:58.457575+00', NULL, 'a565da0a-7f3c-46d7-82da-050c80cdaebf'),
	('00000000-0000-0000-0000-000000000000', 51, 'WTTsIXVmZW0FG2NU9Z0oFw', '56196814-8651-4ab3-8d4f-3660ba0dbc34', false, '2024-12-10 21:19:42.327753+00', '2024-12-10 21:19:42.327753+00', NULL, '0d2637c8-b92d-4d5c-b73b-2cf1e486dea0'),
	('00000000-0000-0000-0000-000000000000', 52, 'e3J0HFnzAAnLDyjemkvvyQ', 'd479aa7d-7b9c-43ca-8706-c109dcb2e961', false, '2024-12-10 21:34:10.692713+00', '2024-12-10 21:34:10.692713+00', NULL, 'ce5166ca-ae54-42e5-bb94-c5a1d44894d4');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 52, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
