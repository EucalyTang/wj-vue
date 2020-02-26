import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import AppIndex from '../components/home/AppIndex'
import Login from '../components/Login'
import Home from '../components/Home'
import LibraryIndex from '../components/library/LibraryIndex'
import Register from '../components/Register'
import AdminIndex from '../components/admin/AdminIndex'
import Editor from '../components/admin/content/ArticleEditor'
import Articles from '../components/jotter/Articles'
import ArticleDetails from '../components/jotter/ArticleDetails'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
			path: '/',
			name: 'Default',
			redirect: '/home',
			component: Home
		},
		{
			path: '/home',
			name: 'Home',
			component: Home,
			redirect: '/index',
			children: [{
					path: '/index',
					name: 'AppIndex',
					component: AppIndex,
					meta: {
						requireAuth: true
					}
				},
				{
					path: '/library',
					name: 'Library',
					component: LibraryIndex,
					meta: {
						requireAuth: true
					}
				},
				{
					path: '/admin/content/editor',
					name: 'Editor',
					component: Editor,
					meta: {
						requireAuth: true
					}
				},
				{
					path: '/jotter',
					name: 'Jotter',
					component: Articles
				},
				{
					path: '/jotter/article',
					name: 'Article',
					component: ArticleDetails
				}
			]
		},
		// 下面都是固定的写法
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
		},
		{
			path: '/admin',
			name: 'Admin',
			component: AdminIndex,
			meta: {
				requireAuth: true
			}
		}
	]
})

// 用于创建默认路由
export const createRouter = routes => new Router({
	mode: 'history',
	routes: [{
			path: '/',
			name: 'Default',
			redirect: '/home',
			component: Home
		},
		{
			// home页面并不需要被访问，只是作为其它组件的父组件
			path: '/home',
			name: 'Home',
			component: Home,
			redirect: '/index',
			children: [{
					path: '/index',
					name: 'AppIndex',
					component: AppIndex
				},
				{
					path: '/library',
					name: 'Library',
					component: LibraryIndex
				},
				{
					path: '/admin/content/editor',
					name: 'Editor',
					component: Editor,
					meta: {
						requireAuth: true
					}
				},
				{
					path: '/jotter',
					name: 'Jotter',
					component: Articles
				},
				{
					path: '/jotter/article',
					name: 'Article',
					component: ArticleDetails
				}
			]
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
		},
		{
			path: '/admin',
			name: 'Admin',
			component: AdminIndex,
			meta: {
				requireAuth: true
			}
		}
	]
})
