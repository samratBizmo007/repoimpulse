<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;


class DashboardController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Show the application admin dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // get all categories from DB
        $categories = DB::select('select * from category_tab order by cat_id DESC');

        // get all brands from DB
        $brands = DB::select('select * from brand_tab order by status');

        // get all architects from DB
        $arch = DB::select('select * from architect_tab order by arch_id DESC');

        // get all subscribers from DB
        $subscribers = DB::select('select * from subscriber_tab where status=0 order by subscriber_id DESC');

        return view('admin.dash',['categories'=>$categories,'brands'=>$brands,'arch'=>$arch,'subscribers'=>$subscribers]);
    }

    /**
     * Insert category into DB.
     *
     * @return \Illuminate\Http\Response
     */
    public function addCategory(Request $request)
    {

        // check category already added in DB
        $catExist = DB::select('select * from category_tab where category_name=?',[$request->input('category_name')]);
        //print_r($catExist);die();
        if($catExist){
            echo '<div class="alert alert-warning alert-dismissible fade in alert-fixed w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Warning-</strong> Category already added.</div>';
        }
        else{
        // insert category name into  db
            $checkInsert = DB::insert('insert into category_tab (category_name) values(?)', [$request->input('category_name')]);

            if($checkInsert){
                echo '<div class="alert alert-success alert-dismissible fade in alert-fixed w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success-</strong> New Category added.</div>';
            }
            else{
                echo '<div class="alert alert-danger alert-dismissible fade in alert-fixed w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Failure!</strong> Category addition failed!</div>';
            }
        }
    }

    /**
     * Delete category from DB.
     *
     * @return \Illuminate\Http\Response
     */
    public function delCategory(Request $request)
    {
        //print_r($request->segment(2));die();
        // delete category name from  db
        $checkDelete = DB::delete('delete from category_tab where cat_id = ?', [$request->segment(2)]);
        if($checkDelete){
            echo '<div class="alert alert-success alert-dismissible fade in alert-fixed w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success-</strong> Category deleted.</div>';
        }
        else{
            echo '<div class="alert alert-danger alert-dismissible fade in alert-fixed w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Failure!</strong> Category deletion failed!</div>';
        }
    }

    /**
     * insert architect into DB.
     *
     * @return \Illuminate\Http\Response
     */
    public function addArch(Request $request)
    {
        $landline=$request->input('arch_landline');
        if($landline==''){
            $landline='0';
        }
        $mobile=$request->input('arch_mobile');
        if($mobile==''){
            $mobile='0';
        }
        $date=date('Y-m-d');
        
        // insert category name into  db
        $checkInsert = DB::insert('insert into architect_tab(arch_name,arch_email,arch_mobile,arch_landline,arch_address,added_on,status) values(?,?,?,?,?,?,?)', [$request->input('arch_name'),$request->input('arch_email'),$mobile,$landline,$request->input('arch_address'),$date,0]);
        //print_r($request->input('arch_address'));die();

        if($checkInsert){
            if($request->input('addtoSubscriber')){
                $addToSubscribeTab = DB::insert('insert into subscriber_tab (subscriber_email,status) values(?,?)', [$request->input('arch_email'),'0']);
            }
            echo '<div class="alert alert-success alert-dismissible fade in alert-fixed w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success-</strong> Architect added.</div>';
        }
        else{
            echo '<div class="alert alert-danger alert-dismissible fade in alert-fixed w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Failure!</strong> Architect addition failed!</div>';
        }
        //return redirect()->to('admin/dashboard');
    }

    /**
     * insert brand into DB.
     *
     * @return \Illuminate\Http\Response
     */
    public function addBrand(Request $request)
    {

        $file = $request->file('brand_image');
        $catalog='';

        // getting image extension
        $extension = $file->getClientOriginalExtension(); 
        $filename =$request->input('brand_name').'_logo.'.$extension;
        $brand_path=$file->move('template\images\brands', $filename);

        // file uploading code
        if($request->hasfile('brand_catalog'))
        {
            $file=$request->file('brand_catalog');
            //$img_arr=array();
            $file_extension = $file->getClientOriginalExtension(); 
            $originalname=$file->getClientOriginalName();
            $filename =$originalname;
            $catalog=$file->move('template\images\brands\files', $filename);
        }
        else{
            $catalog='Null';
        }
// print_r($catalog);die();

        // insert category name into  db
        $checkInsert = DB::insert('insert into brand_tab (brand_name,brand_image,description,external_link) values(?,?,?,?)', [$request->input('brand_name'),$brand_path,$request->input('description'),$catalog]);

        if($checkInsert){
            echo '<div class="alert alert-success alert-dismissible fade in alert-fixed w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success-</strong> Brand added.</div>';
        }
        else{
            echo '<div class="alert alert-danger alert-dismissible fade in alert-fixed w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Failure!</strong> Brand addition failed!</div>';
        }
        //return redirect()->to('admin/dashboard');
    }

    /**
     * update brand into DB.
     *
     * @return \Illuminate\Http\Response
     */
    public function updateBrand(Request $request)
    {      
        $uploaded=$request->input('update_catalog');
        $catalog='';
        // file uploading code
        if($request->hasfile('update_catalog'))
        {
            $file=$request->file('update_catalog');
            //$img_arr=array();
            $file_extension = $file->getClientOriginalExtension(); 
            $originalname=$file->getClientOriginalName();
            $filename =$originalname;
            $catalog=$file->move('template\images\brands\files', $filename);
        }
        else{
            if($uploaded!='Null' && $uploaded!=''){
                $catalog=$uploaded;
            }
            else{
                $catalog='Null';
            }            
        }
        // update product details  db
        $checkUpdate = DB::update('update brand_tab set brand_name = ?,description=?,external_link=? where brand_id=?', [$request->input('update_brand_name'),$request->input('update_description'),$catalog,$request->input('id')]);
        
        if($checkUpdate){
            echo '<div class="alert alert-success alert-fixed alert-dismissible fade in w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success-</strong> Brand updated successfully.</div>';
        }
        else{
            echo '<div class="alert alert-warning alert-fixed alert-dismissible fade in w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Warning!</strong> You havent changed anything! Brand not updated</div>';
        }
    }

    /**
     * Delete brand from DB.
     *
     * @return \Illuminate\Http\Response
     */
    public function delBrand(Request $request)
    {
        // delete category name from  db
        $checkDelete = DB::delete('delete from brand_tab where brand_id = ?', [$request->segment(2)]);
        if($checkDelete){
            echo '<div class="alert alert-success alert-dismissible fade in alert-fixed w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success-</strong> Brand deleted.</div>';
        }
        else{
            echo '<div class="alert alert-danger alert-dismissible fade in alert-fixed w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Failure!</strong> Brand deletion failed!</div>';
        }
    }

    /**
     * Delete architect from DB.
     *
     * @return \Illuminate\Http\Response
     */
    public function delArch(Request $request)
    {
        // delete category name from  db
        $checkDelete = DB::delete('delete from architect_tab where arch_id = ?', [$request->segment(2)]);
        if($checkDelete){
            echo '<div class="alert alert-success alert-dismissible fade in alert-fixed w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success-</strong> Architect deleted.</div>';
        }
        else{
            echo '<div class="alert alert-danger alert-dismissible fade in alert-fixed w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Failure!</strong> Architect deletion failed!</div>';
        }
    }

    /**
     * Delete subscriber from DB.
     *
     * @return \Illuminate\Http\Response
     */
    public function delSubscriber(Request $request)
    {
        // delete category name from  db
        $checkDelete = DB::delete('delete from subscriber_tab where subscriber_id = ?', [$request->segment(2)]);
        if($checkDelete){
            echo '<div class="alert alert-success alert-dismissible fade in alert-fixed w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success-</strong> subscriber deleted.</div>';
        }
        else{
            echo '<div class="alert alert-danger alert-dismissible fade in alert-fixed w3-round"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Failure!</strong> subscriber deletion failed!</div>';
        }
    }


     /**
     * send mail to architect
     *
     * @return \Illuminate\Http\Response
     */
     public function sendTrendingMail(Request $request)
     {
        //print_r($_POST);die();
        // get all products from DB
        if($request->input('architect_list')!=''){
            $products = DB::table('product_tab')
            ->join('brand_tab', 'product_tab.brand_id', '=', 'brand_tab.brand_id')
            ->join('category_tab', 'product_tab.cat_id', '=', 'category_tab.cat_id')
            ->select('*')
            ->orderBy('product_tab.trending','DESC')
            ->limit(6)
            ->get();
            if($products->isEmpty()){
                echo '<h5 class="w3-text-red">ERROR: No products available in Trending List.</h5>';
                die();
            }
            foreach ($request->input('architect_list') as $key) {
                $contact_mail=str_replace(' ', '', $key);
                $data = array(
                    'products'  =>  $products,
                    'contact_name' => $contact_mail
                );
                //print_r($data);
                Mail::send('mails.architect_mailFormat', $data, function ($message)use ($contact_mail) {
                    $message->from('impulse@bizmo-tech.com', 'Impulse World Trends ADMIN');        
                    $message->to($contact_mail)->subject('Trending Products - Impulse World Trends');
                    $message->getSwiftMessage()->getHeaders();
                }); 

            }
            echo '<h5 class="w3-text-green">Thank You! Your Mail has been send.</h5>';      
        }
        else{
            echo '<h5 class="w3-text-red">Warning: Please select at least one Architect.</h5>';
            die();
        }
        
    }

     /**
     * send mail to subscribers
     *
     * @return \Illuminate\Http\Response
     */
     public function sendSubscriberMail(Request $request)
     {
        // get mail format
        $mailFile = DB::select('select setting_value from admin_settings where setting_name=?',['subscriber_mail']);

        if($mailFile[0]->setting_value==''){
            echo '<h5 class="w3-text-red">Warning: Please upload Mail File to be send to subscriber.</h5>';
        }
        else{
            $filePath='mails.subscriberMailFormat';

            // get all subscribers from DB
            $subscribers = DB::select('select * from subscriber_tab where status=0 order by subscriber_id DESC');
            if(empty($subscribers)){
                echo '<h5 class="w3-text-red">Warning: No Subscribers Found.</h5>';
            }
            else{
                foreach ($subscribers as $key) {
                    $contact_mail=str_replace(' ', '', $key->subscriber_email);
                    $data = array(
                        'contact_email' => $contact_mail,
                        'file_path' => $mailFile[0]->setting_value
                    );
                // print_r($data);die();
                    Mail::send($filePath, $data, function ($message)use ($contact_mail) {
                        $message->from('impulse@bizmo-tech.com', 'Impulse World Trends ADMIN');        
                        $message->to($contact_mail)->subject('Newsletter from Impulse World Trends');
                        $message->getSwiftMessage()->getHeaders();
                    }); 

                }
                echo '<h5 class="w3-text-green">Newsletter has been send to all subscribers.</h5>';  
            }
        }
    }

    /**
     * supload mailer file
     *
     * @return \Illuminate\Http\Response
     */
    public function uploadMailFile(Request $request)
    {
        // print_r($_FILES);die();
        // file uploading code
        if($request->hasfile('mail_document'))
        {
            $file=$request->file('mail_document');
            //$img_arr=array();
            $file_extension = $file->getClientOriginalExtension(); 
            $filename ='MailFormat_'.time().'.'.$file_extension;
            $mailFile=$file->move('uploads\files\mail', $filename);

            $checkUpdate=DB::update('update admin_settings set setting_value = ? where setting_name=?', [$mailFile,'subscriber_mail']);
            if($checkUpdate){
                echo '<h5 class="w3-text-green">File uploaded successfully.</h5>';
            }
            else{
                echo '<h5 class="w3-text-red">Warning: Mail File was not uploaded.</h5>';
            }
        }
        else{
            echo '<h5 class="w3-text-red">Warning: File Not selected.</h5>';
        }
    }



    /**
     * mark feature brand into DB.
     *
     * @return \Illuminate\Http\Response
     */
    public function markBrand(Request $request)
    {      
        $bid=$request->segment(2);

        $featureCount = DB::table('brand_tab')
        ->where('status', '0')
        ->count();
        //print_r($users);die();

        if($featureCount>=6){
            $stat=array(
                'status'    =>false,
                'message'   =>'<span class="w3-text-red w3-medium"><i class="fa fa-warning"></i> WARNING! Only 6 Brands are allowed to be marked as Featured Brand.</span>'
            );
            return $stat;
        }
        else{
          // mark product trending  db 
            $checkUpdate =DB::table('brand_tab')
            ->where('brand_id', $bid)
            ->update(['status' => '0']);

            if($checkUpdate){
                $stat=array(
                    'status'    =>true,
                    'message'   =>'<span class="w3-text-red w3-medium"><strong>Success-</strong> Brand updated.</span>'
                );
                return $stat;
            }
            else{
                $stat=array(
                    'status'    =>false,
                    'message'   =>'<span class="w3-text-red w3-medium"><strong>Failure!</strong> Brand updation failed!</span>'
                );
                return $stat;
            }  
        }
        
    }

    /**
     * unmark feature brand into DB.
     *
     * @return \Illuminate\Http\Response
     */
    public function unmarkBrand(Request $request)
    {      
        $bid=$request->segment(2);

        // mark product trending  db 
        $checkUpdate =DB::table('brand_tab')
        ->where('brand_id', $bid)
        ->update(['status' => '1']);


        if($checkUpdate){
            $stat=array(
                'status'    =>true,
                'message'   =>'<span class="w3-text-red w3-medium"><strong>Success-</strong> Brand updated.</span>'
            );
            return $stat;
        }
        else{
            $stat=array(
                'status'    =>false,
                'message'   =>'<span class="w3-text-red w3-medium"><strong>Failure!</strong> Brand updation failed!</span>'
            );
            return $stat;
        }
    }

}
