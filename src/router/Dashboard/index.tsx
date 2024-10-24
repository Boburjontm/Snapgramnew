import { lazy, LazyExoticComponent, Suspense } from 'react' // React'dan Suspense'ni import qilamiz
import { Route, Routes } from 'react-router-dom'
import Aside from '../../components/sidebar/SideBar'
import NotFound from '../../pages/Dashboard/404/404'

function DashboardRoutes() {
    const Home:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/home/Home'))
    const Explore:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/explore/Explore'))
    const Reels:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/reels/Reels'))
    const Profile:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/profile/Profile'))
    const PostPage:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/post/Post'))
    const PostModal:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/modal/Modal'))
    const SavedPost:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/saved/Saved'))
    const CreatePost:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/createPost/CreatePost'))
    const EditProfile:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/editProfile/EditProfile'))
    const AllUser:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/Users/Users'))
    const Notification:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/notification/Notification'))
    const Chats:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/chat/Chat'))
    const People:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/people/People'))

    return (
        <main className='grid grid-cols-12'>
            <Aside/>
            <div className='col-span-10'>
            <Routes>
                <Route path='/' element={<Suspense fallback={<div>Loading...</div>}><Home/></Suspense>}/>
                <Route path='/explore' element={<Suspense fallback={<div>Loading...</div>}><Explore/></Suspense>}/>
                <Route path='/people' element={<Suspense fallback={<div>Loading...</div>}><People/></Suspense>}/>
                <Route path='/reels' element={<Suspense fallback={<div>Loading...</div>}><Reels/></Suspense>}/>
                <Route path='/profile' element={<Suspense fallback={<div>Loading...</div>}><Profile/></Suspense>}/>
                <Route path='/post_page' element={<Suspense fallback={<div>Loading...</div>}><PostPage/></Suspense>}/>
                <Route path='/post-modal' element={<Suspense fallback={<div>Loading...</div>}><PostModal/></Suspense>}/>
                <Route path='/saved' element={<Suspense fallback={<div>Loading...</div>}><SavedPost/></Suspense>}/>
                <Route path='/create' element={<Suspense fallback={<div>Loading...</div>}><CreatePost/></Suspense>}/>
                <Route path='/edit' element={<Suspense fallback={<div>Loading...</div>}><EditProfile/></Suspense>}/>
                <Route path='/all-users' element={<Suspense fallback={<div>Loading...</div>}><AllUser/></Suspense>}/>
                <Route path='/notifications' element={<Suspense fallback={<div>Loading...</div>}><Notification/></Suspense>}/>
                <Route path='/chats' element={<Suspense fallback={<div>Loading...</div>}><Chats/></Suspense>}/>
                <Route path='*' element={<Suspense fallback={<div>Loading...</div>}><NotFound/></Suspense>}/>
            </Routes>
            </div>
        </main>
    )
}

export default DashboardRoutes
