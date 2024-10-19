import { lazy, LazyExoticComponent } from 'react'
import { Route, Routes } from 'react-router-dom'
import { SuspenseComponent as Suspense } from '../../utils'
import Aside from '../../components/side/Side'
import NotFound from '../../pages/Dashboard/notFound/NotFound'

function DashboardRoutes() {
    const Home:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/home/Home'))
    const Explore:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/explore/Explore'))
    const Reels:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/reels/Reels'))
    const MyProfile:LazyExoticComponent<any> = lazy(() => import('../../pages/Dashboard/profile/Profile'))
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
            <Route path='/' element={<Suspense><Home/></Suspense>}/>
            <Route path='/explore' element={<Suspense><Explore/></Suspense>}/>
            <Route path='/people' element={<Suspense><People/></Suspense>}/>
            <Route path='/reels' element={<Suspense><Reels/></Suspense>}/>
            <Route path='/my_profile' element={<Suspense><MyProfile/></Suspense>}/>
            <Route path='/post_page' element={<Suspense><PostPage/></Suspense>}/>
            <Route path='/post-modal' element={<Suspense><PostModal/></Suspense>}/>
            <Route path='/saved' element={<Suspense><SavedPost/></Suspense>}/>
            <Route path='/create' element={<Suspense><CreatePost/></Suspense>}/>
            <Route path='/edit' element={<Suspense><EditProfile/></Suspense>}/>
            <Route path='/all-users' element={<Suspense><AllUser/></Suspense>}/>
            <Route path='/notifications' element={<Suspense><Notification/></Suspense>}/>
            <Route path='/chats' element={<Suspense><Chats/></Suspense>}/>
            <Route path='*' element={<Suspense><NotFound/></Suspense>}/>
        </Routes>
        </div>
    </main>
  )
}

export default DashboardRoutes