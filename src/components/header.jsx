import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, UserButton, SignInButton, SignIn, useUser } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";


const Header = () => {
  const[showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch ] = useSearchParams();

  const { user } = useUser();

  useEffect(()=>{
    if(search.get("sign-in")){
      setShowSignIn(true);
    }
  }, [search])

  const handleOverlayClick = (e) => {
    if(e.target === e.currentTarget){
      setShowSignIn(false);

      // empties the search query params when the overlay is clicked
      setSearch({});
    }
  }
  return (
    <>
      <nav className='py-4 px-10 flex justify-between items-center'>
          <h1 className='gradient-title font-extrabold text-4xl pb-5'>Arogya <span>🩺</span> </h1>
          

          <div className='flex gap-8'>
            <SignedOut></SignedOut>
            <SignedOut>
              <Button variant="outline" onClick={()=> setShowSignIn(true)}>Login</Button>
            </SignedOut>

            <SignedIn>
              {/* added a condition here such that :post a job" button is only visible to employers */}
              {user?.unsafeMetadata?.role === "recruiter" && (
                <Link to="/post-job">
                  <Button variant="destructive" className="rounded-full">
                    <PenBox size={20} className="mr-2" />
                    Add your Hospital
                  </Button>
                </Link>
              )}

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
            >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Hospitals"
                    labelIcon={<BriefcaseBusiness size={15} />}
                    href="/my-jobs"
                  />
                  <UserButton.Link
                    label="Check Later"
                    labelIcon={<Heart size={15} />}
                    href="/saved-jobs"
                  />
                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </div>
      </nav>

      {/* this part of code is for the sign in modal */}
      {showSignIn && (
        <div className='fixed inset-0 items-center justify-center flex bg-black bg-opacity-50'
        onClick={handleOverlayClick}>
          <SignIn 
          signUpForceRedirectUrl = '/onboarding'
          fallbackRedirectUrl = '/onboarding'/>
        </div>
      )}
    </>
  )
}

export default Header